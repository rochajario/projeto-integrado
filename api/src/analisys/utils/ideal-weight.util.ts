import { Genre } from '../../patient/enums/genre.enum';
import { AnalisysReport } from '../dto/analisys-report.dto';
import { AnalisysData } from '../entities/analisys-data.entity';

export class IdealWeightUtil {
  public static getIdealWeight(
    analisysData: AnalisysData,
    report: AnalisysReport,
  ) {
    if (this.isChildren(analisysData)) {
      report.antropometry.idealWeight = Math.round(
        analisysData.antropometry.generalInformation.age * 2 + 9,
      );
    }
    if (this.isAdult(analisysData)) {
      const genre = analisysData.antropometry.generalInformation.genre;
      if (genre == Genre.Female) {
        report.antropometry.idealWeight = Math.round(
          21 * Math.pow(analisysData.antropometry.generalInformation.height, 2),
        );

        return;
      }

      if (genre == Genre.Male) {
        report.antropometry.idealWeight = Math.round(
          22 * Math.pow(analisysData.antropometry.generalInformation.height, 2),
        );

        return;
      }
    }
    if (this.isElderly(analisysData)) {
      console.log(`Elderly`);
    }
  }

  private static isChildren(analisysData: AnalisysData) {
    return (
      analisysData.antropometry.generalInformation.age >= 0 &&
      analisysData.antropometry.generalInformation.age <= 10
    );
  }

  private static isElderly(analisysData: AnalisysData) {
    return analisysData.antropometry.generalInformation.age >= 65;
  }

  private static isAdult(analisysData: AnalisysData) {
    return !this.isChildren(analisysData) && !this.isElderly(analisysData);
  }
}
