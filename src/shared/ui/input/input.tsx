import s from './input.module.css'
import type {ChangeEvent} from "react";

type InputProps = {
    title: string
    value: number
    callback: (value: number) => void
    error: string | null
    name:string
}

export const Input = (props: InputProps) => {
    const {title,value,callback,name} = props

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = parseInt(e.target.value, 10)
        callback(currentValue)
    }
    const isValueIncorrect = value <= -1 || props.error ? s.input + ' ' + s.error : s.input

    return (
        <>
            <div>{title}:</div>
            <input className={isValueIncorrect} name={name} value={value} onChange={handleChange} type="number"/>
        </>
    )
}