import { useContext } from "react"
import { context } from "../../layouts/Layout"
import tailwind from "../../style/tailwind"
import index from "../../utils"

export default function NewBoard() {

    const ctx = useContext(context)
    if (!ctx) return null
    const { handleSubmit, register, renderInputsArr, showAddNewBoard, onSubmit, setRenderInputsArr, watch, boards, setShowAddNewBoard, setBoards, unregister, toggle } = ctx
    const { H2, H4, P1, inputStyle } = tailwind()
    const { handleDeleteInput, handleSaveBoard } = index({ setRenderInputsArr, unregister, boards, watch, setBoards, setShowAddNewBoard })

    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] max-sm:w-[343px] w-[480px] ${toggle && "bg-[#FFFFFF]"} ${!showAddNewBoard && "hidden!"}`}>
            <h2 className={`${H2} text-[#FFFFFF] ${toggle && "text-[#000112]!"}`}>Add New Board</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="boardName" className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Board Name</label>
                    <input {...register("boardNameNew")} type="text" id="boardName" className={`${inputStyle} ${toggle && "placeholder:text-[rgba(0,1,18,0.25)]! text-[#000112]!"}`} placeholder="e.g. Web Design" />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="" className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Board Columns</label>
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[20vh]!">
                            {renderInputsArr.map((e, i) => {
                                return <div key={i} className="flex gap-[16px] items-center">
                                    <input {...register(`columnNew${e}`)} className={`${inputStyle} ${toggle && "placeholder:text-[rgba(0,1,18,0.25)]! text-[#000112]!"}`} placeholder="e.g. Todo" type="text" />
                                    <svg onClick={() => handleDeleteInput("column", i)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                                </div>
                            })}
                        </div>
                        <button onClick={() => setRenderInputsArr([...renderInputsArr, renderInputsArr[renderInputsArr.length - 1] + 1])} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer ${toggle && "bg-[rgba(99,95,199,0.1)]"}`}>+ Add New Column</button>
                    </div>
                </div>
                <button onClick={() => handleSaveBoard()} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Create New Board</button>
            </form>
        </div>)
}
