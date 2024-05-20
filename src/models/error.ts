import z from 'zod'


const EmployeeError = z.object({
    status : z.number(),
    errorMessage : z.string()
})

type EmployeeError = z.infer<typeof EmployeeError>

export default EmployeeError
