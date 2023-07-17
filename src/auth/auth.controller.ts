import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

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

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.authService.getUserById(id);
  }

  @Patch('/:id/update-user')
  updateUser(
    @Param('id') id: string,
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    // eslint-disable-next-line prettier/prettier
    const { firstName, lastName, email, password, accountType } = authCredentialsDto;
    return this.authService.updateUser(
      id,
      firstName,
      lastName,
      email,
      password,
      accountType,
    );
  }
}
