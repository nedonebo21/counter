import s from './button.module.css'
type Props = {
    title: string
    onClick: () => void
    disabled?: boolean
}

export const Button = (props: Props) => {
    return (
        <button disabled={props.disabled} onClick={props.onClick} className={s.button}>{props.title}</button>
    )
}