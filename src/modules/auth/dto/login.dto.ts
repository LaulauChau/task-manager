import { IsEmail, IsString, Matches } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,255}$/)
  password: string;
}
