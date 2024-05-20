import { Router } from "express";
import { createEmployee, deleteEmployee, getAllEmployee, getSingleEmployee, updateSingleEmployee } from "../controllers/employee";

const router = Router()

router.get('/', (req, res) => {
    res.json('WOw u made it')
})
router.get('/employee', getAllEmployee)
router.post('/employee', createEmployee)
router.get('/employee/:emp_id', getSingleEmployee)
router.put('/employee/:emp_id', updateSingleEmployee)
router.delete('/employee/:emp_id', deleteEmployee)


export default router