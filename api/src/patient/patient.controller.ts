import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-strategy.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser('userId') userId,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    return this.patientService.create(userId, createPatientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser('userId') userId: number) {
    return this.patientService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') patientId: number, @GetUser('userId') userId: number) {
    return this.patientService.findOne(patientId, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') patientId: number,
    @GetUser('userId') userId: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(patientId, userId, updatePatientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') patientId: number, @GetUser('userId') userId: number) {
    return this.patientService.remove(patientId, userId);
  }
}
