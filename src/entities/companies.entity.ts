import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

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

    @Column()
    isActive:boolean

    @Column()
    @Exclude()
    password: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
   
}