import { useState } from "react";

export default function MazeArea({ id, index, x, y, from }) {
    const [chambers, setChambers] = useState(0);

    return <button className="border border-stone-200 bg-stone-100" id={id} key={id} index={index} x={x} y={y} from={from}></button>
}