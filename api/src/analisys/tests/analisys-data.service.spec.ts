import { Test, TestingModule } from '@nestjs/testing';
import { AnalisysDataService } from '../analisys-data.service';
import { AnalisysData } from '../entities/analisys-data.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnalisysState } from '../models/analisys-state.enum';
import { HttpException, Provider } from '@nestjs/common';
import { UpdateAnalisysDto } from '../dto/update-analisys.dto';

describe('AnalisysService', () => {
  let service: AnalisysDataService;
  let mockRepository: Provider;

  async function configureMock(repoMethods) {
    mockRepository = {
      provide: getRepositoryToken(AnalisysData),
      useValue: repoMethods,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalisysDataService, mockRepository],
    }).compile();

    return module.get<AnalisysDataService>(AnalisysDataService);
  }

  describe('create', () => {
    it('should not allow creating new analisys when there is one in progress', async () => {
      //arrange
      service = await configureMock({
        findOne: jest.fn().mockResolvedValue({
          analisysId: 1,
          patientId: 1,
          actualState: AnalisysState.Open,
        }),
      });
      //act-assert
      await expect(service.create({ patientId: 1 })).rejects.toThrowError(
        HttpException,
      );
    });

    it('should not allow creating new analisys when there is no one in progress', async () => {
      //arrange
      service = await configureMock({
        save: jest.fn().mockResolvedValue({
          analisysId: 1,
          patientId: 1,
          actualState: AnalisysState.Open,
        }),
        findOne: jest.fn(),
      });

      //act
      const result = service.create({ patientId: 1 });

      //assert
      expect(result).toBeTruthy();
    });
  });

  describe('patch', () => {
    it('should not allow updating analisys if is closed', async () => {
      //arrange
      service = await configureMock({
        findOne: jest.fn().mockResolvedValue({
          analisysId: 1,
          patientId: 1,
          actualState: AnalisysState.Closed,
        }),
      });

      //act-assert
      await expect(
        service.patch(1, { patientId: 1, antropometry: null }),
      ).rejects.toThrowError(HttpException);
    });

    it('should allow updating analisys if is open', async () => {
      //arrange
      const analisysId = 1;
      const request = <UpdateAnalisysDto>{
        analisysId: analisysId,
        patientId: 1,
        actualState: AnalisysState.Open,
        antropometry: null,
      };

      service = await configureMock({
        findOne: jest.fn().mockResolvedValue(<AnalisysData>{
          ...request,
          actualState: AnalisysState.Open,
        }),
        update: jest.fn(),
      });

      //act
      const result = await service.patch(analisysId, request);

      //assert
      expect(result).toBeTruthy();
    });
  });

  describe('conclude', () => {
    it('should not allow conclude analisys if is closed', async () => {
      //arrange
      service = await configureMock({
        findOne: jest.fn().mockResolvedValue({
          analisysId: 1,
          patientId: 1,
          actualState: AnalisysState.Closed,
        }),
        update: jest.fn(),
      });

      //act-assert
      await expect(service.conclude(1)).rejects.toThrowError(HttpException);
    });

    it('should allow conclude analisys if is open', async () => {
      //arrange
      const analisysId = 1;
      const request = <UpdateAnalisysDto>{
        analisysId: analisysId,
        patientId: 1,
        actualState: AnalisysState.Open,
      };

      service = await configureMock({
        findOne: jest.fn().mockResolvedValue(<AnalisysData>{
          ...request,
          actualState: AnalisysState.Open,
          antropometry: {},
        }),
        update: jest.fn(),
      });

      //act
      const result = await service.conclude(analisysId);

      //assert
      expect(result).toBeTruthy();
    });
  });
});
