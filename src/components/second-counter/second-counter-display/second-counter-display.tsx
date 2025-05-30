import s from '../second-counter.module.css'
import {Button} from "../../../shared/ui/button/button.tsx";
import type {InputErrorsType} from "../second-counter.tsx";

type Props = {
    count: number
    setCount: (count: number) => void
    minValue: number
    maxValue: number
    inputError: InputErrorsType
    isChanged: boolean
}

export const SecondCounterDisplay = (props: Props) => {
    const {count, setCount, inputError, isChanged} = props

    const handleIncrement = () => {
        if (count < props.maxValue) setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count > props.minValue) setCount(count - 1)
    }
    const handleReset = () => {
        if (count > props.minValue) setCount(props.minValue)
    }

    const errorToShow = () => {
        if (inputError.lastChanged === 'min' && inputError.min){
            return inputError.min
        } else if (inputError.lastChanged === 'max' && inputError.max){
            return inputError.max
        } else if (inputError.min){
            return inputError.min
        } else if (inputError.max){
            return inputError.max
        }
        return
    }

    const blockRender = count === props.maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock
    const isError = !!Object.keys(inputError).length
    const isMessage = !Object.keys(inputError).length && isChanged
    const isMaxValue = count === props.maxValue
    const isIncDisabled = count === props.maxValue || isError || isChanged
    const isDecDisabled = count === props.minValue || isError
    const isResetDisabled = count === props.minValue || isError

    return (
        <div className={s.counterDisplay}>
            <div className={isChanged ? s.countBlock : blockRender}>
                {
                    errorToShow() && <div className={s.error}>{errorToShow()}</div>
                }
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
