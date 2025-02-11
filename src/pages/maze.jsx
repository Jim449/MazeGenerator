import Header from "../components/header"
import Footer from "../components/footer"
import Head from "../components/head"
import Button from "../components/button"
import { useState } from "react"

export default function Maze() {
    const [length, setLength] = useState(25);
    const [roomLength, setRoomLength] = useState(24);
    const [mazeLength, setMazeLength] = useState(600);

    function ClickMaze(event) {
        let dimension = event.target.getBoundingClientRect();
        let x = Math.floor((event.clientX - dimension.left) / roomLength);
        let y = Math.floor((event.clientY - dimension.top) / roomLength);
        console.log("Clicked on room at (" + x + ", " + y + ")");
    }
    return <div className="flex flex-col min-h-screen bg-stone-50">
        <Header></Header>
        <div className="mx-16 flex flex-col items-center min-h-screen bg-stone-100 mb-auto">
            <Head>Maze</Head>

            <form className="flex flex-col items-center">
                <div className="flex self-start ml-4">
                    <select
                        id="maze-select"
                        name="maze-select"
                        className="text-sm">
                        <option value="1">Maze 1</option>
                        <option value="2">Maze 2</option>
                        <option value="3">Maze 3</option>
                    </select>
                </div>
                <div className="flex self-start">
                    <canvas
                        id="maze-canvas"
                        width={mazeLength + "px"}
                        height={mazeLength + "px"}
                        className="m-4 border border-stone-300"
                        onClick={ClickMaze}>
                    </canvas>
                    <div>
                        <ul className="my-4 p-2 border border-stone-300">
                            <li><button>First</button></li>
                            <li><button>Second</button></li>
                            <li><button>Third</button></li>
                            <li><button>Fourth</button></li>
                            <li><button>Fifth</button></li>
                            <li><button>Sixth</button></li>
                            <li><button>Seventh</button></li>
                            <li><button>Eight</button></li>
                            <li><button>Ninth</button></li>
                        </ul>
                        <textarea
                            id="unit-field"
                            rows="5"
                            className="text-wrap text-sm bg-stone-50 border border-stone-300">
                        </textarea>
                        <div className="flex flex-col">
                            <Button>New unit</Button>
                            <Button>Move all</Button>
                            <Button>Revitalize all</Button>
                            <Button>Rename</Button>
                            <Button>Change description</Button>
                            <label>Stationary</label>
                            <input type="checkbox"></input>
                        </div>
                    </div>
                </div>
                <div className="ml-4 flex self-start">
                    <h2>
                        Notes
                    </h2>
                </div>
                <div className="flex self-start">
                    <textarea
                        id="message-field"
                        rows="5"
                        className="ml-4 my-2 p-2 text-wrap text-sm w-[600px] h-[120px] bg-stone-50 border border-stone-300">
                    </textarea>
                </div>
                <div className="ml-4 flex self-start">
                    <Button>Write to maze</Button>
                    <Button>Remove from maze</Button>
                    <Button>Write</Button>
                    <Button>Delete</Button>
                    <Button>New note</Button>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </div>
}