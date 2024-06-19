

"use client"
import { RegisterOptions, UseFormRegister } from "react-hook-form"



interface TextareaProps{
    type: string,
    placeholder: string,
    name: string,
    register: UseFormRegister<any>,
    error?: string,
    rules?: RegisterOptions
}

export function Textarea({ name, placeholder, type, register, rules, error } : TextareaProps){
    return(
        <>
            <textarea 
                placeholder={placeholder}
                className="w-full border-2 px-2 rounded-md mb-2 h-24 resize-none"
                {...register(name, rules)}
                id={name}
            ></textarea>
            {error && (
                <p className="text-red-500 my-1">{error}</p>
            )}
        </>
    )
}