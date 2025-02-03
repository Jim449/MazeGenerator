import Button from "./button.jsx"
import { useState } from 'react'
import MazeBlueprint from "./maze_blueprint.jsx";

export default function MazeForm() {
    const [areaAmount, setAreaAmount] = useState(3);
    const [areaSize, setAreaSize] = useState(3);
    const [gridItems, setGridItems] = useState(BuildGridItems(3));

    function HandleSelect(event) {
        setAreaAmount(event.target.value)
        setGridItems(BuildGridItems(event.target.value))
    }

    function SetConnections(index, value) {

        let item = { ...gridItems[index], connections: value };
        let newGridItems = { ...gridItems };
        newGridItems[index] = item;
        // Item properly created and inserted
        // console.log(item);
        // console.log(newGridItems);
        // But I get an error at maze_blueprint 19
        // setGridItems(newGridItems);
    }

    function BuildGridItems(size) {
        const newList = []
        let id = "";
        let type = "";
        let from = 0;
        let to = 0;
        let connections = 0;
        let index = 0;

        for (let y = 0; y < size * 2 - 1; y++) {
            for (let x = 0; x < size * 2 - 1; x++) {
                if (y % 2 == 0 && x % 2 == 0) {
                    from = Math.floor((y * size + x) / 2);
                    type = "area";
                    id = "area-" + from;
                }
                else if (y % 2 == 0 && x % 2 == 1) {
                    to = from + 1;
                    type = "link";
                    id = "link-" + from + "-" + to;
                }
                else if (y % 2 == 1 && x % 2 == 0) {
                    to += 1;
                    from = to - size;
                    type = "link";
                    id = "link-" + from + "-" + to;
                }
                else if (y % 2 == 1 && x % 2 == 1) {
                    type = "void";
                    id = "void-" + from;
                }
                connections = Math.floor(Math.random() * 3);
                newList.push({ x: x, y: y, id: id, index: index, type: type, from: from, to: to, connections: connections });
                index += 1;
            }
        }
        return newList
    }

    return <>
        <form className="flex flex-col">
            <p className="my-2">
                <label htmlFor="area-amount">Amount of maze areas</label>
                <br />
                <select value={areaAmount} onChange={HandleSelect} id="area-amount" name="area-amount">
                    <option value="1">Single area</option>
                    <option value="2">2x2 areas</option>
                    <option value="3">3x3 areas</option>
                    <option value="4">4x4 areas</option>
                    <option value="5">5x5 areas</option>
                </select>
            </p>
            <p className="my-2">
                <label htmlFor="area-size">Size of maze areas</label>
                <br />
                <select defaultValue="3" id="area-size" name="area-size">
                    <option value="1">Single room</option>
                    <option value="2">2x2 rooms</option>
                    <option value="3">3x3 rooms</option>
                    <option value="4">4x4 rooms</option>
                    <option value="5">5x5 rooms</option>
                </select>
            </p>
            <p className="my-2">
                <label htmlFor="randomize-areas">Randomize area locations&nbsp;</label>
                <input type="checkbox" id="randomize-areas" name="randomize-areas"></input>
            </p>
        </form>
        <MazeBlueprint areaAmount={areaAmount} gridItems={gridItems} SetConnections={SetConnections}></MazeBlueprint>
        <p className="my-2 text-xs">
            Click on a number to change the amount of paths between maze areas.
        </p>
        <p className="my-2">
            <Button text="Generate maze"></Button>
        </p>
    </>
}