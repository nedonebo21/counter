import s from '../counter.module.css'
import {Input} from "../../shared/ui/input/input.tsx";
import {Button} from "../../shared/ui/button/button.tsx";
import {useState} from "react";
import type {StatusType} from "../counter.tsx";
type Props = {
    updateCounter: (minValue: number, maxValue: number) => void
    setError: (error: string | null) => void
    error: string | null
    setStatus: (status: StatusType) => void
    status: StatusType
}

export const CounterSettings = (props: Props) => {
    const [minValueSettings, setMinValueSettings] = useState<number>(0)
    const [maxValueSettings, setMaxValueSettings] = useState<number>(5)


    const handleMinChange = (value: number) => {
        if (value <= -1 ) {
            props.setError("incorrect value")
            return
        }
        props.setError(null)
        props.setStatus("preparing")
        setMinValueSettings(value)
    }
    const handleMaxChange = (value:number) => {
        if (value <= -1) {
            props.setError("incorrect value")
            return
        }
        props.setError(null)
        props.setStatus("preparing")
        setMaxValueSettings(value)
    }

    const handleSet = () => {
        if (minValueSettings >= maxValueSettings){
            props.setError("incorrect value")
            props.setStatus(null)
            return
        }

        props.updateCounter(minValueSettings, maxValueSettings)
        props.setStatus("counting")
        props.setError(null)
    }

    const isSetDisabled = !!props.error || props.status === 'counting'


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
