import * as z from "zod";
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strict>;
export type LoginInput = z.infer<typeof LoginSchema>;
//# sourceMappingURL=login.schemas.d.ts.map