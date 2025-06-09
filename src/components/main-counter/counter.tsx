import s from './counter.module.css'
import {CounterSettings} from "./counter-settings/counter-settings.tsx";
import {CounterDisplay} from "./counter-display/counter-display.tsx";
import { useState} from "react";
import {checkValues} from "../../shared/lib/check-values.ts";

export type StatusType = "preparing" | "counting" | null

type CounterProps = {
    min?: number
    max?: number
}

export type ErrorsType = {
    min?: string
    max?: string
    lastChanged?: 'min' | 'max'
}

export const Counter = (props: CounterProps) => {
    const [count, setCount] = useState<number>(() => {
        const savedValue = localStorage.getItem('currentValue')
        if (savedValue !== null) return JSON.parse(savedValue)
        if (props.min !== undefined && props.max !== undefined){
            return props.min
        }
        return 0
    })
    const [values, setValues] = useState<{min: number, max: number}>(() => {
        const savedMinValue = localStorage.getItem('minValue')
        const savedMaxValue = localStorage.getItem('maxValue')
        return {
            min: savedMinValue !== null ? JSON.parse(savedMinValue) : (props?.min ?? 0),
            max: savedMaxValue !== null ? JSON.parse(savedMaxValue) : (props?.max ?? 0),
        }
    })

    const {min, max} = values

    const [errors, setErrors] = useState<ErrorsType>(checkValues(values.min, values.max))
    const [status, setStatus] = useState<StatusType>(() => {
        const savedStatus = localStorage.getItem('currentStatus')
        if (savedStatus !== null) return JSON.parse(savedStatus)
        if (props.min !== undefined && props.max !== undefined) {
            return 'counting'
        }
        return 'preparing'
    })

    const isFirstEntry = count === 0

    const updateCounter = (min: number, max: number) => {
        localStorage.setItem('minValue', JSON.stringify(min))
        localStorage.setItem('maxValue', JSON.stringify(max))
        localStorage.setItem('currentValue', JSON.stringify(min))

        setValues({...values, min, max})
        setCount(min)
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

    const handleStatusChange = (status: StatusType) => {
        setStatus(status)
        localStorage.setItem('currentStatus', JSON.stringify(status))
    }

    return (
        <div className={counterBlockClass()}>
            {
                isStatusPreparing &&
                    <CounterSettings
                        setErrors={setErrors}
                        errors={errors}
                        minValueCount={min}
                        maxValueCount={max}
                        setStatus={handleStatusChange}
                        updateCounter={updateCounter}
                        isFirstEntry={isFirstEntry}
                    />
            }
            {
                isStatusCounting &&
                <CounterDisplay
                    status={status}
                    minValue={min}
                    maxValue={max}
                    setCount={(count) => {
                        localStorage.setItem('currentValue', JSON.stringify(count))
                        setCount(count)
                    }}
                    setStatus={handleStatusChange}
                    isStatusPreparing={isStatusPreparing}
                    count={count}/>
            }
        </div>
    )
}
