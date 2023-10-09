import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAnalisysDto {
  @ApiProperty()
  @IsNumber()
  patientId: number;
}
