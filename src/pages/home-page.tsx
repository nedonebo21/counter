import {Counter} from "../components/counter.tsx";

export const HomePage = () => {
    return (
        <div className={"wrapper"}>
            <Counter minValue={0} maxValue={5}/>
        </div>
    )
}
