import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import bcrypt from "bcryptjs"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
}