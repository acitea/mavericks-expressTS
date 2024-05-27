import { z } from 'zod'

export const User = z.object({
    id : z.coerce.number().optional(),
    username : z.string(),
    password : z.string(),
    employeeId : z.coerce.number()
})

export type User = z.infer<typeof User>

