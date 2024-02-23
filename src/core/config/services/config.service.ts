import { Inject, Injectable } from "@nestjs/common";
import { parse } from "dotenv";
import { readFileSync } from "fs";
import { resolve } from "path";

import { CONFIG_OPTIONS } from "../constants";
import { ConfigOptions } from "../entities/config-options.entity";
import { type EnvConfig } from "../entities/env-config.entity";

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const envFile = resolve(process.cwd(), options.filename);

    this.envConfig = parse(readFileSync(envFile));
  }

  getOrThrow(key: string): string {
    const value = this.envConfig[key];

    if (!value) {
      throw new Error(`ConfigService: ${key} is not defined`);
    }

    return value;
  }
}
