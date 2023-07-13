/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private datasource: DataSource) {
        super(User, datasource.createEntityManager())
    }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password, accountType } = authCredentialsDto;
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType,
    });

    try {
      await this.save(user);    
    } catch (error){
        if (error.code === '23505') {
            throw new ConflictException('Email already existis!')
        } else {
            throw new InternalServerErrorException();
        }
    }
  }
}
