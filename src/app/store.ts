import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {CounterReducer} from "../features/model/counter-reducer.ts";

const rootReducer = combineReducers({
  counter: CounterReducer
})



const presistedCounterToString = localStorage.getItem('state')
const preloadedState = presistedCounterToString ? JSON.parse(presistedCounterToString) : undefined

export const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch