/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
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
