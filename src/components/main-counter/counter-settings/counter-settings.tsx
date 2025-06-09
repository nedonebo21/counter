import s from '../counter.module.css'
import {Input} from "../../../shared/ui/input/input.tsx";
import {Button} from "../../../shared/ui/button/button.tsx";
import {useState} from "react";
import type {StatusType} from "../counter.tsx";
import type {ErrorsType} from "../counter.tsx";
import {checkValues} from "../../../shared/lib/check-values.ts";

type Props = {
    updateCounter: (minValue: number, maxValue: number) => void
    setStatus: (status: StatusType) => void
    minValueCount: number
    maxValueCount: number
    isFirstEntry: boolean
    setErrors: (error: ErrorsType) => void
    errors: ErrorsType
}

export const CounterSettings = (props: Props) => {
    const {
        updateCounter,
        setErrors,
        errors,
        setStatus,
        minValueCount,
        maxValueCount,
        isFirstEntry
    } = props

    const [valuesSettings, setValuesSettings] = useState({
        min: minValueCount,
        max: maxValueCount,
    })
    const {min, max} = valuesSettings

    const handleValueChange = (value: number, type: 'min' | 'max') => {

        let lockMinInputValue = value
        if (type === 'min' && value < -1) {
            lockMinInputValue = -1
        }
        if (type === 'max' && value < 0) {
            lockMinInputValue = 0
        }

        const inputValues = {
            ...valuesSettings,
            [type]: lockMinInputValue
        }
        setValuesSettings(inputValues)

        const errors = checkValues(inputValues.min, inputValues.max)
        setErrors({...errors, lastChanged: type})
    }

    const handleSet = () => {
        if (min >= max || min <= -1 || max <= 0) return
        updateCounter(min, max)
        setStatus('counting')
    }
    const handleBack = () => {
        setStatus('counting')
    }

    const isChanged = valuesSettings.min !== minValueCount || maxValueCount !== valuesSettings.max
    const isSaveDisabled = (!!errors.min || !!errors.max) || (!isFirstEntry && !isChanged)

    return (
        <div className={s.counterSettings}>
            {
                isFirstEntry || isChanged
                    ? <span>enter your values and press 'set'</span>
                    : <span>counter settings</span>
            }
            <div>
                <Input
                    errorMessage={errors.min}
                    name={'min'}
                    onChange={(value) => handleValueChange(value, 'min')}
                    value={min}
                    title={'Min Value'}/>
            </div>
            <div>
                <Input errorMessage={errors.max}
                       name={'max'}
                       onChange={(value) => handleValueChange(value, 'max')}
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

