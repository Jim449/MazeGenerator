import Header from "../components/header"
import Footer from "../components/footer"
import Head from "../components/head"

export default function About() {
    return <div className="flex flex-col min-h-screen bg-stone-50">
        <Header></Header>
        <div className="mx-16 flex flex-col items-center min-h-screen bg-stone-100 mb-auto">
            <Head>About</Head>
        </div>
        <Footer></Footer>
    </div>
}