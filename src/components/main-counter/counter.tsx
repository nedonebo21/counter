import s from './counter.module.css'
import {CounterSettings} from "./counter-settings/counter-settings.tsx";
import {CounterDisplay} from "./counter-display/counter-display.tsx";
import {type CounterType} from "../../model/counter-reducer.ts";

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
  const isFirstEntry = count === null
  const isStatusCounting = status === 'counting'
  const isStatusPreparing = status === 'preparing'

  const counterBlockClass = () => {
    const classesArr = [s.counter]
    if (isStatusPreparing) return classesArr.join(' ')
    if (isStatusCounting) classesArr.push(s.counting)
    if (count === values.max) classesArr.push(s.maxCount)
    return classesArr.join(' ')
  }

  return (
      <div className={counterBlockClass()}>
        {
            isStatusPreparing &&
            <CounterSettings counter={props.counter} isFirstEntry={isFirstEntry}/>
        }
        {
            isStatusCounting &&
            <CounterDisplay isStatusPreparing={isStatusPreparing} counter={props.counter}/>
        }
      </div>
  )
}
