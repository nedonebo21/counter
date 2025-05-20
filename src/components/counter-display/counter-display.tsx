import s from '../counter.module.css'
import {Button} from "../../shared/ui/button/button.tsx";
import type {StatusType} from "../counter.tsx";

type Props = {
    count: number
    setCount: (count: number) => void
    minValue: number
    maxValue: number
    error: string | null
    setStatus: (status: 'preparing' | 'counting') => void
    status: StatusType
    isStatusPreparing: boolean
}

export const CounterDisplay = (props: Props) => {
    const {count, setCount, minValue, maxValue, error, setStatus,isStatusPreparing} = props

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
    // const countRender = error
    //     ? <div className={s.error}>{error}</div>
    //     : <div className={count === maxValue ? s.maxValue : ''}>{count}</div>

    const blockRender = count === maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock

    const isErrorStatus = isStatusPreparing || !!error

    const isIncDisabled = isErrorStatus || count === maxValue
    const isDecDisabled = isErrorStatus || count === minValue
    const isResetDisabled = isErrorStatus || count === minValue


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
