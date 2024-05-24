import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Employee } from "./Employee.entity"

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @OneToMany(() => Employee, (employee : Employee) => employee.department)
    employee: Employee[]
}