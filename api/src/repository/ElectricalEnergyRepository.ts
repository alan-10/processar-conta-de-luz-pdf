import { Repository, DataSource } from 'typeorm';
import {ElectricalEnergy } from '../entities/ElectricalEnergy'


export class ElectricalEnergyRepository extends Repository<ElectricalEnergy> {
  constructor(private dataSource: DataSource) {
    super(ElectricalEnergy, dataSource.createEntityManager());
  }
}