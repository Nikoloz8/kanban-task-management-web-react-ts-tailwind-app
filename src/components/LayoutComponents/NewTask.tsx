import { useContext } from "react"
import { context } from "../../layouts/Layout"
import tailwind from "../../style/tailwind"
import index from "../../utils"

export default function NewTask() {

    const ctx = useContext(context)
    if (!ctx) return
    const { handleSubmit, showAddTask, onSubmit, register, renderInputsArr, setRenderInputsArr, setShowStatus, showStatus, setStatus, status, paramsBoard, setShowDetails, setBoards, boards, setShowDotMenu, setShowAddTask, watch, reset, unregister } = ctx

    const { H4, inputStyle, P1, H2 } = tailwind()
    const { handleDeleteSubtask, handleSaveTask } = index({ paramsBoard, boards, setBoards, reset, watch, setRenderInputsArr, renderInputsArr, unregister })

    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] w-[480px] ${!showAddTask ? "hidden" : ''}`}>
            <h2 className={`${H2} text-[#FFFFFF]`}>Add New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="title" className={`${H4} text-[#FFFFFF]`}>Title</label>
                    <input {...register("newTaskTitle")} type="text" id="title" className={`${inputStyle}`} placeholder="e.g. Take coffee break" />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="description" className={`${H4} text-[#FFFFFF]`}>Description</label>
                    <textarea {...register("newTaskDescription")} id="description" className={`${inputStyle} h-[112px]!`} placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little." />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="" className={`${H4} text-[#FFFFFF]`}>Subtasks</label>
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[20vh]!">
                            {renderInputsArr.map((_e, i) => {
                                return <div key={i} className="flex gap-[16px] items-center">
                                    <input {...register(`newTaskSubtask${i}`)} className={`${inputStyle}`} placeholder="e.g. Make coffee" type="text" />
                                    <svg onClick={() => handleDeleteSubtask(i)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                                </div>
                            })}
                        </div>
                        <button onClick={() => renderInputsArr.length > 0 ? setRenderInputsArr([...renderInputsArr, renderInputsArr[renderInputsArr.length - 1] + 1]) : setRenderInputsArr([0])} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer`}>+ Add New Subtask</button>
                    </div>
                </div>
            </form>
            <div className="flex flex-col relative gap-[8px]">
                <h4 className={`${H4} text-[#FFFFFF]`}>Status</h4>
                <div onClick={() => setShowStatus(!showStatus)} className={`cursor-pointer w-[100%] p-[8px_16px] flex justify-between rounded-[4px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] hover:border-[#635FC7] items-center ${P1} text-[#FFFFFF]`}>
                    {status}
                    <img src="/images/icon-chevron-down.svg" className={`${showStatus && "rotate-180"} transition-all duration-400`} alt="" />
                </div>
                <div className={`absolute w-[100%] flex flex-col gap-[8px] bg-[#20212C] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] p-[16px] top-[66px] ${!showStatus && "hidden"}`}>
                    {paramsBoard?.columns.map((e, i) => {
                        return <h5 key={i} onClick={() => {
                            setStatus(e.name)
                            setShowDetails(false)
                            setShowDotMenu(false)
                            setShowStatus(false)
                        }} className={`${P1} text-[#828FA3] cursor-pointer`}>{e.name}</h5>
                    })}
                </div>
            </div>
            <button onClick={() => {
                handleSaveTask(status)
                setShowAddTask(false)
                setRenderInputsArr([0])
            }} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Create Task</button>
        </div>)
}
