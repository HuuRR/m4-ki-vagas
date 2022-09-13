import { Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Interviews } from "./interviews.entity";
import { User_skills } from "./user_skills.entity";
import { Applications } from "./applications.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  @Exclude()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  email: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  CPF: string

  @Column({ nullable: false, default: true })
  @Exclude()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Interviews, (interviews) => interviews.user, { eager: true })
  interviews: Interviews[];

  @OneToOne(() => User_skills, (user_skills) => user_skills.id, { eager: true })
  @JoinColumn()
  user_skills: User_skills

  @OneToMany(() => Applications, (application) => application.user)
  application: Applications;

}