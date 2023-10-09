import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalisysData } from './entities/analisys-data.entity';
import { AnalisysReport } from './dto/analisys-report.dto';
import { BodyMassRateUtil } from './utils/body-mass-rate.util';
import { IdealWeightUtil } from './utils/ideal-weight.util';
import { BodyDensityUtil } from './utils/body-density.util';
import { EnergyConsumptionUtil } from './utils/energy-consumptio.util';

@Injectable({ scope: Scope.REQUEST })
export class AnalisysReportService {
  private readonly analisysRepository: Repository<AnalisysData>;
  private report: AnalisysReport;

  constructor(
    @InjectRepository(AnalisysData)
    analisysRepository: Repository<AnalisysData>,
  ) {
    this.analisysRepository = analisysRepository;
  }

  public async produceAnalisys(analisysId: number): Promise<AnalisysReport> {
    const analisysData = await this.analisysRepository.findOne({
      where: {
        analisysId: analisysId,
      },
    });

    this.getAnalisysReport(analisysData);
    this.getBodyMassRate(analisysData);
    this.getIdealWeight(analisysData);
    this.getBodyDensity(analisysData);

    this.report.antropometry.description =
      this.getReportDescription(analisysData);

    return this.report;
  }

  private getAnalisysReport(analisysData: AnalisysData) {
    this.report = new AnalisysReport(
      analisysData.patientId,
      analisysData.analisysId,
    );
  }

  private getBodyMassRate(analisysData: AnalisysData) {
    BodyMassRateUtil.getBodyMassRate(analisysData, this.report);
  }

  private getIdealWeight(analisysData: AnalisysData) {
    IdealWeightUtil.getIdealWeight(analisysData, this.report);
  }

  private getBodyDensity(analisysData: AnalisysData) {
    BodyDensityUtil.getBodyDensity(analisysData, this.report);
  }

  private getReportDescription(analisysData: AnalisysData): Array<string> {
    const energyProfile =
      EnergyConsumptionUtil.GetEnergyConsumptionProfile(analisysData);

    const weight = energyProfile.weight;
    const fatWeight =
      weight * (Number(this.report.antropometry.bodyFat.split(' ')[0]) / 100);
    const cleanWeight = weight - fatWeight;

    const basalMetabolicRate: number =
      EnergyConsumptionUtil.GetBasalMetabolicRate(energyProfile);
    const caloricExpenditure: number =
      EnergyConsumptionUtil.GetTotalCaloricExpenditure(energyProfile);

    return [
      `Massa magra: ${cleanWeight} Kg.`,
      `Massa gorda: ${fatWeight} Kg.`,
      `Percentual de gordura corporal: ${this.report.antropometry.bodyFat}`,
      `Consumo calórico em repouso: ${basalMetabolicRate.toFixed(2)} kcal.`,
      `Consumo calórico total diario estimado: ${caloricExpenditure.toFixed(
        2,
      )} kcal.`,
    ];
  }
}
