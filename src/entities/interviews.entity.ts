import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Vacancies } from "./vacancies.entity";
import User from "./users.entity";

@Entity()
export class Interviews {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @Column({ default: false })
  isOver: boolean;

  @Column({ default: null })
  feedback: string;

  @ManyToOne((type) => User, (user) => user.interviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Vacancies, (vancancies) => vancancies.interview)
  @JoinColumn()
  vancancy: Vacancies;
}
