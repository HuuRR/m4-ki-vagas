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

  @Column({ default: null, nullable: true })
  isActive: boolean;

  @Column({ type: "date", nullable: true })
  valid: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: User;

  @ManyToOne(() => Vacancies, (vacancy) => vacancy.id, { eager: true })
  vacancy: Vacancies;
}
