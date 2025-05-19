import s from './counter.module.css'
import {CounterSettings} from "./counter-settings/counter-settings.tsx";
import {CounterDisplay} from "./counter-display/counter-display.tsx";
import {useState} from "react";

export type StatusType = "preparing" | "counting" | null

type Props = {
    min?: number
    max?: number
}
export type ValuesType = {
    minDefaultValue: number
    maxDefaultValue: number
}
const defaultValues: ValuesType = {
    minDefaultValue: 2,
    maxDefaultValue: 10
}

export const Counter = (props: Props) => {
    const {minDefaultValue, maxDefaultValue} = defaultValues

    const [count, setCount] = useState<number>(0)
    const [values, setValues] = useState({
        min: props.min ?? minDefaultValue,
        max: props.max ?? maxDefaultValue
    })
    const {min,max} = values

    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusType>("preparing")

    const updateCounter = (min: number, max: number) => {
        setValues({
            ...values,
            min,
            max
        })

        setCount(min)
    }

    return (
        <div className={s.counter}>
            <CounterSettings
                min={props.min} max={props.max}
                defaultValues={defaultValues}
                setStatus={setStatus}
                status={status}
                error={error}
                setError={setError}
                updateCounter={updateCounter}/>
            <CounterDisplay
                status={status}
                error={error}
                minValue={min}
                maxValue={max}
                setCount={setCount}
                count={count}/>
        </div>
    )
}
