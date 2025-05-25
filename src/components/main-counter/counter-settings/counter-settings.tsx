import s from '../counter.module.css'
import {Input} from "../../../shared/ui/input/input.tsx";
import {Button} from "../../../shared/ui/button/button.tsx";
import {useState} from "react";
import type {StatusType, ValuesType} from "../counter.tsx";

type Props = {
    updateCounter: (minValue: number, maxValue: number) => void
    setError: (error: string | null) => void
    error: string | null
    setStatus: (status: StatusType) => void
    defaultValues: ValuesType
    minValueCount: number
    maxValueCount: number
    isFirstEntry: boolean
}

export const CounterSettings = (props: Props) => {
    const {updateCounter, setError, error, setStatus, minValueCount, maxValueCount,isFirstEntry} = props


    const [valuesSettings, setValuesSettings] = useState({
        min: minValueCount,
        max: maxValueCount,
    })
    const {min, max} = valuesSettings


    const handleValueChange = (value: number, type: 'min' | 'max') => {
        const inputValues = {
            ...valuesSettings,
            [type]: value
        }
        if (value <= -1) {
            setError('value cannot be negative')
            if (value === -1) {
                setValuesSettings(inputValues)
            }
            return
        }
        if (inputValues.min >= inputValues.max || isNaN(inputValues.min) || isNaN(inputValues.max)) {
            setError('max value must be greater than min')
        } else {
            setError(null)
        }
        setValuesSettings(inputValues)
    }

    const handleSet = () => {
        if (min >= max || min <= -1 || max <= -1) {
            return
        }

        updateCounter(min, max)
        setStatus('counting')
    }
    const handleBack = () => {
        setStatus('counting')
    }

    const inputValuesUnchanged = min === minValueCount && max === maxValueCount
    const isSaveDisabled = !!error || min >= max || (!isFirstEntry && inputValuesUnchanged)


    return (
        <div className={s.counterSettings}>
            {/*{error && <div className={s.error}>{error}</div> || !isSaveDisabled &&*/}
            {/*    <div className={s.setMessage}>enter values and press 'set'</div>*/}
            {/*}*/}
            <div className={error ? s.error : s.setMessage}>
                {error ? error : !isSaveDisabled ? `enter values and press 'set'` : 'counter settings'}
            </div>
            <div>
                <Input
                    error={error}
                    name={'min'}
                    callback={(value) => handleValueChange(value, 'min')}
                    value={min}
                    title={'Min Value'}/>
            </div>
            <div>
                <Input error={error}
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
