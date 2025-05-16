import s from '../counter.module.css'
import {Button} from "../../shared/ui/button/button.tsx";
import type {StatusType} from "../counter.tsx";

type Props = {
    count: number
    setCount: (count: number) => void
    minValue: number
    maxValue: number
    error: string | null
    status: StatusType
}

export const CounterDisplay = (props:Props) => {

    const handleIncrement = () => {
        if (props.count === props.maxValue || props.status === "preparing") {
            return
        }
        props.setCount(props.count + 1)
    }
    const handleDecrement = () => {
        if (props.count === props.minValue || props.status === "preparing") {
            return
        }
        props.setCount(props.count - 1)
    }
    const handleReset = () => {
        if (props.count === props.minValue || props.status === "preparing") {
            return
        }
        props.setCount(props.minValue)
    }
    const countRender = () => props.error
        ? <div className={s.error}>{props.error}</div>
            : props.count === props.maxValue ? <div className={s.maxValue}>{props.count}</div>
                : props.count
    const blockRender = props.count === props.maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock

    const isIncDisabled = props.status === 'preparing' || !!props.error || props.count === props.maxValue
    const isDecDisabled = props.status === 'preparing' || !!props.error
    const isResetDisabled = props.status === 'preparing' || !!props.error || props.count === props.minValue




    return (
        <div className={s.counterDisplay}>
            <div className={blockRender}>
                {props.status === 'preparing' ? <div>enter values and press 'set'</div> : countRender()}
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isIncDisabled} onClick={handleIncrement} title={"inc"}/>
                <Button disabled={isDecDisabled} onClick={handleDecrement} title={"dec"}/>
                <Button disabled={isResetDisabled} onClick={handleReset} title={"reset"}/>
            </div>
        </div>
    )
}
