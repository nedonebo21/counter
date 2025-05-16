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
    const [minValueSettings, setMinValueSettings] = useState<number>(props.min ?? props.defaultValues.minDefaultValue)
    const [maxValueSettings, setMaxValueSettings] = useState<number>(props.max ?? props.defaultValues.maxDefaultValue)


    const handleMinChange = (value: number) => {
        if (value <= -1 ) {
            props.setError("incorrect value")
            if (value === -1) {
                setMinValueSettings(value)
            }
            return
        }
        props.setError(null)
        props.setStatus("preparing")
        setMinValueSettings(value)
    }
    const handleMaxChange = (value:number) => {
        if (value <= -1) {
            props.setError("incorrect value")
            if( value === -1) {
                setMaxValueSettings(value)
            }
            return
        }
        props.setError(null)
        props.setStatus("preparing")
        setMaxValueSettings(value)
    }

    const handleSet = () => {
        if (minValueSettings >= maxValueSettings || minValueSettings <= -1 || maxValueSettings <= -1) {
            props.setError("incorrect value")
            props.setStatus(null)
            return
        }

        props.updateCounter(minValueSettings, maxValueSettings)
        props.setStatus("counting")
        props.setError(null)
    }

    const isSetDisabled = !!props.error || props.status === 'counting' || minValueSettings >= maxValueSettings


    return (
        <div className={s.counterSettings}>
            <div>
                <Input error={props.error} callback={handleMinChange} value={minValueSettings} title={'Min Value'}/>
            </div>
            <div>
                <Input error={props.error} callback={handleMaxChange} value={maxValueSettings} title={'Max Value'}/>
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isSetDisabled} onClick={handleSet} title={"set"}/>
            </div>
        </div>
    )
}
