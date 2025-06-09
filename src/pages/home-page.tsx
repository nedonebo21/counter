import {Counter} from "../components/main-counter/counter.tsx";

export const HomePage = () => {
    return (
        <div className={"wrapper"}>
            <Counter min={2} max={5}/>
        </div>
    )
}
