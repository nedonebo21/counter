import s from './second-counter.module.css'
import {SecondCounterSettings} from "./second-counter-settings/second-counter-settings.tsx";
import {SecondCounterDisplay} from "./second-counter-display/second-counter-display.tsx";
import {useState} from "react";

export type StatusType = 'counting' | 'preparing'
export type ValuesType = {
    minDefaultValue: number
    maxDefaultValue: number
}
const defaultValues: ValuesType = {
    minDefaultValue: 2,
    maxDefaultValue: 10
}
type Props = {
    min?: number
    max?: number
}

export const SecondCounter = (props: Props) => {
    const {minDefaultValue, maxDefaultValue} = defaultValues

    const [count, setCount] = useState<number>(props.min ?? minDefaultValue )
    const [values, setValues] = useState({
        min: props.min ?? minDefaultValue,
        max: props.max ?? maxDefaultValue,
    })
    const [error, setError] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusType>('counting')
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const isStatusPreparing = status === 'preparing' || isChanged
    const isStatusCounting = status === 'counting'

    const updateCounter = (min: number, max: number) => {
        setValues({min, max})
        setCount(min)
    }
    const counterBlockClass = () => {
        const classesArr = [s.counter]
        if(isStatusPreparing) return classesArr.join(' ')
        if(isStatusCounting) classesArr.push(s.counting)
        if(count === values.max) classesArr.push(s.maxCount)
        return classesArr.join(' ')
    }


    return (
        <div className={counterBlockClass()}>
            <SecondCounterSettings
            error={error}
            setError={setError}
            updateCounter={updateCounter}
            minValue={values.min}
            maxValue={values.max}
            setStatus={setStatus}
            setIsChanged={setIsChanged}
            />
            <SecondCounterDisplay
                setCount={setCount}
                count={count}
                minValue={values.min}
                maxValue={values.max}
                error={error}
                isChanged={isChanged}
            />
        </div>
    )
}
