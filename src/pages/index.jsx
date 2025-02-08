import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import MazeForm from "../components/maze_form.jsx"
import Head from "../components/head.jsx"

export default function Index() {
    return <div className="flex flex-col min-h-screen bg-stone-50">
        <Header></Header>
        <div className="mx-16 flex flex-col items-center min-h-screen bg-stone-100 mb-auto">
            <Head>The maze generator</Head>
            <MazeForm></MazeForm>
        </div>
        <Footer></Footer>
    </div>
}