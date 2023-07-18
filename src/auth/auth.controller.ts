import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Método: captura os dados inseridos pelo usuário na criação da conta
  // na rota '/signup'
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  // Método: captura dados inseridos para login e retorna um jwt
  // para a camada service
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // Método: rota para a busca de um usuário atrelado
  // a um id
  @Get('/:userId')
  getUserById(@Param('userId') userId: string): Promise<User> {
    return this.authService.getUserById(userId);
  }

  //Método: rota para atualizar os dados de um usuário
  // (Logado e autenticado com jwt)
  @Patch('/:userId/update-user')
  updateUser(
    @Param('userId') userId: string,
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    // eslint-disable-next-line prettier/prettier
    const { firstName, lastName, email, password } = authCredentialsDto;
    return this.authService.updateUser(
      userId,
      firstName,
      lastName,
      email,
      password,
    );
  }
}
