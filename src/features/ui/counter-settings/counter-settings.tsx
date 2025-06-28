import s from '../counter.module.css'
import {type CounterType} from "../../model/counter-reducer.ts";
import {InputBlock} from "./input-block/input-block.tsx";
import {CounterTitle} from "./counter-title/counter-title.tsx";
import {SettingsButtonsBlock} from "./settings-buttons-block/settings-buttons-block.tsx";

type Props = {
  counter: CounterType
}

export const CounterSettings = (props: Props) => {
  const {counter} = props
  const {count, values, settings} = counter

  const isChanged = settings.min !== values.min || values.max !== settings.max

  return (
      <div className={s.counterSettings}>
        <CounterTitle isChanged={isChanged} count={count}/>
        <InputBlock counter={counter}/>
        <SettingsButtonsBlock counter={counter} isChanged={isChanged}/>
      </div>
  )
}

