/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private datasource: DataSource) {
        super(User, datasource.createEntityManager())
    }

  // Método: realiza a persistência dos dados do usuário no banco de dados  
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password } = authCredentialsDto;

    // Geração de um salt
    const salt = await bcrypt.genSalt();
    
    // Criação de uma senha hashed
    const hashPassword = await bcrypt.hash(password, salt);
    
    // Criação de usuário já contendo uma senha hashed
    const user = this.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    
    // Verificação se o email já existe
    // Se já existir email no sistema usuário não será salvo no BD
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
