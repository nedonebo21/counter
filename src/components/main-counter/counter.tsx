import s from './counter.module.css'
import {CounterSettings} from "./counter-settings/counter-settings.tsx";
import {CounterDisplay} from "./counter-display/counter-display.tsx";
import {useEffect, useState} from "react";

export type StatusType = "preparing" | "counting" | null

type Props = {
    min?: number
    max?: number
}
export type ValuesType = {
    minDefaultValue?: number
    maxDefaultValue?: number
}
export type InputErrorsType = {
    min?: string
    max?: string
    lastChanged?: 'min' | 'max'
}
const defaultValues: ValuesType = {
    minDefaultValue: 2,
    maxDefaultValue: 10
}

export const Counter = (props: Props) => {
    const {minDefaultValue, maxDefaultValue} = defaultValues

    const [count, setCount] = useState<number>(() => {
        const savedCount = localStorage.getItem('counterValue')
        return savedCount !== null ? JSON.parse(savedCount) : 0
    })
    const [values, setValues] = useState(() => {
        const savedMinValue = localStorage.getItem('valuesMin')
        const savedMaxValue = localStorage.getItem('valuesMax')
        return {
            min: savedMinValue !== null ? JSON.parse(savedMinValue) : (props.min ?? minDefaultValue),
            max: savedMaxValue !== null ? JSON.parse(savedMaxValue) : (props.max ?? maxDefaultValue),
        }
    })

    useEffect(() => {
        localStorage.setItem('valuesMin', JSON.stringify(values.min))
    }, [values.min]);
    useEffect(() => {
        localStorage.setItem('valuesMax', JSON.stringify(values.max))
    }, [values.max]);
    const {min, max} = values

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(count))
    }, [count]);

    const [inputError, setInputError] = useState<InputErrorsType>({})
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const [status, setStatus] = useState<StatusType>(() => {
        const savedStatus = localStorage.getItem('counterStatus')
        return savedStatus !== null ? JSON.parse(savedStatus) : 'preparing'
    })

    useEffect(() => {
        localStorage.setItem('counterStatus', JSON.stringify(status))
    }, [status]);

    const [isFirstEntry, setIsFirstEntry] = useState(() => {
        const savedFirstEntry = localStorage.getItem('firstEntry')
        return savedFirstEntry !== null ? JSON.parse(savedFirstEntry) : true
    })
    useEffect(() => {
        localStorage.setItem('firstEntry', JSON.stringify(isFirstEntry))
    }, [isFirstEntry]);

    const updateCounter = (min: number, max: number) => {
        setValues({
            ...values,
            min,
            max
        })

        setCount(min)
        setIsFirstEntry(false)
    }
    const isStatusCounting = status === 'counting'
    const isStatusPreparing = status === 'preparing'

    const counterBlockClass = () => {
        const classesArr = [s.counter]
        if(isStatusPreparing) return classesArr.join(' ')
        if(isStatusCounting) classesArr.push(s.counting)
        if(count === max) classesArr.push(s.maxCount)
        return classesArr.join(' ')
    }

    return (
        <div className={counterBlockClass()}>
            {
                isStatusPreparing &&
                    <CounterSettings
                        setInputError={setInputError}
                        inputError={inputError}
                        minValueCount={min}
                        maxValueCount={max}
                        defaultValues={defaultValues}
                        setStatus={setStatus}
                        setIsChanged={setIsChanged}
                        isChanged={isChanged}
                        updateCounter={updateCounter}
                        isFirstEntry={isFirstEntry}
                    />
            }
            {
                isStatusCounting &&
                <CounterDisplay
                    status={status}
                    inputError={inputError}
                    minValue={min}
                    maxValue={max}
                    setCount={setCount}
                    setStatus={setStatus}
                    isStatusPreparing={isStatusPreparing}
                    count={count}/>
            }
        </div>
    )
}
