import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    userPassword: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findEmail(email);

    const passwordMatches = await bcrypt.compare(userPassword, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
