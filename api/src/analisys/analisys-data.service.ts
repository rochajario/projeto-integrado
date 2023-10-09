import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AnalisysData } from './entities/analisys-data.entity';
import { AnalisysState } from './models/analisys-state.enum';
import { CreateAnalisysDto } from './dto/create-analisys.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAnalisysDto } from './dto/update-analisys.dto';

@Injectable()
export class AnalisysDataService {
  private readonly analisysRepository: Repository<AnalisysData>;

  constructor(
    @InjectRepository(AnalisysData)
    analisysRepository: Repository<AnalisysData>,
  ) {
    this.analisysRepository = analisysRepository;
  }

  private raiseException(errorMessage: string, statusCode: HttpStatus): void {
    throw new HttpException(errorMessage, statusCode);
  }

  public async create(analisysDto: CreateAnalisysDto): Promise<AnalisysData> {
    const analisysInProgress = await this.analisysRepository.findOne({
      where: {
        patientId: analisysDto.patientId,
        actualState: AnalisysState.Open,
      },
    });

    if (analisysInProgress) {
      this.raiseException(
        'Já existe análise em progresso para o paciente',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.analisysRepository.save({
      patientId: analisysDto.patientId,
      actualState: AnalisysState.Open,
    });
  }

  public async findAll(patientId: number): Promise<AnalisysData[]> {
    return await this.analisysRepository.find({
      where: {
        patientId: patientId,
      },
      order: {
        actualState: AnalisysState.Open,
      },
    });
  }

  public async remove(analisysId: number): Promise<void> {
    await this.analisysRepository.delete({
      analisysId: analisysId,
    });
  }

  public async patch(
    analisysId: number,
    analisysDto: UpdateAnalisysDto,
  ): Promise<AnalisysData> {
    const currentAnalisys = await this.analisysRepository.findOne({
      where: {
        analisysId: analisysId,
        patientId: analisysDto.patientId,
      },
    });

    if (currentAnalisys.actualState === AnalisysState.Closed) {
      this.raiseException(
        'A análise já foi concluída',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.analisysRepository.update(
      {
        analisysId: analisysId,
        patientId: analisysDto.patientId,
      },
      { ...analisysDto, lastUpdate: new Date() },
    );

    return await this.analisysRepository.findOne({
      where: {
        analisysId: analisysId,
        patientId: analisysDto.patientId,
      },
    });
  }

  public async conclude(analisysId: number): Promise<AnalisysData> {
    const analisys = await this.analisysRepository.findOne({
      where: {
        analisysId: analisysId,
      },
    });

    if (analisys.actualState == AnalisysState.Closed) {
      this.raiseException(
        'A análise já foi concluída',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!analisys.antropometry) {
      this.raiseException(
        'A análise precisa ter informações associadas',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const lastUpdate = new Date();

    await this.analisysRepository.update(
      { analisysId: analisysId },
      { actualState: AnalisysState.Closed, lastUpdate: lastUpdate },
    );

    return await this.analisysRepository.findOne({
      where: {
        analisysId: analisysId,
      },
    });
  }
}
