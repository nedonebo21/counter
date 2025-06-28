import s from '../counter.module.css'
import {
  type CounterType,
} from "../../model/counter-reducer.ts";
import {CountBlock} from "./count-block/count-block.tsx";
import {DisplayButtonBlock} from "./display-button-block/display-button-block.tsx";

type Props = {
  counter: CounterType
  isStatusPreparing: boolean
}

export const CounterDisplay = ({counter, isStatusPreparing}: Props) => {
  return (
      <div className={s.counterDisplay}>
        <CountBlock counter={counter}/>
        <DisplayButtonBlock counter={counter} isStatusPreparing={isStatusPreparing}/>
      </div>
  )
}
