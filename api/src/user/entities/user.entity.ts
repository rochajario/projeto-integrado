import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({
    nullable: false,
    primary: true,
    generated: 'increment',
  })
  userId?: number;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  lastLogin?: Date;

  @Column({
    type: 'varchar',
  })
  firstName: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password?: string;

  patients?: Patient[];
}
