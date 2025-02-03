import MazeArea from "./maze_area"
import MazeConnection from "./maze_connection"
import MazeVoid from "./maze_void"

export default function MazeBlueprint({ areaAmount, gridItems, SetConnections }) {

    function GetGridItem(item) {
        if (item.type === "area") {
            return <MazeArea id={item.id} index={item.index} x={item.x} y={item.y} from={item.from}></MazeArea>
        }
        else if (item.type == "link") {
            return <MazeConnection id={item.id} index={item.index} x={item.x} y={item.y} from={item.from} to={item.to} connections={item.connections} SetConnections={SetConnections}></MazeConnection>
        }
        else {
            return <MazeVoid id={item.id} index={item.index} x={item.x} y={item.y}></MazeVoid>
        }
    }

    let gridLength = "repeat(" + (areaAmount * 2 - 1) + ", 40px";

    return <div className="border border-stone-300 m-2 grid gap-0 mx-auto" key="blueprint" style={{ gridTemplateColumns: gridLength, gridTemplateRows: gridLength }}>
        {gridItems.map(GetGridItem)}
    </div>
}