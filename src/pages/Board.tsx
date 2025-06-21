import { useOutletContext, useParams } from "react-router-dom"
import tailwind from "../style/tailwind"

export default function Board() {
    const { boards, setBoards } = useOutletContext<TBoardPage>()
    const { board } = useParams()
    console.log(board)
    let paramsBoard;
    if (boards) {
        paramsBoard = boards.find(e => e.name === board)
    }
    const { H4, H3 } = tailwind()

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

    return (
        <div className="flex p-[24px] gap-[24px]">
            {paramsBoard?.columns?.map((e, i) => {
                return <div key={i} className="flex flex-col gap-[24px]">
                    <h4 className={`${H4} text-[#828FA3]!`}>{e.name} ({e.tasks.length})</h4>
                    <div className="flex flex-col gap-[20px]">
                        {e.tasks.map((l, j) => {
                            return <div key={j} className="w-[280px] p-[24px_16px] flex flex-col gap-[8px] bg-[#2B2C37] rounded-[8px] shadow-[0_4px_6px_0_rgba(54,78,126,0.1)]">
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
