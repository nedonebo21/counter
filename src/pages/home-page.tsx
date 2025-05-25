import {Counter} from "../components/main-counter/counter.tsx";
import {SecondCounter} from "../components/second-counter/second-counter.tsx";

export const HomePage = () => {
    return (
        <div className={"wrapper"}>
            <Counter/>
            <SecondCounter min={5} max={7}/>
        </div>
    )
}
