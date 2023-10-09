import { ApiProperty } from '@nestjs/swagger';

export class ActivityFactor {
  @ApiProperty()
  label: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  value: number;
}
