import { User } from "../models/users.model.mongo"
import { Role, UpdateUserInput } from "../schemas/user.schemas"


export async function listUsers() {
    return await User.find({})
         
}

export async function listUsersByRole(role:Role) {
    return await User.find({role})
    
}

export async function getUserbyID(id:string) {
    return await User.findById(id)
     
}

export async function updatingUser(id:string,data:UpdateUserInput) {
    return await User.findByIdAndUpdate(id, data, {new:true, runValidators:true} )
    
}

export async function deletingUser(id:string) {
    return await User.findByIdAndDelete(id)
    
}
