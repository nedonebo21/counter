import s from './input.module.css'
import type {ChangeEvent} from "react";

type InputProps = {
    title: string
    value: number
    onChange: (value: number) => void
    errorMessage?: string | null
    name: string
}

export const Input = (props: InputProps) => {
    const {title, value, onChange, name, errorMessage} = props

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = parseInt(e.target.value, 10)
        onChange(currentValue)
    }
    const isValueIncorrect =  errorMessage ? `${s.input} ${s.error}` : s.input

    return (
        <label>
            <span>{title}:</span>
            <input className={isValueIncorrect} name={name} value={value} onChange={handleChange} type="number"/>
            {!!errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
        </label>
    )
}