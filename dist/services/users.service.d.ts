import { Role, UpdateUserInput } from "../schemas/user.schemas";
export declare function listUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../models/users.model.mongo").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/users.model.mongo").IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare function listUsersByRole(role: Role): Promise<(import("mongoose").Document<unknown, {}, import("../models/users.model.mongo").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/users.model.mongo").IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare function getUserbyID(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/users.model.mongo").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/users.model.mongo").IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function updatingUser(id: string, data: UpdateUserInput): Promise<(import("mongoose").Document<unknown, {}, import("../models/users.model.mongo").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/users.model.mongo").IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare function deletingUser(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/users.model.mongo").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/users.model.mongo").IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=users.service.d.ts.map