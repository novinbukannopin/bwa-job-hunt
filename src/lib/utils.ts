import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import bcrypt from "bcryptjs"
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
}

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, init)

    return res.json() as Promise<JSON>
}

export const dateFormat = (date: any, format: string = "DD MM YYYY") => {
    return moment(date).format(format)
}