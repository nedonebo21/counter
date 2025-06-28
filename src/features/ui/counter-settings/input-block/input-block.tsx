import {Input} from "../../../../shared/ui/input/input.tsx";
import {changeCounterSettingsAC, type CounterType, setErrorsAC} from "../../../model/counter-reducer.ts";
import {checkValues} from "../../../../shared/lib/check-values.ts";
import {useAppDispatch} from "../../../../shared/hooks/use-app-dispatch.ts";
type InputBlockType = {
  counter: CounterType
}
export const InputBlock = ({counter}: InputBlockType) => {
  const {settings, id, errors} = counter
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
  return (
      <>
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
      </>
  )
}
