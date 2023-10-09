import { ApiProperty } from '@nestjs/swagger';

export class Circumferences {
  @ApiProperty()
  arm: number;

  @ApiProperty()
  wrist: number;

  @ApiProperty()
  waist: number;

  @ApiProperty()
  abdomen: number;

  @ApiProperty()
  hip: number;

  @ApiProperty()
  calf: number;
}
