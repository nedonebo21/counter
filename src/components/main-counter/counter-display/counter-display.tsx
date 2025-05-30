import s from '../counter.module.css'
import {Button} from "../../../shared/ui/button/button.tsx";
import type {InputErrorsType, StatusType} from "../counter.tsx";

type Props = {
    count: number
    setCount: (count: number) => void
    minValue: number
    maxValue: number
    inputError: InputErrorsType
    setStatus: (status: 'preparing' | 'counting') => void
    status: StatusType
    isStatusPreparing: boolean
}

export const CounterDisplay = (props: Props) => {
    const {count, setCount, minValue, maxValue, setStatus,isStatusPreparing} = props

    const handleIncrement = () => {
        if (count === maxValue || isStatusPreparing) {
            return
        }
        setCount(props.count + 1)
    }
    const handleDecrement = () => {
        if (count === minValue || isStatusPreparing) {
            return
        }
        setCount(props.count - 1)
    }
    const handleReset = () => {
        if (count === minValue || isStatusPreparing) {
            return
        }
        setCount(minValue)
    }
    const handleSettings = () => {
        setStatus('preparing')
    }

    const blockRender = count === maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock

    const isIncDisabled =  count === maxValue
    const isDecDisabled =  count === minValue
    const isResetDisabled =  count === minValue


    return (
        <div className={s.counterDisplay}>
            <div className={blockRender}>
                <div className={count === maxValue ? s.maxValue : ''}>{count}</div>
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isIncDisabled} onClick={handleIncrement}>inc</Button>
                <Button disabled={isDecDisabled} onClick={handleDecrement}>dec</Button>
                <Button disabled={isResetDisabled} onClick={handleReset}>reset</Button>

                <Button onClick={handleSettings}>settings</Button>
            </div>
        </div>
    )
}
