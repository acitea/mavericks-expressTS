import { ZodError, z } from "zod";
import { Employee } from "../models/employee";
import { Request, Response, NextFunction } from "express";
import EmployeeError from "../models/error";

export function employeeIsSame(emp1 : Employee, emp2 : Employee) : Boolean {
    return (
        emp1.id == emp2.id &&
        emp1.name == emp2.name &&
        emp1.salary == emp2.salary &&
        emp1.departmentId == emp2.departmentId
    )
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json(err)
    } else if (err instanceof Error) {
        return res.status(404).json(err.message)
    }
}