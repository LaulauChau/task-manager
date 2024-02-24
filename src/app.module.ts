import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  RequestMethod,
} from "@nestjs/common";

import { ConfigModule } from "@/core/config/config.module";
import { LoggerMiddleware } from "@/core/logger/middlewares/logger.middleware";
import { AuthModule } from "@/modules/auth/auth.module";
import { TasksModule } from "@/modules/tasks/tasks.module";

@Module({
  imports: [
    ConfigModule.register({ filename: ".env" }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
