import * as z from "zod";
export declare const RegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strict>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
//# sourceMappingURL=auth.schemas.d.ts.map