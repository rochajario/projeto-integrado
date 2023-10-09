import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports: [TypeOrmModule.forFeature([Patient])],
  exports: [PatientService],
})
export class PatientModule {}
