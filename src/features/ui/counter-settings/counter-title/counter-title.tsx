type CounterTitleType = {
  isChanged: boolean
  count: number | null
}
export const CounterTitle = ({isChanged, count}:CounterTitleType) => {
  return (
      count === null || isChanged
          ? <span>enter your values and press 'set'</span>
          : <span>counter settings</span>
  )
}