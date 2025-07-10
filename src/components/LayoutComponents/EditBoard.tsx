import { useContext } from "react"
import tailwind from "../../style/tailwind"
import { context } from "../../layouts/Layout"
import index from "../../utils"

export default function EditBoard() {

    const { H2, H4, inputStyle, P1 } = tailwind()
    const ctx = useContext(context)
    if (!ctx) return
    const { handleSubmit, onSubmit, register, renderInputsArr, setRenderInputsArr, unregister, showEditBoard, setColumns, columns, watch, boards, paramsBoard, setBoards, setShowEditBoard } = ctx

    const { handleEditBoard } = index({ watch, columns, boards, paramsBoard, setBoards, renderInputsArr })


    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] max-sm:w-[343px] w-[480px] ${!showEditBoard && "hidden!"}`}>
            <h2 className={`${H2} text-[#FFFFFF]`}>Edit Board</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="boardName" className={`${H4} text-[#FFFFFF]`}>Board Name</label>
                    <input {...register("boardName")} type="text" id="boardName" className={`${inputStyle}`} placeholder="e.g. Web Design" />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="" className={`${H4} text-[#FFFFFF]`}>Board Columns</label>
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[20vh]!">
                            {columns.map((_e, i) => {
                                return <div key={i} className="flex gap-[16px] items-center">
                                    <input {...register(`columnDefault${i}`)} className={`${inputStyle}`} placeholder="e.g. Todo" type="text" />
                                    <svg onClick={() => {
                                        unregister(`columnDefault${i}`)
                                        setColumns([...columns.filter((_e, ind) => ind !== i)])
                                    }} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                                </div>
                            })}
                            {renderInputsArr.map((e, i) => {
                                return <div key={i} className="flex gap-[16px] items-center">
                                    <input {...register(`column${e}`)} className={`${inputStyle}`} placeholder="e.g. Todo" type="text" />
                                    <svg onClick={() => {
                                        unregister(`column${e}`)
                                        setRenderInputsArr([...renderInputsArr.filter((el) => el !== e)])
                                    }} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                                </div>
                            })}
                        </div>
                        <button onClick={() => renderInputsArr.length > 0 ? setRenderInputsArr([...renderInputsArr, renderInputsArr[renderInputsArr.length - 1] + 1]) : setRenderInputsArr([0])} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer`}>+ Add New Column</button>
                    </div>
                </div>
                <button onClick={() => {
                    handleEditBoard()
                    setShowEditBoard(false)
                }} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Save Changes</button>
            </form>
        </div>)
}
