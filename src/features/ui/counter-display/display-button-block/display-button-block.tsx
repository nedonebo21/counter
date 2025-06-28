import s from "../../counter.module.css";
import {Button} from "../../../../shared/ui/button/button.tsx";
import {useAppDispatch} from "../../../../shared/hooks/use-app-dispatch.ts";
import {
  changeStatusAC,
  countDecrementAC,
  type CounterType,
  countIncrementAC,
  countResetAC
} from "../../../model/counter-reducer.ts";
type DisplayButtonBlockType = {
  counter:  CounterType
  isStatusPreparing: boolean
}
export const DisplayButtonBlock = ({counter, isStatusPreparing}: DisplayButtonBlockType) => {
  const {id, count, values} = counter
  const dispatch = useAppDispatch()

  const handleIncrement = () => {
    if (count === values.max || isStatusPreparing) {
      return
    }
    dispatch(countIncrementAC({counterId: id}))
  }
  const handleDecrement = () => {
    if (count === values.min || isStatusPreparing) {
      return
    }
    dispatch(countDecrementAC({counterId: id}))
  }
  const handleReset = () => {
    if (count === values.min || isStatusPreparing) {
      return
    }
    dispatch(countResetAC({counterId: id}))
  }
  const handleSettings = () => {
    dispatch(changeStatusAC({counterId: id, status: 'preparing'}))
  }


  const isIncDisabled = count === values.max
  const isDecDisabled = count === values.min
  const isResetDisabled = count === values.min
  return (
      <div className={s.btnBlock}>
        <Button disabled={isIncDisabled} onClick={handleIncrement}>inc</Button>
        <Button disabled={isDecDisabled} onClick={handleDecrement}>dec</Button>
        <Button disabled={isResetDisabled} onClick={handleReset}>reset</Button>

        <Button onClick={handleSettings}>settings</Button>
      </div>
  );
};
