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
}

export const CounterDisplay = (props: Props) => {
    const {count, setCount, minValue, maxValue, error, status, setStatus} = props

    const handleIncrement = () => {
        if (count === maxValue || status === 'preparing') {
            return
        }
        setCount(props.count + 1)
    }
    const handleDecrement = () => {
        if (count === minValue || status === 'preparing') {
            return
        }
        setCount(props.count - 1)
    }
    const handleReset = () => {
        if (count === minValue || status === 'preparing') {
            return
        }
        setCount(minValue)
    }
    const handleBack = () => {
        setStatus('preparing')
    }
    // const countRender = error
    //     ? <div className={s.error}>{error}</div>
    //     : <div className={count === maxValue ? s.maxValue : ''}>{count}</div>

    const blockRender = count === maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock

    const isErrorStatus = status === 'preparing' || !!error

    const isIncDisabled = isErrorStatus || count === maxValue
    const isDecDisabled = isErrorStatus || count === minValue
    const isResetDisabled = isErrorStatus || count === minValue


    return (
        <div className={s.counterDisplay}>
            <div className={blockRender}>
                {/*{(status === 'preparing' && <div>enter values and press 'set'</div>)*/}
                {/*    || countRender*/}
                {/*}*/}
                <div className={count === maxValue ? s.maxValue : ''}>{count}</div>
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isIncDisabled} onClick={handleIncrement}>inc</Button>
                <Button disabled={isDecDisabled} onClick={handleDecrement}>dec</Button>
                <Button disabled={isResetDisabled} onClick={handleReset}>reset</Button>

                <Button onClick={handleBack}>back</Button>
            </div>
        </div>
    )
}
