import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity("user_skills")
export class User_skills {
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
}
