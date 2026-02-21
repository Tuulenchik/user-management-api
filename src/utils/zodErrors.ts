import { ZodError } from "zod";
import { badRequest } from "./httpErrors";

export function zodBadRequest (error: ZodError){
    const issues=error.issues.map((i)=>({
        path:i.path.join('.'),
        message:i.message,
        code:i.code
    }));

    const message = issues[0]?.message ?? 'Invalid request';
    const err = badRequest(message);
    (err as any).details=issues
    return err
}