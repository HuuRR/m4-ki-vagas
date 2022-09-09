import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
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

  //  @ManyToOne((type=>)Vancancies,(vancancies)=>vancancies.interviews)
  //   @JoinColumn()
  //   vancancy:Vancancies
}
