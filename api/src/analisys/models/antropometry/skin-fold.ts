import { ApiProperty } from '@nestjs/swagger';

export class SkinFold {
  @ApiProperty()
  chest: number;

  @ApiProperty()
  middleAxillary: number;

  @ApiProperty()
  subscapular: number;

  @ApiProperty()
  triceps: number;

  @ApiProperty()
  abdominal: number;

  @ApiProperty()
  thigh: number;
}
