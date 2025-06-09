import s from './button.module.css'
import type {ReactNode} from "react";
type ButtonProps = {
    onClick: () => void
    disabled?: boolean
    className?: string
    children: ReactNode
}

export const Button = (props: ButtonProps) => {
    const { className, ...rest} = props

    return (
        <button {...rest} className={s.button + (className ? ' ' + className : '')}/>
    )
}