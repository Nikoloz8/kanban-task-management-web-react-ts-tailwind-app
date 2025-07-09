import { useContext } from "react"
import tailwind from "../../style/tailwind"
import index from "../../utils"
import { context } from "../../layouts/Layout"

export default function DeleteBoard() {

    const { H2, P1, H3 } = tailwind()

    const ctx = useContext(context)
    if (!ctx) return null

    const { boards, setBoards, setDeleteBoard, deleteBoard, board } = ctx
    const { handleDeleteBoard } = index({ boards, setBoards })

    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] w-[480px] max-sm:w-[343px] ${!deleteBoard && "hidden"}`}>
            <h2 className={`${H2} text-[#EA5555]`}>Delete this board?</h2>
            <p className={`${P1} text-[#828FA3]`}>Are you sure you want to delete the {board} board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-[16px]">
                <button onClick={() => {
                    handleDeleteBoard()
                    setDeleteBoard(false)
                }} className={`p-[14px_78px] rounded-[20px] bg-[#EA5555] hover:bg-[#FF9898] cursor-pointer ${H3} text-[1.3rem]! text-[#FFFFFF]`}>
                    Delete
                </button>
                <button onClick={() => setDeleteBoard(false)} className={`p-[14px_78px] cursor-pointer rounded-[20px] bg-[#FFFFFF] ${H3} text-[1.3rem]! text-[#635FC7]`}>
                    Cancel
                </button>
            </div>
        </div>)
}
