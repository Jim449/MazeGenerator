export default function MazeArea({ id, index, x, y }) {

    return <div className="bg-stone-200" id={id} key={id} index={index} x={x} y={y}></div>
}