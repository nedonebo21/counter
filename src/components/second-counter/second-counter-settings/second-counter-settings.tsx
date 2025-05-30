import s from '../second-counter.module.css'
import {Input} from "../../../shared/ui/input/input.tsx";
import {Button} from "../../../shared/ui/button/button.tsx";
import type {InputErrorsType, StatusType} from "../second-counter.tsx";
import {useState} from "react";

type Props = {
    updateCounter: (min: number, max: number) => void
    setStatus: (status: StatusType) => void
    setIsChanged: (isChanged: boolean) => void
    minValue: number
    maxValue: number
    inputError: InputErrorsType
    setInputError: (inputError: InputErrorsType) => void
}


export const SecondCounterSettings = (props: Props) => {
    const {
        updateCounter,
        setStatus,
        setIsChanged,
        setInputError,
        inputError,
        minValue,
        maxValue
    } = props

    const [valuesSettings, setValuesSettings] = useState({
        min: minValue,
        max: maxValue
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

        const valuesUnchanged = inputValues.min === minValue && inputValues.max === maxValue
        setIsChanged(!valuesUnchanged)
    }
    const handleSave = () => {
        if (min >= max || min < 0 || max < 0) return
        updateCounter(min, max)
        setStatus('counting')
        setIsChanged(false)
    }

    const isSaveDisabled = min < 0 || max < 0 || min >= max || (min === minValue && max === maxValue)

    return (
        <div className={s.counterSettings}>
            <div>
                <Input
                    error={inputError.min}
                    name={'min'}
                    callback={(value) => {
                        handleValueChange(value, 'min')
                    }}
                    value={min}
                    title={'Min Value'}/>
            </div>
            <div>
                <Input error={inputError.max}
                       name={'max'}
                       callback={(value) => {
                           handleValueChange(value, 'max')
                       }}
                       value={max}
                       title={'Max Value'}/>
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isSaveDisabled} onClick={handleSave}>save</Button>
            </div>
        </div>
    )
}
