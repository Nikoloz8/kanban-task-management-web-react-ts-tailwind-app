import { useOutletContext, useParams } from "react-router-dom"
import tailwind from "../style/tailwind"
import { useState } from "react"

export default function Board() {
    const { boards, setBoards, showSidebar } = useOutletContext<TBoardPage>()
    const { board } = useParams()
    let paramsBoard: TBoard | undefined;
    if (boards) {
        paramsBoard = boards.find(e => e.name === board)
    }
    const { H4, H3, H2, P1 } = tailwind()

    const getSubtasksCompletedCount = (subtasks: undefined | ISubtasks[]) => {
        let count = 0
        if (subtasks) {
            for (let i = 0; i < subtasks?.length; i++) {
                if (subtasks[i].isCompleted) {
                    count++
                }
            }
        }
        return count
    }

    const storeTaskName = (name: string) => {
        localStorage.setItem("task name", name)
    }

    const storeColumnName = (name: string) => {
        localStorage.setItem("column name", name)
    }

    const [showDetails, setShowDetails] = useState(false)

    const getColumnByName = () => {
        const columnName = localStorage.getItem("column name")
        const column = paramsBoard?.columns.find((e) => e.name === columnName)
        return column
    }

    const getTaskByName = () => {
        const taskName = localStorage.getItem("task name")
        const task = getColumnByName()?.tasks.find((e) => e.title === taskName)
        return task
    }

    const task = getTaskByName()

    const handleChangeIsCompleted = (index: number, value: boolean) => {
        const column = getColumnByName()
        const subtasks = getTaskByName()?.subtasks
        if (!subtasks) return
        const task = getTaskByName()
        if (!task) return

        const updatedSubtasks = task.subtasks.map((subtask, i) =>
            i === index ? { ...subtask, isCompleted: value } : subtask
        )

        const editedTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            subtasks: updatedSubtasks,
        }

        const filteredTasks = column?.tasks.filter((e) => e.title !== task.title)
        if (editedTask) {
            filteredTasks?.push(editedTask)
        }

        if (!column?.name || !filteredTasks) return

        const EditedColumn = {
            name: column.name,
            tasks: filteredTasks,
            color: column.color,
        }

        const filteredColumns = paramsBoard?.columns.filter(
            (e) => e.name !== localStorage.getItem("column name")
        )
        filteredColumns?.push(EditedColumn)

        const editedBoard = {
            name: paramsBoard?.name ?? "",
            columns: filteredColumns ?? [],
        }

        const filteredBoards = boards.filter((e) => e.name !== paramsBoard?.name)
        if (!editedBoard.name || !editedBoard) return

        filteredBoards.push(editedBoard)
        setBoards(filteredBoards)
        const stringedBoards = JSON.stringify(filteredBoards)
        localStorage.setItem("boards", stringedBoards)
    }


    return (
        <div className={`flex p-[24px] gap-[24px] transition-all duration-1000 ${showSidebar && "ml-[300px]"}`}>
            {showDetails && <div onClick={() => setShowDetails(false)} className="fixed w-[100%] h-[100%] top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10"></div>}
            <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-[32px] bg-[#2B2C37] w-[480px] flex flex-col gap-[24px] rounded-[6px] z-10 ${!showDetails && "hidden"}`}>
                <div className="flex justify-between items-center">
                    <h2 className={`${H2} text-[#FFFFFF]! w-[90%]`}>{task?.title}</h2>
                    <img src="/images/icon-vertical-ellipsis.svg" alt="" />
                </div>
                <p className={`${P1} text-[#828FA3]!`}>{task?.description}</p>
                <div className="flex flex-col gap-[8px]">
                    <h4 className={`${H4} text-[#FFFFFF]`}>Subtasks ({getSubtasksCompletedCount(task?.subtasks)} of {task?.subtasks.length})</h4>
                    {task?.subtasks.map((k, a) => {
                        return <label key={a} htmlFor={`subtask${a}`} className={`w-[100%] cursor-pointer p-[12px] flex items-center bg-[#20212C] rounded-[4px] gap-[16px] mt-[8px] ${H4} tracking-[0]! text-[#FFFFFF]`}>
                            <input type="checkbox" checked={k.isCompleted} onChange={(e) => handleChangeIsCompleted(a, e.target.checked)} id={`subtask${a}`} className="hidden peer" />
                            <div className="bg-[#2B2C37] w-[16px] h-[16px] rounded-[2px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] cursor-poiner peer-checked:bg-[#635FC7] peer-checked:bg-[url('/images/icon-check.svg')] bg-center bg-no-repeat"></div>
                            <span className="peer-checked:line-through peer-checked:text-[rgba(255,255,255,0.5)]!">
                                {k.title}
                            </span>
                        </label>
                    })}
                </div>
                <div className="flex flex-col gap-[8px]">
                    <h4 className={`${H4} text-[#FFFFFF]`}>Current Status</h4>
                    <div className={`w-[100%] p-[8px_16px] flex justify-between rounded-[4px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] items-center ${P1} text-[#FFFFFF]`}>
                        Doing
                        <img src="/images/icon-chevron-down.svg" alt="" />
                    </div>
                </div>
            </div>
            {paramsBoard?.columns?.map((e, i) => {
                return <div onClick={() => storeColumnName(e.name)} key={i} className="flex flex-col gap-[24px] cursor-pointer relative">
                    <h4 className={`${H4} text-[#828FA3]! mr-[178px]`}>{e.name} ({e.tasks.length})</h4>
                    <div className="flex flex-col gap-[20px]">
                        {e.tasks.map((l, j) => {
                            return <div onClick={() => {
                                storeTaskName(l.title)
                                setShowDetails(true)
                            }} key={j} className="w-[280px] p-[24px_16px] flex flex-col gap-[8px] bg-[#2B2C37] rounded-[8px] shadow-[0_4px_6px_0_rgba(54,78,126,0.1)]">
                                <h3 className={`${H3} text-[#FFFFFF]`}>{l.title}</h3>
                                <h4 className={`${H4} text-[#828FA3] tracking-[0px]!`}>{getSubtasksCompletedCount(l.subtasks)} of {l.subtasks.length} subtasks</h4>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}
