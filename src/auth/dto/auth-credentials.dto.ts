/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';

// Classe de transferência de dados de autenticação de usuários
export class AuthCredentialsDto {
  // Nome + verificações
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  firstName: string;
  
  // Sobrenome + verificações
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  lastName: string;
  
  // Email + verificação
  @IsEmail()
  email: string;
  
  // Senha + verificações 
  // (@Matches = Regex para verificar uso de caracteres especiais Upper e Lower e numero)
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'Weak password! Must contain Upper and Lower Case, Number and Special Character'})
  password: string;
}