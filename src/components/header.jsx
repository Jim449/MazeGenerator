export default function Header() {
    return <header className="h-10 bg-stone-200">
        <nav className="flex flex-row h-full items-center border-b-1 border-stone-300">
            <img src="src/assets/maze.png" className="h-10" />
            <ul className="flex flex-row gap-4 ml-4">
                <li><a className="hover:underline" href="index.html">Home</a></li>
                <li><a className="hover:underline" href="maze.html">Maze</a></li>
                <li><a className="hover:underline" href="about.html">About</a></li>
            </ul>
            <button className="flex ml-auto mr-4 p-1 border border-black hover:underline">Login</button>
        </nav>
    </header>
}