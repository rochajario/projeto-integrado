import { AnalisysReport } from '../dto/analisys-report.dto';
import { AnalisysData } from '../entities/analisys-data.entity';
import { AntropometryData } from '../models/antropometry/antropometry-data';
import { SkinFold } from '../models/antropometry/skin-fold';
import { GeneralInformation } from '../models/antropometry/general-information';

export class BodyDensityUtil {
  public static getBodyDensity(
    analisysData: AnalisysData,
    report: AnalisysReport,
  ): void {
    const antropometry: AntropometryData = analisysData.antropometry!;
    const skinFoldSum = this.getSkinFoldSum(antropometry.skinFold);

    const bodyDensityResult = this.getDensity(
      skinFoldSum,
      antropometry.generalInformation,
    );

    report.antropometry.bodyDensity = bodyDensityResult;
    report.antropometry.bodyFat = `${Number(
      this.getBodyFat(bodyDensityResult),
    ).toFixed(2)} %`;
  }

  private static getSkinFoldSum(skinFold: SkinFold): number {
    return (
      Number(skinFold.abdominal) +
      Number(skinFold.chest) +
      Number(skinFold.middleAxillary) +
      Number(skinFold.subscapular) +
      Number(skinFold.thigh) +
      Number(skinFold.triceps)
    );
  }

  private static getDensity(
    skinFoldSum: number,
    generalInformation: GeneralInformation,
  ): number {
    return Number(
      1.112 -
        0.00043499 * skinFoldSum +
        0.00000055 * skinFoldSum * 2 -
        0.00028826 * generalInformation.age,
    );
  }

  private static getBodyFat(bodyDensity: number): number {
    return Math.round(495 / Number(bodyDensity) - 450);
  }
}
