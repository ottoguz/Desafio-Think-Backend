import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { AccountTypeEnum } from './account-type.enum';

@Injectable()
export class AuthService {
  constructor(
    // Injeção de dependência no repositório de usuários
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  // Método: faz a transfência de dados para o repositório de usuários
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  // Método: faz a busca de um usuário no repositório e retorna o jwt token
  // do usuário se as verificações estiverem corretas
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ email });

    // Verificação se usuário existe e se a senha está correta
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async getUserById(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType: AccountTypeEnum,
  ): Promise<User> {
    const user = await this.getUserById(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.accountType = accountType;

    await this.usersRepository.save(user);
    return user;
  }
}
