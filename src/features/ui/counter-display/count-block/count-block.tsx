import s from "../../counter.module.css";
import type {CounterType} from "../../../model/counter-reducer.ts";
type CountBlockType = {
  counter: CounterType
}
export const CountBlock = ({counter}:CountBlockType) => {
  const {count,values} = counter
  const blockClasses = count === values.max ? s.countBlock + ' ' + s.maxValueCount : s.countBlock

  return (
      <div className={blockClasses}>
        <div className={count === values.max ? s.maxValue : ''}>{count}</div>
      </div>
  )
}
