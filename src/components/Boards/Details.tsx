import { useOutletContext } from "react-router-dom"
import tailwind from "../../style/tailwind"
import index from "../../utils"

export default function Details() {

    const { boards, setBoards, setShowStatus, showDotMenu, setShowDotMenu, showStatus, paramsBoard, showDetails, setShowDetails, setShowEditTask, showEditTask, setDeleteTask, setSubtasks, setRenderInputsArr, toggle } = useOutletContext<TContext>()
    const { getTaskByName, getSubtasksCompletedCount, handleChangeIsCompleted, handleChangeStatus } = index({ paramsBoard, setBoards, boards })
    const { H4, H2, P1 } = tailwind()
    const task = getTaskByName()

    return (
        <div className={`${toggle && "bg-[#FFFFFF]!"} fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-[32px] bg-[#2B2C37] w-[480px] max-sm:w-[343px] flex flex-col gap-[24px] rounded-[6px] z-40 ${!showDetails && "hidden"}`}>
            <div className="flex justify-between items-center relative">
                <h2 className={`${H2} text-[#FFFFFF] w-[90%] ${toggle && "text-[#000112]!"}`}>{task?.title}</h2>
                <img onClick={() => setShowDotMenu(!showDotMenu)} className="cursor-pointer" src="/images/icon-vertical-ellipsis.svg" alt="" />
                <div className={`absolute p-[16px] flex flex-col gap-[16px] ${toggle && "bg-[#FFFFFF]"} bg-[#20212C] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] right-[-80px] bottom-[-110px] ${!showDotMenu && "hidden"}`}>
                    <h5 onClick={() => {
                        setShowEditTask(!showEditTask)
                        setShowDetails(false)
                        setShowDotMenu(false)
                        setSubtasks([...task?.subtasks!])
                        setRenderInputsArr([0])
                    }} className={`${P1} text-[#828FA3] w-[160px] cursor-pointer`}>Edit Task</h5>
                    <h5 onClick={() => {
                        setDeleteTask(true)
                        setShowDetails(false)
                        setShowDotMenu(false)
                    }} className={`${P1} text-[#EA5555] cursor-pointer`}>Delete Task</h5>
                </div>
            </div>
            <p className={`${P1} text-[#828FA3]!`}>{task?.description}</p>
            <div className="flex flex-col gap-[8px]">
                <h4 className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!"}`}>Subtasks ({getSubtasksCompletedCount(task?.subtasks)} of {task?.subtasks.length})</h4>
                {task?.subtasks.map((k, a) => {
                    return <label key={a} htmlFor={`subtask${a}`} className={`w-[100%] cursor-pointer p-[12px] flex items-center bg-[#20212C] rounded-[4px] gap-[16px] mt-[8px] ${H4} tracking-[0]! hover:bg-[rgba(99,95,199,0.25)] text-[#FFFFFF] ${toggle && "bg-[#F4F7FD]! hover:bg-[rgba(99,95,199,0.25)]!"}`}>
                        <input type="checkbox" checked={k.isCompleted} onChange={(e) => handleChangeIsCompleted(a, e.target.checked)} id={`subtask${a}`} className="hidden peer" />
                        <div className={`bg-[#2B2C37]  w-[16px] h-[16px] rounded-[2px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] cursor-poiner peer-checked:bg-[#635FC7] peer-checked:bg-[url('/images/icon-check.svg')] bg-center bg-no-repeat ${toggle && "bg-[#828FA33F] border-[rgba(130,143,163,0.25)]"}`}></div>
                        <span className={`peer-checked:line-through text-[#FFFFFF] peer-checked:text-[rgba(255,255,255,0.5)] ${toggle && "peer-checked:text-[rgba(0,1,18,0.5)]! text-[#000112]!"}`}>
                            {k.title}
                        </span>
                    </label>
                })}
            </div>
            <div className="flex flex-col relative gap-[8px]">
                <h4 className={`${H4} text-[#FFFFFF] ${toggle && "text-[#828FA3]!   "}`}>Current Status</h4>
                <div onClick={() => setShowStatus(!showStatus)} className={`cursor-pointer w-[100%] p-[8px_16px] flex justify-between rounded-[4px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] hover:border-[#635FC7] items-center ${P1} text-[#FFFFFF] ${toggle && "text-[#000112]!"}`}>
                    {task?.status}
                    <img src="/images/icon-chevron-down.svg" className={`${showStatus && "rotate-180"} transition-all duration-400`} alt="" />
                </div>
                <div className={`absolute w-[100%] flex flex-col gap-[8px] bg-[#20212C] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] p-[16px] top-[66px] ${!showStatus && "hidden"}`}>
                    {paramsBoard?.columns.map((e, i) => {
                        return <h5 key={i} onClick={() => {
                            handleChangeStatus(e.name)
                            setShowDetails(false)
                            setShowDotMenu(false)
                            setShowStatus(false)
                        }} className={`${P1} text-[#828FA3] cursor-pointer`}>{e.name}</h5>
                    })}
                </div>
            </div>
        </div>)
}
