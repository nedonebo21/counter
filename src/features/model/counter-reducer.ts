import type {ErrorsType, StatusType} from "../ui/counter.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {checkValues} from "../../shared/lib/check-values.ts";

const initialState: CounterType[] = [
  {
    id: nanoid(),
    count: null,
    status: 'preparing',
    values: { min: 0, max: 0 },
    settings: { min: 0, max: 0 },
    errors: {max: 'max value must be > 0'},
  }
]
export const updateCounterAC = createAction<{ counterId: string, min: number, max: number }>('counter/updateCounter')
export const changeCounterSettingsAC = createAction<{
  counterId: string,
  min: number,
  max: number
}>('counter/changeCounterSettings')
export const changeStatusAC = createAction<{counterId: string, status: StatusType}>('counter/setStatusCounting')
export const setErrorsAC = createAction<{counterId: string, errors: ErrorsType, lastChanged: 'min' | 'max'}>('counter/setErrors')
export const countIncrementAC = createAction<{counterId: string}>('counter/countIncrement')
export const countDecrementAC = createAction<{counterId: string}>('counter/countDecrement')
export const countResetAC = createAction<{counterId: string}>('counter/countReset')
export const addCounterAC = createAction('counter/addCounter', () => {
  return {payload: {counterId: nanoid()}}
})


export const CounterReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(updateCounterAC, (state, action) => {
        const {counterId, min, max} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1) {
          state[index].values = {min,max}
          state[index].count = min
          state[index].errors = checkValues(min,max)
          state[index].status = 'counting'
        }
      })
      .addCase(changeCounterSettingsAC, (state, action) => {
        const {counterId, min, max} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1){
          state[index].settings = {min,max}
        }
      })
      .addCase(changeStatusAC, (state,action) => {
        const {counterId, status} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1){
          state[index].status = status
        }
      })
      .addCase(setErrorsAC, (state,action) => {
        const {counterId, errors, lastChanged} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1){
          state[index].errors = {...errors, lastChanged}
        }
      })
      .addCase(countIncrementAC, (state,action) => {
        const {counterId} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1 && state[index].count != null){
          state[index].count += 1
        }
      })
      .addCase(countDecrementAC, (state,action) => {
        const {counterId} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1 && state[index].count != null){
          state[index].count -= 1
        }
      })
      .addCase(countResetAC, (state,action) => {
        const {counterId} = action.payload
        const index = state.findIndex(el => el.id === counterId)
        if (index !== -1){
          state[index].count = 0
        }
      })
      .addCase(addCounterAC, (state, action) => {
        const {counterId} = action.payload
        const newCounter: CounterType = {
          id: counterId,
          count: null,
          status: 'preparing',
          values: {min: 0, max: 0},
          settings: {min: 0, max: 0},
          errors: {max: 'must be > 0'}
        }
        state.push(newCounter)
      })
})

export type CounterType = {
  id: string
  count: number | null
  status: StatusType
  values: { min: number, max: number }
  settings: { min: number, max: number }
  errors: ErrorsType
}