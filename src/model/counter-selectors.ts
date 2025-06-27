import type {RootState} from "../app/store.ts";
import type {CounterType} from "./counter-reducer.ts";

export const selectCounter = (state: RootState): CounterType[] => state.counter