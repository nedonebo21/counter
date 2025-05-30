import s from '../counter.module.css'
import {Input} from "../../../shared/ui/input/input.tsx";
import {Button} from "../../../shared/ui/button/button.tsx";
import {useState} from "react";
import type {StatusType, ValuesType} from "../counter.tsx";
import type {InputErrorsType} from "../counter.tsx";

type Props = {
    updateCounter: (minValue: number, maxValue: number) => void
    setStatus: (status: StatusType) => void
    defaultValues: ValuesType
    minValueCount: number
    maxValueCount: number
    isFirstEntry: boolean
    setInputError: (inputError: InputErrorsType) => void
    inputError: InputErrorsType
    setIsChanged: (isChanged: boolean) => void
    isChanged: boolean
}

export const CounterSettings = (props: Props) => {
    const {
        updateCounter,
        setInputError,
        setIsChanged,
        isChanged,
        inputError,
        setStatus,
        minValueCount,
        maxValueCount,
        isFirstEntry} = props


    const [valuesSettings, setValuesSettings] = useState({
        min: minValueCount,
        max: maxValueCount,
    })

    const {min, max} = valuesSettings

    const checkValues = (min?: number, max?: number) => {
        const errors:InputErrorsType = {}
        if (min === undefined || isNaN(min)){
            errors.min = 'incorrect value'
        } else if (min <= -1){
            errors.min = 'min value cannot be negative'
        }

        if(max === undefined || isNaN(max)){
            errors.max = 'incorrect value'
        } else if (max <= 0){
            errors.max = 'max value must be > 0'
        }

        if (max !== undefined && min !== undefined && !isNaN(max) && !isNaN(min)){
            if (min >= max) {
                if (!errors.min){
                    errors.min = 'min value must be less than max'
                }
                if (!errors.max) {
                    errors.max = 'max value must be greater than min'
                }
            }
        }

        return errors
    }
    const handleValueChange = (value: number, type: 'min' | 'max') => {

        let lockMinInputValue = value
        if (type === 'min' && value < - 1){
            lockMinInputValue = -1
        }
        if (type === 'max' && value < 0){
            lockMinInputValue = 0
        }

        const inputValues = {
            ...valuesSettings,
            [type]: lockMinInputValue
        }
        setValuesSettings(inputValues)

        const errors = checkValues(inputValues.min, inputValues.max)
        setInputError({...errors, lastChanged: type})

        const valuesUnchanged = inputValues.min === minValueCount && inputValues.max === maxValueCount
        setIsChanged(!valuesUnchanged)
    }

    const handleSet = () => {
        if (min >= max || min <= -1 || max <= 0) return
        updateCounter(min, max)
        setStatus('counting')
        setIsChanged(false)
    }
    const handleBack = () => {
        setStatus('counting')
        setIsChanged(false)
    }

    const isSaveDisabled = (!!inputError.min || !!inputError.max) || (!isFirstEntry && !isChanged)

    const messageToShow = (): {text: string, isError: boolean} => {
        if (inputError.lastChanged === 'min' && inputError.min){
            return {text: inputError.min, isError: true}
        } else if (inputError.lastChanged === 'max' && inputError.max){
            return {text:inputError.max, isError: true}
        } else if (inputError.min){
            return {text: inputError.min, isError: true}
        } else if (inputError.max){
            return {text:inputError.max, isError: true}
        }

        if (isFirstEntry || isChanged){
            return {text: `enter your values and press 'set'`, isError: false}
        }

        return {text: 'counter settings', isError: false}
    }
    const {text, isError} = messageToShow()

    return (
        <div className={s.counterSettings}>
            <div className={isError ? s.error : s.setMessage}>
                {text}
            </div>
            <div>
                <Input
                    error={inputError.min}
                    name={'min'}
                    callback={(value) => handleValueChange(value, 'min')}
                    value={min}
                    title={'Min Value'}/>
            </div>
            <div>
                <Input error={inputError.max}
                       name={'max'}
                       callback={(value) => handleValueChange(value, 'max')}
                       value={max}
                       title={'Max Value'}/>
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isFirstEntry} onClick={handleBack}>back</Button>
                <Button disabled={isSaveDisabled} onClick={handleSet}>save</Button>
            </div>
        </div>
    )
}
