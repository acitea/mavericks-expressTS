import { Employee } from "../models/employee"
import { Employee as DBEmployee } from "../models/Employee.entity"
import { User as DBUser } from "../models/User.entity"
import { Request, Response, NextFunction } from "express"
import { employeeIsSame } from "../utils/employee"
import { db } from "../dataSource"
import { Department } from "../models/Department.entity"
import bcrypt from 'bcryptjs'
import { sign } from "jsonwebtoken"
import { SECRET } from "../utils/express"

db.initialize()

const EMPLOYEE = db.getRepository(DBEmployee)
const USER = db.getRepository(DBUser)
const DEPARTMENTS = db.getRepository(Department)

export  async function getAllEmployee(req : Request, res : Response, next : NextFunction) {

    let role = (req as any).user.role
    const dept = await DEPARTMENTS.findOneByOrFail({
        name : role
    })
    let page = Math.max(1, parseInt(req.query.page as string) || 1 )
    let limit = Math.max(1, parseInt(req.query.limit as string) || 10 )
    const offset = (page - 1) * limit
    let employees : DBEmployee[], totalEmployees

    switch (dept.name) {
        case 'admin':
            
            [employees, totalEmployees] = await EMPLOYEE.findAndCount({
                skip: offset,
                take: limit,
            })
            break;
    
        default:
            [employees, totalEmployees] = await EMPLOYEE.findAndCountBy({
                department : dept
            })
            console.log(employees)
            employees = employees.slice((page - 1) * limit, Math.min(page * limit, totalEmployees))
            break;
    }

    const totalPages = Math.ceil(totalEmployees / limit)

    return res.status(200).json({
        data: employees,
        meta: {
            totalEmployees,
            totalPages,
            currentPage: page,
            limit,
        },
    })
}

export  async function getSingleEmployee(req : Request, res : Response, next : NextFunction) {
    const id: number = Number(req.params.emp_id)

    const result = await EMPLOYEE.findOneByOrFail({id})

    if (result) {
        return res.status(200).json(result)
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
    const dept = await DEPARTMENTS.findOneByOrFail({
        name : req.body.department.name
    })

    const currentEmployee = Employee.parse({...idExists, departmentId : idExists.department.id})
    const updatedEmployee : Employee = Employee.parse({...req.body, departmentId : dept.id, id : idExists.id})

    if (employeeIsSame(currentEmployee, updatedEmployee)) {
        return res.status(304).json('No Change')
    }

    idExists.department = dept
    idExists.name = req.body.name
    idExists.salary = req.body.salary

    await EMPLOYEE.save(idExists)
    return res.status(200).json({...req.body, id : idExists.id})

}

export async function createEmployee(req : Request, res : Response, next : NextFunction) {
    const reqEmployee = req.body

    const dept = await DEPARTMENTS.findOneByOrFail({
        name : reqEmployee.department
    })

    reqEmployee.departmentId = dept.id
    reqEmployee.department = dept

    const newEmployee : Employee  = Employee.parse(reqEmployee)

    await EMPLOYEE.save(reqEmployee)

    return res.status(200).json(newEmployee)
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
    const { username, password, employee } = req.body
    const existingUser = await USER.findOne({ where: { username } })

    const existingEmployee = await EMPLOYEE.findOneByOrFail({
        id : employee
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {} as DBUser
    newUser.username = username
    newUser.password = hashedPassword
    newUser.Employee = existingEmployee
    console.log(newUser)

    await USER.save(newUser)

    res.status(201).json({ message: 'User registered successfully' })
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    const { username, password } = req.body
    const user = await USER.findOneByOrFail({
        username
    })

    const isPasswordValid = await bcrypt.compare(password, user.password) // Correct comparison

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' })
    }

    console.log(user)

    const token = sign({ role : user.Employee.department.name }, SECRET, { expiresIn: '1h' })
    res.status(200).header('Set-Cookie', `jwt=${token}`).json({ token })
}