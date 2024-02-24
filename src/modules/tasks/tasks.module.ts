import { Module } from "@nestjs/common";

import { PrismaModule } from "@/core/prisma/prisma.module";

import { TasksController } from "./controllers/tasks.controller";
import { TasksService } from "./services/tasks.service";

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
