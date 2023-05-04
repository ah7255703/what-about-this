import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from "clsx"


export default function cn(...classNames: ClassValue[]) {
    return twMerge(clsx(...classNames))
}   