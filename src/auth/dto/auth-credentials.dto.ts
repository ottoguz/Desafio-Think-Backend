/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { AccountTypeEnum } from '../account-type.enum';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  //Regex para verificar uso de caracteres especiais Upper e Lower e numero
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Senha muito fraca!'})
  password: string;
  accountType: AccountTypeEnum;
}