import { AntropometryResult } from '../models/antropometry/antropometry-result';

export class AnalisysReport {
  antropometry: AntropometryResult = new AntropometryResult();

  constructor(readonly patientId: number, readonly analisysId: number) {}
}
