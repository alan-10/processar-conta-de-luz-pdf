import { Repository, DataSource } from 'typeorm';
import { GDEnergy } from '../entities/GDEnergy'


export class GDEnergyRepository extends Repository<GDEnergy> {
  constructor(private dataSource: DataSource) {
    super(GDEnergy, dataSource.createEntityManager());
  }
}