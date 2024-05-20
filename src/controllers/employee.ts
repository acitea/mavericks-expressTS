import { Employee } from "../models/employee"
import { Employee as DBEmployee } from "../models/Employee.entity"
import { RequestHandler, Request, Response, NextFunction } from "express"
// import { DATA } from "../MOCK_DATA"
import { employeeIsSame } from "../utils/employee"
import { db } from "../dataSource"


db.initialize()

const EMPLOYEE = db.getRepository(DBEmployee)

export  async function getAllEmployee(req : Request, res : Response, next : NextFunction) {
    return res.status(200).json(await EMPLOYEE.find())
}

export  async function getSingleEmployee(req : Request, res : Response, next : NextFunction) {
    const id: number = Number(req.params.emp_id)

    const result = await EMPLOYEE.findOneByOrFail({id})

    if (result) {
        return res.status(200).json(Employee.parse(result))
    }

}

export  async function deleteEmployee(req : Request, res : Response, next : NextFunction) {
    const id: number = Number(req.params.emp_id)

    const idExists = await EMPLOYEE.existsBy({id})

    if (!idExists) {
        throw new Error(`${id} Not found.`)
    }

    await EMPLOYEE.delete({id})
    return res.status(204).json('Deleted.')
}

export  async function updateSingleEmployee(req : Request, res : Response, next : NextFunction) {
    const id: number = Number(req.params.emp_id)

    let idExists = await EMPLOYEE.findOneByOrFail({id})

    const currentEmployee = Employee.parse({...idExists})
    const updatedEmployee : Employee = Employee.parse({...req.body})

    if (employeeIsSame(currentEmployee, updatedEmployee)) {
        return res.status(304).json('No Change')
    }

    EMPLOYEE.save(updatedEmployee)
    return res.status(200).json(updatedEmployee)

}

export function createEmployee(req : Request, res : Response, next : NextFunction) {
    const reqEmployee = req.body

    const newEmployee : Employee  = Employee.parse(reqEmployee)
    EMPLOYEE.save(newEmployee)

    return res.status(200).json(newEmployee)
}