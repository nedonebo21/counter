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

    const messageToShow = (): {text: string, isError: boolean} => {
        if (inputError.lastChanged === 'min' && inputError.min){
            return {text: inputError.min, isError: true}
        } else if (inputError.lastChanged === 'max' && inputError.max){
            return {text:inputError.max, isError:true}
        } else if (inputError.min){
            return {text: inputError.min, isError:true}
        } else if (inputError.max){
            return {text: inputError.max, isError:true}
        }

        if (isChanged){
            return {text: `enter your values and press 'save'`, isError: false}
        }
        return {text: '', isError: false}
    }
    const {text, isError} = messageToShow()

    const blockRender = count === props.maxValue ? s.countBlock + ' ' + s.maxValueCount : s.countBlock
    const isMaxValue = count === props.maxValue
    const isIncDisabled = count === props.maxValue || isError || isChanged
    const isDecDisabled = count === props.minValue || isError || isChanged
    const isResetDisabled = count === props.minValue || isError || isChanged

    return (
        <div className={s.counterDisplay}>
            <div className={isChanged ? s.countBlock : blockRender}>
                {text && <div className={isError ? s.error : s.setMessage}>{text}</div>}
                {!text && <div className={isMaxValue ? s.maxValue : ''}>{count}</div>}
            </div>
            <div className={s.btnBlock}>
                <Button disabled={isIncDisabled} onClick={handleIncrement}>inc</Button>
                <Button disabled={isDecDisabled} onClick={handleDecrement}>dec</Button>
                <Button disabled={isResetDisabled} onClick={handleReset}>reset</Button>
            </div>
        </div>
    )
}
