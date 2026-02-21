import * as z from "zod"

export const Roles = ['user','admin'] as const
export const RoleSchema = z.enum(Roles)


export const UsersParamsSchema=z
.object({
    id:z
        .string()
})
.strict();

export const UsersQuerySchema=z
.object({
    role:RoleSchema.optional(),
})
.strict();

export const UpdateUserSchema=z
    .object({
        name:z
            .string()
            .trim()
            .min(2, 'Name must be at least 2 characters')
            .regex(/^\D+$/, "Name must not contain numbers")
            .optional(),
        role:RoleSchema.optional(),
        email:z
            .email()
            .trim()
            .toLowerCase()
            .optional(),
    })
    .strict()
    .refine((data)=>data.name !== undefined || data.role !== undefined || data.email !== undefined, {
        message:'No update information written'
    });

export type Role = z.infer<typeof RoleSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>