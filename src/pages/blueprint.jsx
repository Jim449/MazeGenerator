import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import MazeBlueprint from "../components/maze_blueprint.jsx"
import Head from "../components/head.jsx"

export default function Blueprint() {
    return <div className="flex flex-col min-h-screen bg-stone-50">
        <Header></Header>
        <div className="mx-16 flex flex-col items-center min-h-screen bg-stone-100 mb-auto">
            <Head>Maze blueprint</Head>
            <MazeBlueprint></MazeBlueprint>
        </div>
        <Footer></Footer>
    </div>
}