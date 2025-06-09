import type {ErrorsType} from "../../components/main-counter/counter.tsx";

export const checkValues = (min?: number, max?: number) => {
    const errors: ErrorsType = {}

    if (min == null || isNaN(min)) errors.min = 'incorrect value'
    if (max == null || isNaN(max)) errors.max = 'incorrect value'

    if (errors.min || errors.max) return errors

    if ((min as number) <= -1) errors.min = 'min value cannot be negative'
    if ((max as number) <= 0) errors.max = 'max value must be > 0'

    if ((min as number) >= (max as number)) {
        if (!errors.max) errors.max = 'max value must be greater than min'
    }
    return errors
}