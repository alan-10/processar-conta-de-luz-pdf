import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Invoice } from './Invoice'

@Entity()
export class ElectricalEnergy {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: string;

  @Column()
  value: string;


  @OneToOne(() => Invoice)
  @JoinColumn()
  invoice:Invoice
}