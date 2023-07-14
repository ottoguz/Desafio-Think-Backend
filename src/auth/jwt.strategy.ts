/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // Injeção de dependência no repositório de usuários
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      // Segredo registrado em auth.module.ts 
      secretOrKey: 'topsecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  
  // Validação de usuário tendo uma carga(payload) como parâmetro
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}