import { AnalisysState } from '../models/analisys-state.enum';
import { AnalisysData } from '../entities/analisys-data.entity';
import { Genre } from '../../patient/enums/genre.enum';
import { BodyMassRateUtil } from '../utils/body-mass-rate.util';
import { AnalisysReport } from '../dto/analisys-report.dto';

describe('BodyMassRateUtility', () => {
  const report: AnalisysReport = {
    analisysId: 1,
    patientId: 1,
    antropometry: {
      bmr: null,
      idealWeight: null,
      bmrClass: null,
      bodyFat: null,
      bodyDensity: null,
      description: null,
    },
  };

  const analisysBaseDto: AnalisysData = {
    patientId: 1,
    analisysId: 1,
    actualState: AnalisysState.Closed,
    lastUpdate: new Date(),
    antropometry: null,
  };

  describe('Antropometric Analisys', () => {
    describe('Body Mass Rate', () => {
      it('Underweight', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.9,
            weight: 65,
            age: 0,
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            genre: Genre.Female,
          },
          circumferences: null,
          skinFold: null,
        };

        //act
        BodyMassRateUtil.getBodyMassRate(analisysBaseDto, report);

        //assert
        expect(report.antropometry.bmr).toBeCloseTo(18.005);
        expect(report.antropometry.bmrClass).toBe(`Abaixo do Peso`);
      });

      it('Normal Weight', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.9,
            weight: 75,
            age: 0,
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            genre: Genre.Female,
          },
          circumferences: null,
          skinFold: null,
        };

        //act
        BodyMassRateUtil.getBodyMassRate(analisysBaseDto, report);

        //assert
        expect(report.antropometry.bmr).toBeCloseTo(20.775);
        expect(report.antropometry.bmrClass).toBe(`Peso Normal`);
      });

      it('Overweight - Obesity 1', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.75,
            weight: 80,
            age: 0,
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            genre: Genre.Female,
          },
          circumferences: null,
          skinFold: null,
        };

        //act
        BodyMassRateUtil.getBodyMassRate(analisysBaseDto, report);

        //assert
        expect(report.antropometry.bmr).toBeCloseTo(26.122);
        expect(report.antropometry.bmrClass).toBe(`Obesidade Grau 1`);
      });

      it('Obesity 2', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.5,
            weight: 75,
            age: 0,
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            genre: Genre.Female,
          },
          circumferences: null,
          skinFold: null,
        };

        //act
        BodyMassRateUtil.getBodyMassRate(analisysBaseDto, report);

        //assert
        expect(report.antropometry.bmr).toBeCloseTo(33.333);
        expect(report.antropometry.bmrClass).toBe(`Obesidade Grau 2`);
      });

      it('Obesity 3', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.5,
            weight: 90,
            age: 0,
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            genre: Genre.Female,
          },
          circumferences: null,
          skinFold: null,
        };

        //act
        BodyMassRateUtil.getBodyMassRate(analisysBaseDto, report);

        //assert
        expect(report.antropometry.bmr).toBeCloseTo(40);
        expect(report.antropometry.bmrClass).toBe(`Obesidade Grau 3`);
      });
    });
  });
});
