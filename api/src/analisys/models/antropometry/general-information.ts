import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../../patient/enums/genre.enum';
import { ActivityFactor } from './activity-factor';

export class GeneralInformation {
  @ApiProperty()
  age: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  activityFactor: ActivityFactor;

  @ApiProperty()
  genre: Genre;
}
