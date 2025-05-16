import s from './input.module.css'
import type {ChangeEvent} from "react";

type Props = {
    title: string
    value: number
    callback: (value: number) => void
    error: string | null
}

export const Input = (props: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = parseInt(e.target.value, 10)
        props.callback(currentValue)
    }
    const isValueIncorrect = props.error ? s.input + ' ' + s.error : s.input

    return (
        <>
            <div>{props.title}:</div>
            <input className={isValueIncorrect} value={props.value} onChange={handleChange} type="number"/>
        </>
    )
}