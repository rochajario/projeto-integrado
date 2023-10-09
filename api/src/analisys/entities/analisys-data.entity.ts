import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AnalisysState } from '../models/analisys-state.enum';
import { AntropometryData } from '../models/antropometry/antropometry-data';
import { Patient } from '../../patient/entities/patient.entity';

@Entity('analisys')
export class AnalisysData {
  @Column({
    nullable: false,
    primary: true,
    generated: 'increment',
  })
  analisysId?: number;

  @ManyToOne((type) => Patient, (patient) => patient.analisys, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patientId: number;

  @Column({
    nullable: false,
  })
  actualState: AnalisysState;

  @Column({
    nullable: false,
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @Column({
    nullable: true,
    type: 'simple-json',
  })
  antropometry: AntropometryData;

  @Column({
    nullable: true,
    type: 'simple-json',
  })
  previousInformation?: string;

  @Column({
    nullable: true,
    type: 'simple-json',
  })
  anamnese?: string;
}
