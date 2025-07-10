import { useContext } from "react"
import { context } from "../../layouts/Layout"
import tailwind from "../../style/tailwind"
import index from "../../utils"

export default function EditTask() {

    const ctx = useContext(context)
    if (!ctx) return

    const { handleSubmit, register, showEditTask, onSubmit, unregister, renderInputsArr, setRenderInputsArr, setShowStatus, showStatus, setShowDetails, setStatus, setShowDotMenu, status, boards, paramsBoard, setShowEditTask, reset, watch, setBoards, subtasks, setSubtasks, toggle } = ctx

    const { H2, inputStyle, H4, P1 } = tailwind()

    const { handleDeleteInput, getColumnByName, handleEditTask } = index({ watch, setRenderInputsArr, unregister, paramsBoard, setShowEditTask, setShowDotMenu, status, boards, setBoards, reset, renderInputsArr, subtasks })

    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex-col gap-[24px] hidden z-40 rounded-[6px] max-sm:w-[343px] w-[480px] ${showEditTask && "flex!"} ${toggle && "bg-[#FFFFFF]"}`}>
            <h2 className={`${H2} text-[#FFFFFF] ${toggle && "text-[#000112]!"}`}>Edit Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="title" className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Title</label>
                    <input {...register("editableTitle")} type="text" id="title" className={`${inputStyle} ${toggle && "placeholder:text-[rgba(0,1,18,0.25)]! text-[#000112]!"}}`} placeholder="e.g. Take coffee break" />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="description" className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Description</label>
                    <textarea {...register("editableDescription")} id="description" className={`${inputStyle} h-[112px]! ${toggle && "placeholder:text-[rgba(0,1,18,0.25)]! text-[#000112]!"}`} placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little." />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="" className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Subtasks</label>
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[20vh]!">
                            {subtasks.map((_e, i) => {
                                return <div key={i} className="flex gap-[16px] items-center">
                                    <input {...register(`subtaskDefault${i}`)} className={`${inputStyle} ${toggle && "placeholder:text-[rgba(0,1,18,0.25)]! text-[#000112]!"}`} placeholder="e.g. Make coffee" type="text" />
                                    <svg onClick={() => {
                                        unregister(`subtaskDefault${i}`)
                                        setSubtasks(subtasks.filter((_e, ind) => i != ind))
                                    }
                                    } width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                                </div>
                            })}
                            {renderInputsArr.map((_e, i) => {
                                return <div key={i} className="flex gap-[16px] items-center">
                                    <input {...register(`subtask${i}`)} className={`${inputStyle} ${toggle && "placeholder:text-[rgba(0,1,18,0.25)]! text-[#000112]!"} `} placeholder="e.g. Make coffee" />
                                    <svg onClick={() => handleDeleteInput("subtask", i)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                                </div>
                            })}
                        </div>
                        <button onClick={() => setRenderInputsArr(prev => [...prev, prev.length])}
                            className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer ${toggle && "bg-[rgba(99,95,199,0.1)]!"}`}>+ Add New Subtask</button>
                    </div>
                </div>
            </form>
            <div className="flex flex-col relative gap-[8px]">
                <h4 className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Status</h4>
                <div onClick={() => setShowStatus(!showStatus)} className={`cursor-pointer w-[100%] p-[8px_16px] flex justify-between rounded-[4px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] hover:border-[#635FC7] items-center ${P1} text-[#FFFFFF] ${toggle && "text-[#000112]!"}`}>
                    {status === "Choose" ? getColumnByName()?.name : status}
                    <img src="/images/icon-chevron-down.svg" className={`${showStatus && "rotate-180"} transition-all duration-400`} alt="" />
                </div>
                <div className={`absolute w-[100%] flex flex-col gap-[8px] bg-[#20212C] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] p-[16px] top-[66px] ${toggle && "bg-[#FFFFFF]!"} ${!showStatus && "hidden"}`}>
                    {paramsBoard?.columns.map((e, i) => {
                        return <h5 key={i} onClick={() => {
                            setStatus(e.name)
                            setShowDetails(false)
                            setShowDotMenu(false)
                            setShowStatus(false)
                        }} className={`${P1} text-[#828FA3]! cursor-pointer ${toggle && "text-[#000112]!"}`}>{e.name}</h5>
                    })}
                </div>
            </div>
            <button onClick={() => handleEditTask()} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Save Changes</button>
        </div>)
}
