/* eslint-disable prettier/prettier */
// Payload contendo o dado a ser tokenizado( email )
// NÃO UTILIZAR INFO SENSIVEIS EX: SENHA
export interface JwtPayload {
  email: string;
}