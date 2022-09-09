import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./companies.entity";
import { Interviews } from "./interviews.entity";

@Entity("vacancies")
export class Vacancies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "decimal" })
  salary: number;

  @Column()
  description: string;

  @ManyToOne(() => Company, { eager: true })
  company: Company;

//DESCOMENTAR QUANDO TIVER FEITO A ENTITY "VACANCY_SKILLS"
//   @OneToMany(() => Vacancy_skills, (vacancy_skills) => vacancy_skills.vancancy)
//   vacancy_skills: Vacancy_skills;

  @OneToMany(() => Interviews, (interview) => interview.vancancy)
  interview: Interviews;
}
