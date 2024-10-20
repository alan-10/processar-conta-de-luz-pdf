import { Entity,Column , PrimaryGeneratedColumn  } from 'typeorm';


@Entity()
export class Invoice {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  numeroClient: String;

  @Column({type: 'timestamptz'})
  emitionDate: Date;
}