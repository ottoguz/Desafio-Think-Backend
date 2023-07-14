/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from "./user.entity";

export const getUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

