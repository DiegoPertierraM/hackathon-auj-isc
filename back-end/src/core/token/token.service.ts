import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

export type Payload = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hash(value: string) {
    return hash(value, 10);
  }

  async compare(value: string, hash: string) {
    return compare(value, hash);
  }
  async createToken({ id, name, email }: Partial<User>) {
    const payload = { id, name, email };
    const token = this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_TOKEN'),
    });
    return token;
  }
  async compareToken(token: string) {
    return this.jwtService.verifyAsync<Payload>(token, {
      secret: this.configService.get('SECRET_TOKEN'),
    });
  }
}
