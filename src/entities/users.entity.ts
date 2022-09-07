import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm"
import { Exclude } from "class-transformer"


@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    @Exclude()
    password: string

    @Column({ nullable: false, unique: true })
    @Exclude()
    email: string

    @Column({ nullable: false, unique: true, length: 11 })
    @Exclude()
    cpf: number

    @Column({ nullable: false, default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    // foregeing key missing
}