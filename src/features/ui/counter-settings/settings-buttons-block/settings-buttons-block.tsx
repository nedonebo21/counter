import {Button} from "../../../../shared/ui/button/button.tsx";
import s from '../../counter.module.css'
import {changeStatusAC, type CounterType, updateCounterAC} from "../../../model/counter-reducer.ts";
import {useAppDispatch} from "../../../../shared/hooks/use-app-dispatch.ts";
type ButtonsBlockType = {
  counter: CounterType
  isChanged: boolean
}
export const SettingsButtonsBlock = ({counter, isChanged}: ButtonsBlockType) => {
  const {id, settings, errors, count} = counter

  const dispatch = useAppDispatch()
  const handleSet = () => {
    if (settings.min >= settings.max || settings.min <= -1 || settings.max <= 0) return
    dispatch(updateCounterAC({counterId: id, min: settings.min, max: settings.max}))

    dispatch(changeStatusAC({counterId: id, status: 'counting'}))
  }
  const handleBack = () => {
    dispatch(changeStatusAC({counterId: id, status: 'counting'}))
  }

  const isSaveDisabled = (!!errors.min || !!errors.max) || (!(count == null) && !isChanged)


  return (
      <div className={s.btnBlock}>
        <Button disabled={count === null} onClick={handleBack}>back</Button>
        <Button disabled={isSaveDisabled} onClick={handleSet}>save</Button>
      </div>
  )
}
