/* eslint-disable prettier/prettier */
import { AccountTypeEnum } from './account-type.enum';

export class AuthCredentialsDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: AccountTypeEnum;
}