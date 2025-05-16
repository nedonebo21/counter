import s from './counter.module.css'
import {CounterSettings} from "./counter-settings/counter-settings.tsx";
import {CounterDisplay} from "./counter-display/counter-display.tsx";
import {useState} from "react";

export type StatusType = "preparing" | "counting" | null

type Props = {
    minValue?: number
    maxValue?: number
}
type ValuesType = {
    minDefaultValue: number
    maxDefaultValue: number
}
const defaultValues: ValuesType = {
    minDefaultValue: 0,
    maxDefaultValue: 5
}

export const Counter = (props: Props) => {
    const [count, setCount] = useState<number>(0)
    const [minValue, setMinValue] = useState<number>(props.minValue ?? defaultValues.minDefaultValue)
    const [maxValue, setMaxValue] = useState<number>(props.maxValue ?? defaultValues.maxDefaultValue)
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusType>("preparing")

    const updateCounter = (minValue: number, maxValue: number) => {
        setMinValue(minValue)
        setMaxValue(maxValue)

        setCount(minValue)
    }

    return (
        <div className={s.counter}>
            <CounterSettings
                setStatus={setStatus}
                status={status}
                error={error}
                setError={setError}
                updateCounter={updateCounter}/>
            <CounterDisplay
                status={status}
                error={error}
                minValue={minValue}
                maxValue={maxValue}
                setCount={setCount}
                count={count}/>
        </div>
    )
}
