import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Vacancies } from "./vacancies.entity";

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column({ unique: true })
    @Exclude()
    CNPJ:string

    @Column()
    cidade_estado:string

    @Column()
    qtde_funcionarios:string

    @Column({ unique: true })
    email:string

    @Column({ default: true })
    isActive:boolean

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Vacancies, (vacancies) => vacancies.id)
    vacancies: Vacancies
}