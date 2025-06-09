import {Counter} from "../components/main-counter/counter.tsx";
// import {SecondCounter} from "../components/second-counter/second-counter.tsx";

export const HomePage = () => {
    return (
        <div className={"wrapper"}>
            <Counter min={2} max={5}/>
            {/*<SecondCounter/>*/}
        </div>
    )
}
