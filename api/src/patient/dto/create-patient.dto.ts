import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Genre } from '../enums/genre.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  genre: Genre;
}
