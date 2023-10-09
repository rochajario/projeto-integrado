import { AnalisysReport } from '../dto/analisys-report.dto';
import { AnalisysData } from '../entities/analisys-data.entity';

export class BodyMassRateUtil {
  public static getBodyMassRate(
    analisysData: AnalisysData,
    report: AnalisysReport,
  ): void {
    this.getBodyMassRateValue(analisysData, report);
    this.getBodyMassRateClass(analisysData, report);
  }

  private static getBodyMassRateValue(
    analisysData: AnalisysData,
    report: AnalisysReport,
  ): void {
    const weight = analisysData.antropometry.generalInformation.weight;
    const height = analisysData.antropometry.generalInformation.height;

    report.antropometry.bmr = weight / Math.pow(height, 2);
  }

  private static getBodyMassRateClass(
    analisysData: AnalisysData,
    report: AnalisysReport,
  ): void {
    let result = '';
    if (report.antropometry.bmr >= 0 && report.antropometry.bmr < 18.5) {
      result = 'Abaixo do Peso';
    }
    if (report.antropometry.bmr >= 18.5 && report.antropometry.bmr < 25) {
      result = 'Peso Normal';
    }
    if (report.antropometry.bmr >= 25 && report.antropometry.bmr < 30) {
      result = 'Obesidade Grau 1';
    }
    if (report.antropometry.bmr >= 30 && report.antropometry.bmr < 40) {
      result = 'Obesidade Grau 2';
    }
    if (report.antropometry.bmr >= 40) {
      result = 'Obesidade Grau 3';
    }

    report.antropometry.bmrClass = result;
  }
}
