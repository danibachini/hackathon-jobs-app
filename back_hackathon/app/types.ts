import { Request } from "express"

interface ISignUserBody {
    email: string,
    password: string
}

interface ISignUpUserBody {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    role: string
}

export type User = {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    role: string
    skillTree?: [],
    tasks?: []
}

export interface SignInRequestType extends Request {
    body: ISignUserBody
}
export interface SignUpRequestType extends Request {
    body: ISignUpUserBody
}

