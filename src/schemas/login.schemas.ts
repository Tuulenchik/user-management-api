import * as z from "zod"

export const LoginSchema=z
.object({
    email:z
        .email()
        .trim()
        .toLowerCase(),
    password:z
        .string()
        .min(1, 'Password is required')
})
.strict()

export type LoginInput = z.infer<typeof LoginSchema>