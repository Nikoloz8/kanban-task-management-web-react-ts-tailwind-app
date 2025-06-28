import { useOutletContext } from "react-router-dom"
import tailwind from "../style/tailwind"
import { useState } from "react"
import index from "../utils"

export default function Board() {

    const { boards, setBoards, showSidebar, deleteBoard, setDeleteBoard, setShowStatus, showStatus, paramsBoard, showDetails, setShowDetails } = useOutletContext<TBoardPage>()

    const { getTaskByName, getSubtasksCompletedCount, storeTaskName, storeColumnName, handleChangeIsCompleted, handleChangeStatus, handleDeleteTask } = index({ paramsBoard, setBoards, boards })
    
    const [showDotMenu, setShowDotMenu] = useState(false)
    const { H4, H3, H2, P1 } = tailwind()

    const task = getTaskByName()
    const sortedColumn = paramsBoard?.columns?.sort((a, b) => a.tasks.length - b.tasks.length)

    return (
        <div className={`flex p-[24px] gap-[24px] transition-all duration-1000 ${showSidebar && "ml-[300px]"}`}>
            {showDetails || deleteBoard ? <div onClick={() => {
                setShowDetails(false)
                setShowDotMenu(false)
                setShowStatus(false)
                setDeleteBoard(false)
            }} className="fixed w-[100%] h-[100%] top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10"></div> : ""}
            <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-[32px] bg-[#2B2C37] w-[480px] flex flex-col gap-[24px] rounded-[6px] z-10 ${!showDetails && "hidden"}`}>
                <div className="flex justify-between items-center relative">
                    <h2 className={`${H2} text-[#FFFFFF]! w-[90%]`}>{task?.title}</h2>
                    <img onClick={() => setShowDotMenu(!showDotMenu)} className="cursor-pointer" src="/images/icon-vertical-ellipsis.svg" alt="" />
                    <div className={`absolute p-[16px] flex flex-col gap-[16px] bg-[#20212C] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] right-[-80px] bottom-[-110px] ${!showDotMenu && "hidden"}`}>
                        <h5 className={`${P1} text-[#828FA3] w-[160px] cursor-pointer`}>Edit Task</h5>
                        <h5 onClick={() => {
                            handleDeleteTask()
                            setShowDetails(false)
                        }} className={`${P1} text-[#EA5555] cursor-pointer`}>Delete Task</h5>
                    </div>
                </div>
                <p className={`${P1} text-[#828FA3]!`}>{task?.description}</p>
                <div className="flex flex-col gap-[8px]">
                    <h4 className={`${H4} text-[#FFFFFF]`}>Subtasks ({getSubtasksCompletedCount(task?.subtasks)} of {task?.subtasks.length})</h4>
                    {task?.subtasks.map((k, a) => {
                        return <label key={a} htmlFor={`subtask${a}`} className={`w-[100%] cursor-pointer p-[12px] flex items-center bg-[#20212C] rounded-[4px] gap-[16px] mt-[8px] ${H4} tracking-[0]! hover:bg-[rgba(99,95,199,0.25)] text-[#FFFFFF]`}>
                            <input type="checkbox" checked={k.isCompleted} onChange={(e) => handleChangeIsCompleted(a, e.target.checked)} id={`subtask${a}`} className="hidden peer" />
                            <div className="bg-[#2B2C37] w-[16px] h-[16px] rounded-[2px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] cursor-poiner peer-checked:bg-[#635FC7] peer-checked:bg-[url('/images/icon-check.svg')] bg-center bg-no-repeat"></div>
                            <span className="peer-checked:line-through peer-checked:text-[rgba(255,255,255,0.5)]!">
                                {k.title}
                            </span>
                        </label>
                    })}
                </div>
                <div className="flex flex-col relative gap-[8px]">
                    <h4 className={`${H4} text-[#FFFFFF]`}>Current Status</h4>
                    <div onClick={() => setShowStatus(!showStatus)} className={`cursor-pointer w-[100%] p-[8px_16px] flex justify-between rounded-[4px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] hover:border-[#635FC7] items-center ${P1} text-[#FFFFFF]`}>
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
            </div>
            {sortedColumn?.map((e, i) => {
                return <div onClick={() => storeColumnName(e.name)} key={i} className="flex flex-col gap-[24px] cursor-pointer relative">
                    <h4 className={`${H4} text-[#828FA3]! mr-[178px]`}>{e.name} ({e.tasks.length})</h4>
                    <div className="flex flex-col gap-[20px]">
                        {e.tasks.map && e.tasks.map((l, j) => {
                            return <div onClick={() => {
                                storeTaskName(l.title)
                                setShowDetails(true)
                            }} key={j} className="w-[280px] p-[24px_16px] flex flex-col gap-[8px] bg-[#2B2C37] rounded-[8px] shadow-[0_4px_6px_0_rgba(54,78,126,0.1)]">
                                <h3 className={`${H3} text-[#FFFFFF]`}>{l.title}</h3>
                                <h4 className={`${H4} text-[#828FA3] tracking-[0px]!`}>    Subtasks {getSubtasksCompletedCount(l.subtasks)} of {l.subtasks.length}
                                </h4>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}
