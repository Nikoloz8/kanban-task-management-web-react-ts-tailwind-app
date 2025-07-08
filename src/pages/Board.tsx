import RenderColumns from "../components/Boards/RenderColumns"
import Details from "../components/Boards/Details"
import tailwind from "../style/tailwind"
import { useOutletContext } from "react-router-dom"


export default function Board() {

    const { H1 } = tailwind()
    const { showSidebar, toggle } = useOutletContext<TContext>()

    return (
        <div className={`flex p-[24px] gap-[24px] transition-all duration-1000 ${showSidebar && "ml-[300px]"}`}>

            <Details />

            <RenderColumns />

            <div className={`w-[280px] h-[100vh] mt-[34px] cursor-pointer bg-[rgba(43,44,55,0.5)] rounded-[6px] ${H1} text-[#828FA3] flex items-center justify-center ${toggle ? "bg-[rgba(233,239,250,0.5)]" : ""}`}>+ New Column</div>
        </div>
    )
}
