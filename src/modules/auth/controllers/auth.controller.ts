import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { type Request as TRequest, type Response as TResponse } from "express";

import { ConfigService } from "@/core/config/services/config.service";
import { CreateUserDto } from "@/modules/users/dto/create-user.dto";
import { type User } from "@/modules/users/entities/user.entity";

import { LoginDto } from "../dto/login.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";

interface RequestWithUser extends TRequest {
  cookies: Record<string, string>;
  user: Omit<User, "password">;
}

@Controller("auth")
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "Logged in" })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: RequestWithUser, @Response() res: TResponse) {
    const token = this.authService.login(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: this.configService.getOrThrow("NODE_ENV") === "production",
    });

    res.status(HttpStatus.OK).send({ message: "Logged in" });
  }

  @ApiOperation({ summary: "Logout" })
  @ApiResponse({ status: HttpStatus.OK, description: "Logged out" })
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Response() res: TResponse) {
    res.clearCookie("token");

    res.status(HttpStatus.OK).send({ message: "Logged out" });
  }

  @ApiOperation({ summary: "Get user" })
  @ApiResponse({ status: HttpStatus.OK, description: "OK" })
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@Request() req: RequestWithUser) {
    return req.user;
  }

  @ApiOperation({ summary: "Register" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Registered" })
  @ApiBody({ type: CreateUserDto })
  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto,
    @Response() res: TResponse,
  ) {
    const token = await this.authService.registerUser(createUserDto);

    res.cookie("token", token, {
      httpOnly: true,
      secure: this.configService.getOrThrow("NODE_ENV") === "production",
    });

    res.status(HttpStatus.CREATED).send({ message: "Registered" });
  }
}
