import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  private readonly patientRepository: Repository<Patient>;

  constructor(
    @InjectRepository(Patient) patientRepository: Repository<Patient>,
  ) {
    this.patientRepository = patientRepository;
  }

  async create(
    userId: number,
    createPatientDto: CreatePatientDto,
  ): Promise<Patient> {
    return this.patientRepository.save({
      userId: userId,
      ...createPatientDto,
    });
  }

  async findAll(userId: number): Promise<Patient[]> {
    return await this.patientRepository.query(`
    SELECT
      p.patientId,
      p.name,
      p.birthdate,
      p.email,
      p.genre,
      p.userId,
      (SELECT
        a.lastUpdate
      FROM
        analisys a
      WHERE
        a.patientId = p.patientId
      ORDER BY
        a.lastUpdate DESC
      LIMIT 1) AS 'lastAnalisys'
    FROM
      patient p
    WHERE
      p.userId = ${Number(userId)};`);
  }

  async findOne(patientId: number, userId: number): Promise<Patient> {
    return await this.patientRepository.findOne({
      where: {
        userId: userId,
        patientId: patientId,
      },
    });
  }

  async update(
    patientId: number,
    userId: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    await this.patientRepository.update(
      { patientId: patientId, userId: userId },
      { ...updatePatientDto },
    );
    return await this.findOne(patientId, userId);
  }

  async remove(patientId: number, userId: number): Promise<void> {
    await this.patientRepository.delete({
      patientId: patientId,
      userId: userId,
    });
  }
}
