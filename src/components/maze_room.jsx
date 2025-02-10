export default function MazeRoom({ props, ChangeConnections }) {
    // I need arrows, hexcodes 2190, 2191, 2192, 2193 for left, up, right, down

    function onClick(event, direction) {
        ChangeConnections(event, props.index, direction);
    }
    return <div
        className="grid grid-cols-4 grid-rows-4 text-xs text-center border border-stone-200 bg-stone-200 w-25 h-25"
        props={props}>
        <button onClick={(e) => onClick(e, "north")} className="col-start-2 col-span-2 row-start-1 row-span-1 bg-stone-100">{props.north && String.fromCharCode(8593)}</button>
        <button onClick={(e) => onClick(e, "west")} className="col-start-1 col-span-1 row-start-2 row-span-2 bg-stone-100">{props.west && String.fromCharCode(8592)}</button>
        <div className="col-start-2 col-span-2 row-start-2 row-span-2 border border-stone-200 bg-stone-100"></div>
        <button onClick={(e) => onClick(e, "east")} className="col-start-4 col-span-1 row-start-2 row-span-2 bg-stone-100">{props.east && String.fromCharCode(8594)}</button>
        <button onClick={(e) => onClick(e, "south")} className="col-start-2 col-span-2 row-start-4 row-span-1 bg-stone-100">{props.south && String.fromCharCode(8595)}</button>
    </div>
}