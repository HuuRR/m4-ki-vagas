import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";
import { Exclude } from "class-transformer"

@Entity("user_skills")
export class User_skills {
    @PrimaryGeneratedColumn("uuid")
    @Exclude()
    id: string

    @Column({ nullable: true, default: false })
    excel: boolean

    @Column({ nullable: true, default: false })
    javascript: boolean

    @Column({ nullable: true, default: false })
    react: boolean

    @Column({ nullable: true, default: false })
    css: boolean

    @Column({ nullable: true, default: false })
    html: boolean

    @Column({ nullable: true, default: false })
    express: boolean

    @Column({ nullable: true, default: false })
    docker: boolean
}