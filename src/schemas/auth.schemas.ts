import * as z from "zod"

export const RegisterSchema=z
.object({
    name:z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .regex(/^\D+$/, "Name must not contain numbers"),
    email:z
        .email()
        .trim()
        .toLowerCase(),
    password:z
        .string()
        .min(8, `Password's length should be minimun 8`)
})
.strict()

export type RegisterInput = z.infer<typeof RegisterSchema>