import { Module } from "@nestjs/common";

import { PrismaModule } from "@/core/prisma/prisma.module";

import { UsersService } from "./services/users.service";

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
