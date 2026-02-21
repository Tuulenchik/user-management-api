import { AppError } from "../middleware/errorHandler/errorHandler";

export function notFound (message = 'not Found'):AppError {
    const err = new Error(message) as AppError
    err.status = 404
    return err
}

export function badRequest (message= 'Bad Request'): AppError {
    const err = new Error (message) as AppError
    err.status=400
    return err
}

export function conflict (message= 'Conflict'): AppError {
    const err = new Error (message) as AppError
    err.status=409
    return err
}

export function unauthorized (message= 'Unauthorized'): AppError {
    const err = new Error (message) as AppError
    err.status=401
    return err
}

export function forbidden (message= 'Forbidden'): AppError {
    const err = new Error (message) as AppError
    err.status=403
    return err
}
