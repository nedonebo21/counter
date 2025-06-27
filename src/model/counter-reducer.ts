import type {ErrorsType, StatusType} from "../components/main-counter/counter.tsx";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {checkValues} from "../shared/lib/check-values.ts";

const initialState: CounterState = {}
export const updateCounterAC = createAction<{ counterId: string, min: number, max: number }>('counter/updateCounter')
export const changeCounterSettingsAC = createAction<{
  counterId: string,
  min: number,
  max: number
}>('counter/changeCounterSettings')
export const changeStatusAC = createAction<{counterId: string, status: StatusType}>('counter/setStatusCounting')
export const setErrorsAC = createAction<{counterId: string, errors: {min: string, max: string}, lastChanged: 'min' | 'max'}>('counter/setErrors')
export const countIncrementAC = createAction<{counterId: string}>('counter/countIncrement')
export const countDecrementAC = createAction<{counterId: string}>('counter/countDecrement')
export const countResetAC = createAction<{counterId: string}>('counter/countReset')


export const CounterReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(updateCounterAC, (state, action) => {
        const {counterId, min, max} = action.payload
        if (state[counterId]) {
          state[counterId].values = {min, max}
          state[counterId].count = min
          state[counterId].errors = checkValues(min, max)
          state[counterId].status = 'counting'
        }
      })
      .addCase(changeCounterSettingsAC, (state, action) => {
        const {counterId, min, max} = action.payload
        if (state[counterId]){
          state[counterId].settings = {min,max}
        }
      })
      .addCase(changeStatusAC, (state,action) => {
        const {counterId, status} = action.payload
        if (state[counterId]){
          state[counterId].status = status
        }
      })
      .addCase(setErrorsAC, (state,action) => {
        const {counterId, errors, lastChanged} = action.payload
        if (state[counterId]){
          state[counterId].errors = {...errors, lastChanged}
        }
      })
      .addCase(countIncrementAC, (state,action) => {
        const {counterId} = action.payload
        if (state[counterId]){
          state[counterId].count += 1
        }
      })
      .addCase(countDecrementAC, (state,action) => {
        const {counterId} = action.payload
        if (state[counterId]){
          state[counterId].count -= 1
        }
      })
      .addCase(countResetAC, (state,action) => {
        const {counterId} = action.payload
        if (state[counterId]){
          state[counterId].count = 0
        }
      })
})


export type CounterState = Record<string, Counter>
export type Counter = {
  count: number
  status: StatusType
  values: { min: number, max: number }
  settings: { min: number, max: number },
  errors: ErrorsType
}