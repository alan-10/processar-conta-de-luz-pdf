import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Invoice } from './Invoice'


@Entity()
export class SCEEEnergy {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  quantity: string;

  @Column()
  value: string;

  @OneToOne(() => Invoice)
  @JoinColumn()
  invoice:Invoice
}