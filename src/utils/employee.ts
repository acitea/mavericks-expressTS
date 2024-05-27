import { Employee } from "../models/employee";

export function employeeIsSame(emp1 : Employee, emp2 : Employee) : Boolean {
    return (
        emp1.id == emp2.id &&
        emp1.name == emp2.name &&
        emp1.salary == emp2.salary &&
        emp1.departmentId == emp2.departmentId
    )
}

