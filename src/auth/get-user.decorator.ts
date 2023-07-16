/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from "./user.entity";

// Decorator customizado para facilitar a extração do usuário
export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

