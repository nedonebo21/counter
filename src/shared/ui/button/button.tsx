import s from './button.module.css'
import type {ReactNode} from "react";
type ButtonProps = {
    onClick: () => void
    disabled?: boolean
    children: ReactNode
}

export const Button = (props: ButtonProps) => {
    const {onClick, disabled, children} = props

    return (
        <button disabled={disabled} onClick={onClick} className={s.button}>{children}</button>
    )
}