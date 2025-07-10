import { useOutletContext } from "react-router-dom"
import tailwind from "../../style/tailwind"
import index from "../../utils"

export default function RenderColumns() {


    const { boards, setBoards, paramsBoard, setShowDetails, toggle, setShowDotMenuHeader } = useOutletContext<TContext>()

    const { getSubtasksCompletedCount, storeTaskName, storeColumnName } = index({ paramsBoard, setBoards, boards })
    const { H4, H3 } = tailwind()
    const sortedColumn = paramsBoard?.columns?.sort((a, b) => a.tasks.length - b.tasks.length)

    return sortedColumn?.map((e, i) => {
        return <div onClick={() => storeColumnName(e.name)} key={i} className="flex flex-col gap-[24px] cursor-pointer relative">
            <h4 className={`${H4} text-[#828FA3]! mr-[178px]`}>{e.name} ({e.tasks.length})</h4>
            <div className="flex flex-col gap-[20px]">
                {e.tasks.map((l, j) => {
                    return <div onClick={() => {
                        storeTaskName(l.title)
                        setShowDetails(true)
                        setShowDotMenuHeader(false)
                    }} key={j} className={`w-[280px] p-[24px_16px] flex flex-col gap-[8px] bg-[#2B2C37] rounded-[8px] shadow-[0_4px_6px_0_rgba(54,78,126,0.1)] ${toggle ? "bg-[#FFFFFF]" : ""}`}>
                        <h3 className={`${H3} text-[#FFFFFF] ${toggle ? "text-[#000112]!" : ""}`}>{l.title}</h3>
                        <h4 className={`${H4} text-[#828FA3] tracking-[0px]!`}>    Subtasks {getSubtasksCompletedCount(l.subtasks)} of {l.subtasks.length}
                        </h4>
                    </div>
                })}
            </div>
        </div>
    })
}
