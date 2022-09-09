import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity("vacancies_skills")
export class Vacancies_skills {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    excel: boolean

    @Column()
    javascript: boolean

    @Column()
    react: boolean

    @Column()
    css: boolean

    @Column()
    html: boolean

    @Column()
    express: boolean

    @Column()
    docker: boolean

    // @OneToMany(() => Vacancies, (Vacancies) => Vacancies.vacancies_skills_id)
    // vacancies: Vacancies[]
}
