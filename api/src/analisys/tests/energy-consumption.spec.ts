import { Genre } from '../../patient/enums/genre.enum';
import { AnalisysData } from '../entities/analisys-data.entity';
import { AnalisysState } from '../models/analisys-state.enum';
import { EnergyConsumptionUtil } from '../utils/energy-consumptio.util';
import { GeneralInformation } from '../models/antropometry/general-information';

describe('EnergetiConsumtionUtil', () => {
  const analisysId = 1;
  const patientData: AnalisysData = {
    patientId: 1,
    analisysId: analisysId,
    previousInformation: null,
    actualState: AnalisysState.Closed,
    lastUpdate: new Date('1993-05-18'),
    anamnese: null,
    antropometry: {
      analisysId: analisysId,
      generalInformation: {
        activityFactor: {
          label: '',
          value: 1.5,
          color: '',
          description: '',
        },
        age: 30,
        genre: Genre.Male,
        weight: 90,
        height: 1.78,
      },
      circumferences: null,
      skinFold: null,
    },
  };
  it('Convert antropometry data to Energy Consumtion Dto', () => {
    const result: GeneralInformation =
      EnergyConsumptionUtil.GetEnergyConsumptionProfile(patientData);
    expect(result.age).toBe(30);
    expect(result.genre).toBe(Genre.Male);
    expect(result.weight).toBe(90);
    expect(result.activityFactor.value).toBe(1.5);
  });

  describe('isWoman', () => {
    it('Validate Basal Metabolic Rates in several life periods', () => {
      const assertionData: Array<[GeneralInformation, number]> = [
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 2,
            genre: Genre.Female,
            weight: 15,
            height: 0,
          },
          843.655,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 9,
            genre: Genre.Female,
            weight: 60,
            height: 0,
          },
          1704.8,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 17,
            genre: Genre.Female,
            weight: 72,
            height: 0,
          },
          1656.248,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 29,
            genre: Genre.Female,
            weight: 85,
            height: 0,
          },
          1746.13,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 60,
            genre: Genre.Female,
            weight: 72,
            height: 0,
          },
          1430.672,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 70,
            genre: Genre.Female,
            weight: 70,
            height: 0,
          },
          1321.24,
        ],
      ];

      assertionData.forEach((tuple) => {
        const patientInfo = tuple[0];
        const expectedBMR = tuple[1];
        expect(
          EnergyConsumptionUtil.GetBasalMetabolicRate(patientInfo),
        ).toBeCloseTo(expectedBMR, 1);
      });
    });
  });

  describe('isMan', () => {
    it('Validate Basal Metabolic Rates in several life periods', () => {
      const assertionData: Array<[GeneralInformation, number]> = [
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 2,
            genre: Genre.Male,
            weight: 15,
            height: 0,
          },
          862.28,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 9,
            genre: Genre.Male,
            weight: 60,
            height: 0,
          },
          1866.66,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 17,
            genre: Genre.Male,
            weight: 72,
            height: 0,
          },
          1931.592,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 29,
            genre: Genre.Male,
            weight: 85,
            height: 0,
          },
          1972.045,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 60,
            genre: Genre.Male,
            weight: 72,
            height: 0,
          },
          1699.084,
        ],
        [
          {
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            age: 70,
            genre: Genre.Male,
            weight: 70,
            height: 0,
          },
          1407.47,
        ],
      ];

      assertionData.forEach((tuple) => {
        const patientInfo = tuple[0];
        const expectedBMR = tuple[1];
        expect(
          EnergyConsumptionUtil.GetBasalMetabolicRate(patientInfo),
        ).toBeCloseTo(expectedBMR, 1);
      });
    });
  });
});
