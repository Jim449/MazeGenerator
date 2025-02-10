import Button from "./button.jsx"
import { useState, useEffect } from 'react'
import MazeRoom from "./maze_room"
import BlueprintSelector from "./blueprint_selector.jsx"

export default function MazeBlueprint() {
    const [areaAmount, setAreaAmount] = useState(3);
    const [areaSize, setAreaSize] = useState(3);
    const [blueprintList, setBlueprintList] = useState([]);
    const [blueprint, setBlueprint] = useState(GenerateBlueprint());
    const [gridItems, setGridItems] = useState(blueprint.rooms);

    let gridStyle = "repeat(" + Math.floor(Math.sqrt(gridItems.length)) + ", 100px";

    useEffect(() => {
        setBlueprintList([{
            name: "Blueprint 1",
            id: 1,
            user_id: 1,
            area_amount: 1,
            area_size: 3,
            rooms: [{
                key: "room-0",
                index: 0,
                x: 0,
                y: 0,
                north: true,
                east: false,
                south: false,
                west: false
            }]
        }, {
            name: "Blueprint 2",
            id: 2,
            user_id: 1,
            area_amount: 1,
            area_size: 4,
            rooms: [{
                key: "room-0",
                index: 0,
                x: 0,
                y: 0,
                north: false,
                east: false,
                south: true,
                west: false
            }]
        }, {
            name: "Blueprint 3",
            id: 3,
            user_id: 1,
            area_amount: 2,
            area_size: 2,
            rooms: [{
                key: "room-0",
                index: 0,
                x: 0,
                y: 0,
                north: false,
                east: true,
                south: true,
                west: false
            }, {
                key: "room-1",
                index: 1,
                x: 1,
                y: 0,
                north: true,
                east: false,
                south: true,
                west: true
            }, {
                key: "room-2",
                index: 2,
                x: 0,
                y: 1,
                north: true,
                east: false,
                south: false,
                west: false
            }, {
                key: "room-3",
                index: 3,
                x: 1,
                y: 1,
                north: true,
                east: false,
                south: false,
                west: false
            },]
        }]);
    },
        [])

    function GenerateBlueprint() {
        return {
            name: "New blueprint",
            id: 0,
            user_id: 1,
            area_amount: 3,
            area_size: 3,
            rooms: BuildRooms(3)
        };
    }

    function SelectBlueprint(event) {
        console.log(event.target.value);
        const newBlueprint = blueprintList.find(item => item.id == event.target.value);
        console.log(newBlueprint);
        setAreaAmount(newBlueprint.area_amount);
        setAreaSize(newBlueprint.area_size);
        setBlueprint(newBlueprint);
        setGridItems(blueprint.rooms);
    }

    function DeleteBlueprint(event) {
        event.preventDefault();
        setBlueprintList(blueprintList.filter(item => item !== blueprint));
        setBlueprint(blueprintList[0]);
        setAreaAmount(blueprint.area_amount);
        setAreaSize(blueprint.area_size);
        setGridItems(blueprint.rooms);
    }

    function SelectAreaAmount(event) {
        setAreaAmount(event.target.value);
        setGridItems(BuildRooms(event.target.value));
    }

    function SelectAreaSize(event) {
        setAreaSize(event.target.value);
    }

    function ChangeConnections(event, index, direction) {
        event.preventDefault();
        let item = { ...gridItems[index] };
        let newGridItems = [...gridItems];
        console.log("Changing connections of room " + index + " in direction " + direction + " from " + item[direction] + " to " + !item[direction]);
        item[direction] = !item[direction];
        newGridItems[index] = item;
        setGridItems(newGridItems);
    }

    function BuildRooms(length) {
        const rooms = [];
        let index = 0;

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                rooms.push({ key: "room-" + index, index: index, x: x, y: y, north: false, east: false, south: false, west: false });
                index += 1;
            }
        }
        return rooms
    }

    return <form className="flex flex-col items-center">
        {blueprintList.length > 0 && <BlueprintSelector data={blueprintList} value={blueprint} handleSelect={SelectBlueprint}></BlueprintSelector>}
        <p className="my-2">
            <label htmlFor="area-amount">Amount of maze areas</label>
        </p>
        <p>
            <select value={areaAmount} onChange={SelectAreaAmount} id="area-amount" name="area-amount">
                <option value="1">Single area</option>
                <option value="2">2x2 areas</option>
                <option value="3">3x3 areas</option>
                <option value="4">4x4 areas</option>
                <option value="5">5x5 areas</option>
            </select>
        </p>
        <p className="my-2">
            <label htmlFor="area-size">Size of maze areas</label>
        </p>
        <p>
            <select value={areaSize} onChange={SelectAreaSize} id="area-size" name="area-size">
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

        <div className="grid m-4 border border-stone-300" style={{ gridTemplateColumns: gridStyle, gridTemplateRows: gridStyle }}>
            {gridItems.map((item) => <MazeRoom key={item.key} props={item} ChangeConnections={ChangeConnections}></MazeRoom>)}
            {/* <MazeRoom id={0} west={true} east={true}></MazeRoom>
            <MazeRoom id={1} west={true} east={true}></MazeRoom>
            <MazeRoom id={2} west={true} south={true}></MazeRoom>
            <MazeRoom id={3} south={true} east={true}></MazeRoom>
            <MazeRoom id={4} west={true} north={true}></MazeRoom>
            <MazeRoom id={5} north={true} south={true}></MazeRoom>
            <MazeRoom id={6} north={true} east={true}></MazeRoom>
            <MazeRoom id={7} east={true} west={true}></MazeRoom>
            <MazeRoom id={8} north={true} west={true}></MazeRoom> */}
        </div>

        <p className="my-2 text-xs">
            Click on a number to change the amount of paths between maze areas.
        </p>
        <div className="flex justify-items-center gap-1 my-2">
            <Button>Generate maze</Button>
            <Button>Save blueprint as...</Button>
            <Button>Save blueprint</Button>
            <Button onClick={DeleteBlueprint}>Delete blueprint</Button>
        </div>
    </form>
}