import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "@/core/prisma/services/prisma.service";

import { type CreateTaskDto } from "../dto/create-task.dto";
import { type UpdateTaskDto } from "../dto/update-task.dto";
import { type Task } from "../entities/task.entity";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createTaskDto: CreateTaskDto & { userId: string },
  ): Promise<Task> {
    const existingTask = await this.prismaService.task.findFirst({
      where: { title: createTaskDto.title },
    });

    if (existingTask) {
      throw new ConflictException("Task with this title already exists");
    }

    return this.prismaService.task.create({ data: createTaskDto });
  }

  async findAll(): Promise<Task[]> {
    return this.prismaService.task.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findOne(id: string): Promise<Task | null> {
    return this.prismaService.task.findUnique({ where: { id } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.prismaService.task.findFirst({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException("Task with this id does not exist");
    }

    return this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string): Promise<Task> {
    const existingTask = await this.prismaService.task.findFirst({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException("Task with this id does not exist");
    }

    return this.prismaService.task.delete({ where: { id } });
  }
}
