import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/entities/user.entity';
import { Patient } from './patient/entities/patient.entity';
import { AnalisysModule } from './analisys/analisys.module';
import { AnalisysData } from './analisys/entities/analisys-data.entity';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      synchronize: true,
      entities: [User, Patient, AnalisysData],
    }),
    AuthModule,
    UserModule,
    PatientModule,
    AnalisysModule,
  ],
})
export class AppModule {}
