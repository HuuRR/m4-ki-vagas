import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity("feedbacks")
export class Feedbacks {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    feedback: string
}