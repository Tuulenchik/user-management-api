import { RegisterInput } from "../schemas/auth.schemas";
import { LoginInput } from "../schemas/login.schemas";
import { Role, UpdateUserInput } from "../schemas/user.schemas"

declare global{
    namespace Express {
        interface Locals{
            role?:Role;
            userId?:string;
            authRole?:Role;
            authUserId?:string;
            updateUserInput?:UpdateUserInput
            registerInput?:RegisterInput;
            loginInput?:LoginInput
        }
    }
}

export{}