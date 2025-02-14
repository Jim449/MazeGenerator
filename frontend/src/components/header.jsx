import { Link } from "react-router-dom"

export default function Header() {
    return <header className="h-10 bg-stone-200">
        <nav className="flex flex-row h-full items-center border-b-1 border-stone-300">
            <img src="/public/images/maze.png" className="h-10" />
            <ul className="flex flex-row gap-4 ml-4">
                <li><Link className="hover:underline" to="/">Home</Link></li>
                <li><Link className="hover:underline" to="/blueprint">Blueprint</Link></li>
                <li><Link className="hover:underline" to="/maze">Maze</Link></li>
                <li><Link className="hover:underline" to="/about">About</Link></li>
            </ul>
            <button className="flex ml-auto mr-4 p-1 border border-black hover:underline">Login</button>
        </nav>
    </header>
}