import Header from "../components/header.jsx"
import Footer from "../components/footer.jsx"
import Head from "../components/head.jsx"
import { useEffect, useState } from "react"
import BlueprintSelector from "../components/blueprint_selector.jsx"
import Button from "../components/button.jsx"
import Paragraph from "../components/paragraph.jsx"

export default function Index() {
    const [blueprintList, setBlueprintList] = useState([]);
    const [blueprint, setBlueprint] = useState();

    useEffect(() => {
        setBlueprintList([{
            name: "Blueprint 1",
            id: 1,
            user_id: 1,
            area_amount: 3,
            area_size: 3
        },
        {
            name: "Blueprint 2",
            id: 2,
            user_id: 1,
            area_amount: 4,
            area_size: 2
        },
        {
            name: "Blueprint 3",
            id: 3,
            user_id: 1,
            area_amount: 2,
            area_size: 5
        }])
    },
        [])

    function handleSelect(event) {
        setBlueprint(event.target.value)
    }

    return <div className="flex flex-col min-h-screen bg-stone-50">
        <Header></Header>
        <div className="mx-16 flex flex-col items-center min-h-screen bg-stone-100 mb-auto">
            <Head>The maze generator</Head>
            <hr className="w-1/2 border-stone-400 m-2" />
            <Paragraph>You will need a maze blueprint in order to generate a maze.</Paragraph>
            <Button>Create blueprint</Button>
            <hr className="w-1/2 border-stone-400 m-2" />
            {blueprintList.length > 0 && <>
                <Paragraph>Or select an existing maze blueprint from the list.</Paragraph>
                <BlueprintSelector data={blueprintList} blueprint={blueprint} handleSelect={handleSelect}></BlueprintSelector>
                <div className="flex justify-items-center gap-1 my-2">
                    <Button>Generate maze</Button>
                    <Button>Modify blueprint</Button>
                    <Button>Delete blueprint</Button>
                </div>
            </>}
        </div>
        <Footer></Footer>
    </div>
}