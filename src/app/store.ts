import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {CounterReducer} from "../model/counter-reducer.ts";

const rootReducer = combineReducers({
  counter: CounterReducer
})
export const store = configureStore({
  reducer: rootReducer,
})

export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch