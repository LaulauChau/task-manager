import { type Prisma } from "@prisma/client";
import { IsEmail, IsString, Matches } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,255}$/)
  password: string;
}
