import { ApiProperty } from "@nestjs/swagger";
import { type User as TUser } from "@prisma/client";

export class User implements TUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
