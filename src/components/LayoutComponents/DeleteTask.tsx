import { useContext } from 'react'
import tailwind from '../../style/tailwind'
import { context } from '../../layouts/Layout'
import index from '../../utils'

export default function DeleteTask() {

    const { H2, H3, P1 } = tailwind()
    const ctx = useContext(context)
    if (!ctx) return
    const { deleteTask, setDeleteTask, paramsBoard, setBoards, watch, boards } = ctx
    const { handleDeleteTask } = index({ paramsBoard, setBoards, watch, boards })
    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] max-sm:w-[343px] w-[480px] ${!deleteTask && "hidden"}`}>
            <h2 className={`${H2} text-[#EA5555]`}>Delete this task?</h2>
            <p className={`${P1} text-[#828FA3]`}>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-[16px]">
                <button onClick={() => {
                    handleDeleteTask()
                    setDeleteTask(false)
                }} className={`p-[14px_78px] rounded-[20px] bg-[#EA5555] hover:bg-[#FF9898] cursor-pointer ${H3} text-[1.3rem]! text-[#FFFFFF]`}>
                    Delete
                </button>
                <button onClick={() => setDeleteTask(false)} className={`p-[14px_78px] cursor-pointer rounded-[20px] bg-[#FFFFFF] ${H3} text-[1.3rem]! text-[#635FC7]`}>
                    Cancel
                </button>
            </div>
        </div>)
}
