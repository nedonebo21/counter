import s from '../second-counter.module.css'
import {Button} from "../../../shared/ui/button/button.tsx";

type Props = {
    count: number
    setCount: (count: number) => void
    minValue: number
    maxValue: number
    error: string | null
    isChanged: boolean
}

export const SecondCounterDisplay = (props: Props) => {
    const {count, setCount, error, isChanged} = props

    const handleIncrement = () => {
        if (count < props.maxValue) setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count > props.minValue) setCount(count - 1)
    }
    const handleReset = () => {
        if (count > props.minValue) setCount(props.minValue)
    }
    const blockRender = count === props.maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock
    const isError = !!props.error
    const isMessage = !error && isChanged
    const isMaxValue = count === props.maxValue
    const isIncDisabled = count === props.maxValue || isError || isChanged
    const isDecDisabled = count === props.minValue || isError
    const isResetDisabled = count === props.minValue || isError

    return (
        <div className={s.counterDisplay}>
            <div className={isChanged ? s.countBlock : blockRender}>
                {isError && <div className={s.error}>{props.error}</div>}
                {isMessage && <div className={s.setMessage}>set values and press 'set'</div>}
                {!isMessage && !isError && <div className={isMaxValue ? s.maxValue : ''}>{count}</div>}
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isIncDisabled} onClick={handleIncrement}>inc</Button>
                <Button disabled={isDecDisabled} onClick={handleDecrement}>dec</Button>
                <Button disabled={isResetDisabled} onClick={handleReset}>reset</Button>
            </div>
        </div>
    )
}
