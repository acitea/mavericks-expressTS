import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Department } from "./Department.entity"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    salary : number

    @ManyToOne(() => Department, (department : Department) => department.employee, {eager: true})
    department : Department
}