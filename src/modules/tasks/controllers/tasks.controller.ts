import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { type Request as TRequest } from "express";

import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { type User } from "@/modules/users/entities/user.entity";

import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { type Task } from "../entities/task.entity";
import { TasksService } from "../services/tasks.service";

interface RequestWithUser extends TRequest {
  user: Omit<User, "password">;
}

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: "Create task" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Created" })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: RequestWithUser,
  ): Promise<Task> {
    return this.tasksService.create({ ...createTaskDto, userId: req.user.id });
  }

  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK" })
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: "Get task by id" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: HttpStatus.OK, description: "OK" })
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: "Update task" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateTaskDto })
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: "Delete task" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: HttpStatus.OK, description: "OK" })
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
