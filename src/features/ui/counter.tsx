import s from './counter.module.css'
import {CounterSettings} from "./counter-settings/counter-settings.tsx";
import {CounterDisplay} from "./counter-display/counter-display.tsx";
import {type CounterType} from "../model/counter-reducer.ts";

export type StatusType = "preparing" | "counting" | null

type CounterProps = {
  counter: CounterType
}

export type ErrorsType = {
  min?: string
  max?: string
  lastChanged?: 'min' | 'max'
}

export const Counter = (props: CounterProps) => {
  const {count, status, values} = props.counter

  const isStatusCounting = status === 'counting'
  const isStatusPreparing = status === 'preparing'

  const counterBlockClasses = s.counter
      + (isStatusCounting ? ' ' + s.counting : '')
      + (count === values.max && status === 'counting' ? ' ' + s.maxCount : '')
      + (isStatusPreparing ? ' ' + s.preparing : '')

  return (
      <div className={counterBlockClasses}>
        {isStatusPreparing && <CounterSettings counter={props.counter}/>}
        {isStatusCounting && <CounterDisplay isStatusPreparing={isStatusPreparing} counter={props.counter}/>}
      </div>
  )
}
