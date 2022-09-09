import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Vacancies } from "./vacancies.entity";

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

  //   @OneToOne((type)=>Feedbacks,{
  //     eager:true
  //   })
  //   @JoinColumn()
  //   feedback:Feedbacks

  //   @ManyToOne((type=>)Users,(users)=>users.interviews)
  //   @JoinColumn()
  //   user:Users

  @ManyToOne(() => Vacancies, (vancancies) => vancancies.interview)
  @JoinColumn()
  vancancy: Vacancies;
}
