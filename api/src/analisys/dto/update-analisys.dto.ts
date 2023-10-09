import { ApiProperty } from '@nestjs/swagger';
import { AntropometryData } from '../models/antropometry/antropometry-data';
import { CreateAnalisysDto } from './create-analisys.dto';

export class UpdateAnalisysDto extends CreateAnalisysDto {
  @ApiProperty()
  antropometry?: AntropometryData;
}
