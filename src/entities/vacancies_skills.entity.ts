
import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity("vacancies_skills")
export class Vacancies_skills {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ default: false, nullable: true })
    excel: boolean

    @Column({ default: false, nullable: true })
    javascript: boolean

    @Column({ default: false, nullable: true })
    react: boolean

    @Column({ default: false, nullable: true })
    css: boolean

    @Column({ default: false, nullable: true })
    html: boolean

    @Column({ default: false, nullable: true })
    express: boolean

    @Column({ default: false, nullable: true })
    docker: boolean
}