import { ApiProperty } from '@nestjs/swagger';
import { Circumferences } from './circumferences';
import { GeneralInformation } from './general-information';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { SkinFold } from './skin-fold';

export class AntropometryData {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  analisysId: number;

  @ApiProperty()
  @IsNotEmpty()
  generalInformation: GeneralInformation;

  @ApiProperty()
  circumferences: Circumferences;

  @ApiProperty()
  skinFold: SkinFold;
}
