import { Injectable, Logger, type NestMiddleware } from "@nestjs/common";
import { type NextFunction, type Request, type Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const requestStartTime = Date.now();

    res.on("finish", () => {
      const { statusCode } = res;
      const responseTime = Date.now() - requestStartTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${responseTime}ms`,
      );
    });

    next();
  }
}
