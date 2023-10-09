import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Genre } from '../enums/genre.enum';
import { AnalisysData } from '../../analisys/entities/analisys-data.entity';

@Entity()
export class Patient {
  @Column({
    nullable: false,
    primary: true,
    generated: 'increment',
  })
  patientId: number;

  @ManyToOne((type) => User, (user) => user.patients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  birthdate: Date;

  @Column({
    nullable: false,
    length: 50,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
  })
  genre: Genre;

  lastAnalisys: Date;
  analisys?: AnalisysData[];
}
