import s from '../counter.module.css'
import {Input} from "../../shared/ui/input/input.tsx";
import {Button} from "../../shared/ui/button/button.tsx";
import {useState} from "react";
import type {StatusType, ValuesType} from "../counter.tsx";
type Props = {
    updateCounter: (minValue: number, maxValue: number) => void
    setError: (error: string | null) => void
    error: string | null
    setStatus: (status: StatusType) => void
    status: StatusType
    defaultValues: ValuesType
    min: number | undefined
    max: number | undefined
}

export const CounterSettings = (props: Props) => {
    const {updateCounter, setError, error, setStatus, status, defaultValues} = props


    const [valuesSettings, setValuesSettings] = useState({
        min: props.min ?? defaultValues.minDefaultValue,
        max: props.max ?? defaultValues.maxDefaultValue,
    })
    const {min,max} = valuesSettings


    const handleValueChange = (value: number, type: 'min' | 'max') => {
        if (value <= -1) {
            setError('incorrect value')
            if (value === -1){
                setValuesSettings({
                    ...valuesSettings,
                    [type]: value
                })
            }
            return
        }
        setError(null)
        setValuesSettings({
            ...valuesSettings,
            [type]: value
        })
    }

    const handleSet = () => {
        if (min >= max || min <= -1 || max <= -1) {
            setError('incorrect value')
            return
        }

        updateCounter(min, max)
        setStatus('counting')
        setError(null)
    }

    const isSetDisabled = !!error || status === 'counting' || min >= max


    return (
        <div className={s.counterSettings}>
            {error && <div className={s.error}>{error}</div> || status === 'preparing' && <div>enter values and press 'set'</div>}
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
                <Button disabled={isSetDisabled} onClick={handleSet}>set</Button>
            </div>
        </div>
    )
}
