import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  priority: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsBoolean()
  completed = false;
}
