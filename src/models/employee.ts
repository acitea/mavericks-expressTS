import { z } from 'zod'

export const Employee = z.object({
    id : z.coerce.number().optional(),
    name : z.string(),
    salary : z.coerce.number(),
    departmentId : z.coerce.number()
})

export type Employee = z.infer<typeof Employee>

