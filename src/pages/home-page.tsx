import {Counter} from "../features/ui/counter.tsx";
import {useAppSelector} from "../shared/hooks/use-app-selector.ts";
import {selectCounter} from "../features/model/counter-selectors.ts";
import {useDispatch} from "react-redux";
import {Button} from "../shared/ui/button/button.tsx";
import {addCounterAC} from "../features/model/counter-reducer.ts";
import s from '../features/ui/counter.module.css'

export const HomePage = () => {
  const counter = useAppSelector(selectCounter)
  const dispatch = useDispatch()

  const addCounter = () => {
    dispatch(addCounterAC())
  }

  return (
      <div className={'wrapper'}>
        <Button onClick={addCounter}>add counter</Button>
        <div className={s.container}>
          {counter.map(counter => {
            return <Counter key={counter.id} counter={counter}/>
          })}
        </div>
      </div>
  )
}
