import { Module } from '@nestjs/common';
import { AnalisysController } from './analisys.controller';
import { AnalisysData } from './entities/analisys-data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalisysReportService } from './analisys-report.service';
import { AnalisysDataService } from './analisys-data.service';

@Module({
  controllers: [AnalisysController],
  providers: [AnalisysDataService, AnalisysReportService],
  imports: [TypeOrmModule.forFeature([AnalisysData])],
  exports: [AnalisysDataService, AnalisysReportService],
})
export class AnalisysModule {}
