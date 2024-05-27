import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm"
import { Employee } from "./Employee.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    username : string

    @Column()
    password : string

    @OneToOne(() => Employee, {eager: true})
    @JoinColumn()
    Employee: Employee
}