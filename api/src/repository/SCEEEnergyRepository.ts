import { Repository, DataSource } from 'typeorm';
import {SCEEEnergy  } from '../entities/SCEEEnergy'


export class SCEEEnergyRepository extends Repository<SCEEEnergy> {
  constructor(private dataSource: DataSource) {
    super(SCEEEnergy, dataSource.createEntityManager());
  }
}