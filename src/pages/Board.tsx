import RenderColumns from "../components/Boards/RenderColumns"
import Details from "../components/Boards/Details"
import tailwind from "../style/tailwind"
import { useOutletContext } from "react-router-dom"


export default function Board() {

    const { H1, H2, H3 } = tailwind()
    const { toggle, setShowEditBoard, setColumns, paramsBoard } = useOutletContext<TContext>()

    return (
        <div className={`flex h-[100%] absolute p-[24px] gap-[24px] w-[100%]`}>

            <Details />

            <RenderColumns />

            {paramsBoard?.columns.length! > 0 ?
                <div onClick={() => {
                    setShowEditBoard(true)
                    setColumns(paramsBoard?.columns!)
                }} className={`w-[280px] h-[100vh] mt-[34px] cursor-pointer bg-[rgba(43,44,55,0.5)] rounded-[6px] ${H1} text-[#828FA3] hover:text-[#635FC7] flex items-center justify-center ${toggle ? "bg-[rgba(233,239,250,0.5)]" : ""}`}>+ New Column</div> : <div className={`flex h-[100%] w-[100%] items-center justify-center transition-all duration-1000`}>
                    <div className="flex gap-[32px] flex-col items-center">
                        <h2 className={`${H2} text-[#828FA3]`}>This board is empty. Create a new column to get started.</h2>
                        <button onClick={() => setShowEditBoard(true)} className={`p-[15px_24px] cursor-pointer bg-[#635FC7] flex items-center rounded-[24px] ${H3} text-[#FFFFFF] hover:bg-[#A8A4FF]`}>
                            + Add New Column
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}
