import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseGuards,
  Patch,
  Put,
} from '@nestjs/common';
import { AnalisysDataService } from './analisys-data.service';
import { CreateAnalisysDto } from './dto/create-analisys.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-strategy.guard';
import { UpdateAnalisysDto } from './dto/update-analisys.dto';
import { AnalisysReportService } from './analisys-report.service';
import { AnalisysReport } from './dto/analisys-report.dto';
import { AnalisysData } from './entities/analisys-data.entity';

@Controller('analisys')
export class AnalisysController {
  constructor(
    private readonly analisysService: AnalisysDataService,
    private readonly analisysReportService: AnalisysReportService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  public create(@Body() analisysDto: CreateAnalisysDto): Promise<AnalisysData> {
    return this.analisysService.create(analisysDto);
  }

  @Get(':patientId')
  @UseGuards(JwtAuthGuard)
  public findAll(
    @Param('patientId') patientId: number,
  ): Promise<AnalisysData[]> {
    return this.analisysService.findAll(patientId);
  }

  @Put('/conclude/:analisysId')
  @UseGuards(JwtAuthGuard)
  public conclude(
    @Param('analisysId') analisysId: number,
  ): Promise<AnalisysData> {
    return this.analisysService.conclude(analisysId);
  }

  @Patch(':analisysId')
  @UseGuards(JwtAuthGuard)
  public patch(
    @Param('analisysId') analisysId: number,
    @Body() analisysDto: UpdateAnalisysDto,
  ): Promise<AnalisysData> {
    return this.analisysService.patch(analisysId, analisysDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: number) {
    this.analisysService.remove(id);
  }

  @Post('/produce/:analisysId')
  @UseGuards(JwtAuthGuard)
  public produce(
    @Param('analisysId') analisysId: number,
  ): Promise<AnalisysReport> {
    return this.analisysReportService.produceAnalisys(analisysId);
  }
}
