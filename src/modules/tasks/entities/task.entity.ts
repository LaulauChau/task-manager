import { ApiProperty } from "@nestjs/swagger";
import { type $Enums, type Task as TTask } from "@prisma/client";

export class Task implements TTask {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  priority: $Enums.TaskPriority;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  dueDate: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;
}
