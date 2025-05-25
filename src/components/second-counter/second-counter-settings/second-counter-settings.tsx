import s from '../second-counter.module.css'
import {Input} from "../../../shared/ui/input/input.tsx";
import {Button} from "../../../shared/ui/button/button.tsx";
import type {StatusType} from "../second-counter.tsx";
import {useState} from "react";

type Props = {
    updateCounter: (min: number, max: number) => void
    setError: (error: string | null) => void
    setStatus: (status: StatusType) => void
    error: string | null
    setIsChanged: (isChanged: boolean) => void
    minValue: number
    maxValue: number
}

export const SecondCounterSettings = (props: Props) => {
    const {
        updateCounter,
        setError,
        setStatus,
        setIsChanged,
        minValue,
        maxValue
    } = props

    const [valuesSettings, setValuesSettings] = useState({
        min: minValue,
        max: maxValue
    })
    const [inputError, setInputError] = useState<{min?: string, max?: string}>({})

    const {min, max} = valuesSettings
    const handleValueChange = (value: number, type: 'min' | 'max') => {
        const inputValues = {
            ...valuesSettings,
            [type]: value
        }
        const tempError: {min?: string, max?: string} = {}
        if (value <= -1) {
            setError(`${type} value cannot be negative`)
            tempError[type] = `${type} value cannot be negative`
            setInputError(tempError)
            if (value === -1) {
                setValuesSettings(inputValues)
            }
            return
        }
        if (inputValues.min >= inputValues.max ||  isNaN(inputValues.min) || isNaN(inputValues.max)) {
            setError('max value must be greater than min')
            tempError[type] = `${type} value cannot be negative`
            setInputError(tempError)
        } else {
            setError(null)
        }
        setInputError(tempError)
        setValuesSettings(inputValues)
    }
    const handleSave = () => {
        if (min >= max || min < 0 || max < 0) return
        updateCounter(min, max)
        setStatus('counting')
    }
    const valuesUnchanged = min === minValue && max === maxValue
    const isSaveDisabled =
        valuesSettings.min < 0 || valuesSettings.max < 0 ||
        valuesSettings.min >= valuesSettings.max ||
        (valuesSettings.min === minValue && valuesSettings.max === maxValue)

    setIsChanged(!valuesUnchanged)

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
