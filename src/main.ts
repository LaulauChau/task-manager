import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  DocumentBuilder,
  type SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { ConfigService } from "@/core/config/services/config.service";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle("Task Manager")
    .setDescription("The Task Manager API description")
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("/", app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.getOrThrow("PORT"));
}

bootstrap();
