import { type DynamicModule, Global, Module } from "@nestjs/common";

import { CONFIG_OPTIONS } from "./constants";
import { ConfigService } from "./services/config.service";

export interface ConfigModuleOptions {
  filename: string;
}

@Global()
@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
