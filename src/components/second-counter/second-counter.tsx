import s from './second-counter.module.css'
import {SecondCounterSettings} from "./second-counter-settings/second-counter-settings.tsx";
import {SecondCounterDisplay} from "./second-counter-display/second-counter-display.tsx";
import {useEffect, useState} from "react";

export type StatusType = 'counting' | 'preparing'
export type ValuesType = {
    minDefaultValue: number
    maxDefaultValue: number
}
const defaultValues: ValuesType = {
    minDefaultValue: 2,
    maxDefaultValue: 10
}
export type InputErrorsType = {
    min?: string
    max?: string
    lastChanged?: 'min' | 'max'
}

type Props = {
    min?: number
    max?: number
}

export const SecondCounter = (props: Props) => {
    const {minDefaultValue, maxDefaultValue} = defaultValues

    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem('secondCounterValue')
        return savedCount !== null ? JSON.parse(savedCount) : (props.min ?? minDefaultValue)
    })
    // const [values, setValues] = useState({
    //     min: props.min ?? minDefaultValue,
    //     max: props.max ?? maxDefaultValue,
    // })

    const [values, setValues] = useState(() => {
        const savedMinValue = localStorage.getItem('secondValuesMin')
        const savedMaxValue = localStorage.getItem('secondValuesMax')
        return {
            min: savedMinValue !== null ? JSON.parse(savedMinValue) : (props.min ?? minDefaultValue),
            max: savedMaxValue !== null ? JSON.parse(savedMaxValue) : (props.max ?? maxDefaultValue),
        }
    })

    const [inputError, setInputError] = useState<InputErrorsType>({})

    const [status, setStatus] = useState<StatusType>('counting')
    const [isChanged, setIsChanged] = useState<boolean>(false)
    const isStatusPreparing = status === 'preparing' || isChanged
    const isStatusCounting = status === 'counting'

    useEffect(() => {
        localStorage.setItem('secondCounterValue', JSON.stringify(count))
    }, [count]);
    useEffect(() => {
        localStorage.setItem('secondValuesMin', JSON.stringify(values.min))
    }, [values.min]);
    useEffect(() => {
        localStorage.setItem('secondValuesMax', JSON.stringify(values.max))
    }, [values.max]);

    const updateCounter = (min: number, max: number) => {
        setValues({min, max})
        setCount(min)
    }
    const counterBlockClass = () => {
        const classesArr = [s.counter]
        if (isStatusPreparing) return classesArr.join(' ')
        if (isStatusCounting) classesArr.push(s.counting)
        if (count === values.max) classesArr.push(s.maxCount)
        return classesArr.join(' ')
    }

    return (
        <div className={counterBlockClass()}>
            <SecondCounterSettings
                setInputError={setInputError}
                inputError={inputError}
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
                inputError={inputError}
                isChanged={isChanged}
            />
        </div>
    )
}
