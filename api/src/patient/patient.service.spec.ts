import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Repository } from 'typeorm';
import { UpdatePatientDto } from './dto/update-patient.dto';

describe('PatientService', () => {
  let service: PatientService;

  let patientRepositoryMock: Repository<Patient>;
  const PATIENT_REPOSITORY_TOKEN = getRepositoryToken(Patient);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PATIENT_REPOSITORY_TOKEN,
          useValue: {
            update: jest.fn(),
            query: jest.fn(),
            delete: jest.fn(),
            save: jest.fn().mockResolvedValue({
              patientId: 1,
              userId: 1,
            }),
            findOne: jest.fn().mockResolvedValue({
              patientId: 1,
              userId: 1,
              name: 'Test User',
              birthDate: '2023-01-01',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    patientRepositoryMock = module.get<Repository<Patient>>(
      PATIENT_REPOSITORY_TOKEN,
    );
  });

  describe('Test setup', () => {
    it('patientRepositoryMock should be defined', () => {
      expect(patientRepositoryMock).toBeDefined();
    });
  });

  describe('CRUD Operations Test', () => {
    it('CREATE - Verify if database have been called to save new instance', async () => {
      await service.create(1, new CreatePatientDto());

      expect(patientRepositoryMock.save).toBeCalledTimes(1);
    });

    it('READ - Verify if database have been called to read item', async () => {
      await service.findOne(1, 1);
      expect(patientRepositoryMock.findOne).toBeCalledTimes(1);
    });

    it('READ MULTIPLE - Verify if database have been called to read items', async () => {
      await service.findAll(1);
      expect(patientRepositoryMock.query).toBeCalledTimes(1);
    });

    it('UPDATE - Verify if database have been called to update item', async () => {
      await service.update(1, 1, new UpdatePatientDto());

      expect(patientRepositoryMock.update).toHaveBeenCalledTimes(1);
      expect(patientRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    });

    it('DELETE - Verify if database have been called to remove item', async () => {
      await service.remove(1, 1);

      expect(patientRepositoryMock.delete).toHaveBeenCalledTimes(1);
    });
  });
});
