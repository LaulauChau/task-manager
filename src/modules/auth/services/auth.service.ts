import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

import { type CreateUserDto } from "@/modules/users/dto/create-user.dto";
import { type User } from "@/modules/users/entities/user.entity";
import { UsersService } from "@/modules/users/services/users.service";

import { excludeFields } from "../utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  login(user: Omit<User, "password">): string {
    const payload = { sub: user.id, email: user.email };

    return this.jwtService.sign(payload);
  }

  async registerUser({
    name,
    email,
    password,
  }: CreateUserDto): Promise<string> {
    const newUser = await this.usersService.create({
      name,
      email,
      password,
    });

    return this.login(excludeFields(newUser, ["password"]));
  }

  async validateToken(
    token: string | undefined,
  ): Promise<Omit<User, "password">> {
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { sub: id }: { sub: string } = this.jwtService.verify(token);
      const user = await this.usersService.findOne({ id });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return excludeFields(user, ["password"]);
  }
}
