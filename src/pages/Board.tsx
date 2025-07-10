import RenderColumns from "../components/Boards/RenderColumns"
import Details from "../components/Boards/Details"
import tailwind from "../style/tailwind"
import { useOutletContext } from "react-router-dom"


export default function Board() {

    const { H1 } = tailwind()
    const { toggle, setShowEditBoard } = useOutletContext<TContext>()

    return (
        <div className={`flex h-[100%] absolute p-[24px] gap-[24px]`}>

            <Details />

            <RenderColumns />

            <div onClick={() => setShowEditBoard(true)} className={`w-[280px] h-[100vh] mt-[34px] cursor-pointer bg-[rgba(43,44,55,0.5)] rounded-[6px] ${H1} text-[#828FA3] flex items-center justify-center ${toggle ? "bg-[rgba(233,239,250,0.5)]" : ""}`}>+ New Column</div>
        </div>
    )
}
