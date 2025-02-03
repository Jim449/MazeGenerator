import { useState } from "react";

export default function MazeConnection({ id, x, y, index, from, to, connections, SetConnections }) {
    const [links, setLinks] = useState(connections);

    function HandleClick() {
        if (links > 3) {
            setLinks(0);
        }
        else {
            setLinks(links + 1);
        }
        SetConnections(index, links + 1);
    }
    return <button onClick={HandleClick} className="bg-stone-100 border border-stone-200 text-xs" id={id} key={id} x={x} y={y} index={index} from={from} to={to} connections={links}>{links}</button>
}