import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./users.entity";
import { Vacancies } from "./vacancies.entity";

@Entity("applications")
export class Applications {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  valid: Date;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Vacancies, { eager: true })
  vacancy: Vacancies;
}
