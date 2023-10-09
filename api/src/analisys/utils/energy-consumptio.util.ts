import { Genre } from '../../patient/enums/genre.enum';
import { AnalisysData } from '../entities/analisys-data.entity';
import { GeneralInformation } from '../models/antropometry/general-information';

export class EnergyConsumptionUtil {
  public static GetEnergyConsumptionProfile(
    patientData: AnalisysData,
  ): GeneralInformation {
    return patientData.antropometry.generalInformation;
  }

  public static GetTotalCaloricExpenditure(
    energyConsumptionProfile: GeneralInformation,
  ): number {
    return (
      this.GetBasalMetabolicRate(energyConsumptionProfile) *
      energyConsumptionProfile.activityFactor.value
    );
  }

  public static GetBasalMetabolicRate(
    energyConsumptionProfile: GeneralInformation,
  ): number {
    switch (energyConsumptionProfile.genre) {
      case Genre.Female:
        return this.GetFemaleBasalMetabolicRate(energyConsumptionProfile);
      case Genre.Male:
        return this.GetMaleBasalMetabolicRate(energyConsumptionProfile);
    }
  }

  private static GetFemaleBasalMetabolicRate(
    energyConsumptionProfile: GeneralInformation,
  ): number {
    if (energyConsumptionProfile.age <= 2) {
      return Number(58.317 * energyConsumptionProfile.weight - 31.1);
    }
    if (energyConsumptionProfile.age <= 9) {
      return Number(20.315 * energyConsumptionProfile.weight + 485.9);
    }
    if (energyConsumptionProfile.age <= 17) {
      return Number(13.384 * energyConsumptionProfile.weight + 692.6);
    }
    if (energyConsumptionProfile.age <= 29) {
      return Number(14.818 * energyConsumptionProfile.weight + 486.6);
    }
    if (energyConsumptionProfile.age <= 60) {
      return Number(8.126 * energyConsumptionProfile.weight + 845.6);
    }
    if (energyConsumptionProfile.age > 60) {
      return Number(9.082 * energyConsumptionProfile.weight + 685.5);
    }
    return 0;
  }

  private static GetMaleBasalMetabolicRate(
    energyConsumptionProfile: GeneralInformation,
  ): number {
    if (energyConsumptionProfile.age <= 2) {
      return Number(59.512 * energyConsumptionProfile.weight - 30.4);
    }
    if (energyConsumptionProfile.age <= 9) {
      return Number(22.706 * energyConsumptionProfile.weight + 504.3);
    }
    if (energyConsumptionProfile.age <= 17) {
      return Number(17.686 * energyConsumptionProfile.weight + 658.2);
    }
    if (energyConsumptionProfile.age <= 29) {
      return Number(15.057 * energyConsumptionProfile.weight + 692.2);
    }
    if (energyConsumptionProfile.age <= 60) {
      return Number(11.472 * energyConsumptionProfile.weight + 873.1);
    }
    if (energyConsumptionProfile.age > 60) {
      return Number(11.711 * energyConsumptionProfile.weight + 587.7);
    }
    return 0;
  }
}
