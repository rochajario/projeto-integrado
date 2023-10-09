import { AnalisysState } from '../models/analisys-state.enum';
import { AnalisysData } from '../entities/analisys-data.entity';
import { Genre } from '../../patient/enums/genre.enum';
import { AnalisysReport } from '../dto/analisys-report.dto';
import { IdealWeightUtil } from '../utils/ideal-weight.util';

describe('IdealWeightUtility', () => {
  const report: AnalisysReport = {
    analisysId: 1,
    patientId: 1,
    antropometry: {
      bmr: null,
      idealWeight: null,
      bmrClass: null,
      bodyDensity: null,
      bodyFat: null,
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
    describe('Ideal Weight', () => {
      it('Children', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.9,
            weight: 65,
            age: 4,
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
        IdealWeightUtil.getIdealWeight(analisysBaseDto, report);

        //assert
        expect(report.antropometry.idealWeight).toBe(17);
      });

      it('Man', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.75,
            weight: 65,
            age: 22,
            activityFactor: {
              label: '',
              value: 0,
              color: '',
              description: '',
            },
            genre: Genre.Male,
          },
          circumferences: null,
          skinFold: null,
        };

        //act
        IdealWeightUtil.getIdealWeight(analisysBaseDto, report);

        //assert
        expect(report.antropometry.idealWeight).toBeCloseTo(67);
      });

      it('Woman', async () => {
        //arrange
        analisysBaseDto.antropometry = {
          analisysId: 1,
          generalInformation: {
            height: 1.75,
            weight: 65,
            age: 22,
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
        IdealWeightUtil.getIdealWeight(analisysBaseDto, report);

        //assert
        expect(report.antropometry.idealWeight).toBeCloseTo(64);
      });
    });
  });
});
