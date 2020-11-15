import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export default class Sale {
  @PrimaryGeneratedColumn()
  id!: number;
  @CreateDateColumn({type: "timestamp"})
  createdAt!: Date;
  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;
  @Column()
  value: number;
  @Column({nullable: true})
  key?: string;

  constructor(value: number) {
    this.value = value;
  }
}
