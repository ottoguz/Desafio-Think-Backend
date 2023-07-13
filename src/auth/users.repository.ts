/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private datasource: DataSource) {
        super(User, datasource.createEntityManager())
    }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password, accountType } = authCredentialsDto;
    const user = this.create({
      firstName,
      lastName,
      email,
      password,
      accountType,
    });
    await this.save(user);
  }
}
