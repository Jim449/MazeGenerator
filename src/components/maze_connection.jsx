export default function MazeConnection({ id, x, y, index, from, to, connections, ChangeConnections }) {
    function HandleClick(event) {
        ChangeConnections(event, index, connections);
    }
    return <button onClick={HandleClick} className="bg-stone-100 border border-stone-200 text-xs" id={id} key={id} x={x} y={y} index={index} from={from} to={to} connections={connections}>{connections}</button>
}