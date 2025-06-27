import s from '../counter.module.css'
import {Input} from "../../../shared/ui/input/input.tsx";
import {Button} from "../../../shared/ui/button/button.tsx";
import {checkValues} from "../../../shared/lib/check-values.ts";
import {
  changeCounterSettingsAC,
  changeStatusAC,
  type CounterType,
  setErrorsAC,
  updateCounterAC
} from "../../../model/counter-reducer.ts";
import {useAppDispatch} from "../../../shared/hooks/use-app-dispatch.ts";

type Props = {
  isFirstEntry: boolean
  counter: CounterType
}

export const CounterSettings = (props: Props) => {
  const {counter, isFirstEntry} = props
  const {id, values, settings, errors} = counter
  const dispatch = useAppDispatch()
  const handleValueChange = (value: number, type: 'min' | 'max') => {

    let lockMinInputValue = value
    if (type === 'min' && value < -1) {
      lockMinInputValue = -1
    }
    if (type === 'max' && value < 0) {
      lockMinInputValue = 0
    }

    const inputValues = {
      ...settings,
      [type]: lockMinInputValue
    }
    dispatch(changeCounterSettingsAC({counterId: id, max: inputValues.max, min: inputValues.min}))

    const errors = checkValues(inputValues.min, inputValues.max)
    dispatch(setErrorsAC({counterId: id, errors: {...errors}, lastChanged: type}))
  }

  const handleSet = () => {
    if (settings.min >= settings.max || settings.min <= -1 || settings.max <= 0) return
    dispatch(updateCounterAC({counterId: id, min:settings.min, max:settings.max}))

    dispatch(changeStatusAC({counterId: id, status:'counting'}))
  }
  const handleBack = () => {
    dispatch(changeStatusAC({counterId: id, status:'counting'}))
  }

  const isChanged = settings.min !== values.min || values.max !== settings.max
  const isSaveDisabled = (!!errors.min || !!errors.max) || (!isFirstEntry && !isChanged)

  return (
      <div className={s.counterSettings}>
        {
          isFirstEntry || isChanged
              ? <span>enter your values and press 'set'</span>
              : <span>counter settings</span>
        }
        <div>
          <Input
              errorMessage={errors.min}
              name={'min'}
              onChange={(value) => handleValueChange(value, 'min')}
              value={settings.min}
              title={'Min Value'}/>
        </div>
        <div>
          <Input errorMessage={errors.max}
                 name={'max'}
                 onChange={(value) => handleValueChange(value, 'max')}
                 value={settings.max}
                 title={'Max Value'}/>
        </div>
        <div className={s.btnBlock}>
          <Button disabled={isFirstEntry} onClick={handleBack}>back</Button>
          <Button disabled={isSaveDisabled} onClick={handleSet}>save</Button>
        </div>
      </div>
  )
}

