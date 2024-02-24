/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ConflictException, Injectable } from "@nestjs/common";
import { genSalt, hash } from "bcryptjs";

import { PrismaService } from "@/core/prisma/services/prisma.service";

import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  private static readonly saltRounds: Promise<string> = genSalt();

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await hash(
      data.password,
      await UsersService.saltRounds,
    );

    return this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findOne({
    email,
    id,
  }: {
    email?: string;
    id?: string;
  }): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email, id },
      include: { tasks: true },
    });
  }
}
