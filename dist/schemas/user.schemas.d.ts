import * as z from "zod";
export declare const Roles: readonly ["user", "admin"];
export declare const RoleSchema: z.ZodEnum<{
    user: "user";
    admin: "admin";
}>;
export declare const UsersParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strict>;
export declare const UsersQuerySchema: z.ZodObject<{
    role: z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>>;
}, z.core.$strict>;
export declare const UpdateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
    }>>;
    email: z.ZodOptional<z.ZodEmail>;
}, z.core.$strict>;
export type Role = z.infer<typeof RoleSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
//# sourceMappingURL=user.schemas.d.ts.map