import { createContext, useEffect, useState } from "react"
import data from "../data.json"
import { Outlet, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import index from "../utils"
import Background from "../components/LayoutComponents/Background"
import DeleteBoard from "../components/LayoutComponents/DeleteBoard"
import NewBoard from "../components/LayoutComponents/NewBoard"
import NewTask from "../components/LayoutComponents/NewTask"
import EditTask from "../components/LayoutComponents/EditTask"
import Header from "../components/LayoutComponents/Header"
import SidebarIcon from "../components/LayoutComponents/SidebarIcon"
import DeleteTask from "../components/LayoutComponents/DeleteTask"
import tailwind from "../style/tailwind"

export const context = createContext<TContext | null>(null)

export default function Layout() {

  const { board } = useParams()

  useEffect(() => {
    const storedData = localStorage.getItem("boards")
    if (!storedData) {
      const stringedData = JSON.stringify(data.boards)
      localStorage.setItem("boards", stringedData)
      setBoards(data.boards)
    } else {
      const parsedData = JSON.parse(storedData)
      setBoards(parsedData)
    }
  }, [])

  const [showSidebar, setShowSidebar] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [deleteBoard, setDeleteBoard] = useState(false)
  const [deleteTask, setDeleteTask] = useState(false)
  const [showDotMenu, setShowDotMenu] = useState(false)
  const [showDotMenuHeader, setShowDotMenuHeader] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [boards, setBoards] = useState<TBoard[]>()
  const [showAddTask, setShowAddTask] = useState(false)
  const [status, setStatus] = useState("Choose")
  const [renderInputsArr, setRenderInputsArr] = useState<number[]>([0])
  const [showAddNewBoard, setShowAddNewBoard] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showEditBoard, setShowEditBoard] = useState(false)
  const [subtasks, setSubtasks] = useState<{ title: string, isCompleted: boolean }[]>([])


  useEffect(() => {
    setIsMobile(window.innerWidth < 700)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 700)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  let paramsBoard: TBoard | undefined
  if (boards) {
    paramsBoard = boards.find(e => e.name === board)
  }

  const { register, watch, handleSubmit, unregister, reset } = useForm<TUseForm>({ shouldUnregister: true })

  const { getTaskByName } = index({ paramsBoard, boards, setBoards, setRenderInputsArr, renderInputsArr, unregister, watch, setShowAddNewBoard, reset, setShowDotMenu, setShowEditTask })

  useEffect(() => {
    if (!paramsBoard) return

    const task = getTaskByName()

    const columnDefaults: any = {};
    const subtaskDefaultValues: any = {};

    paramsBoard.columns?.forEach((col, i) => {
      columnDefaults[`column${i}`] = col.name
    });

    if (task?.subtasks) {
      task.subtasks.forEach((sub, i) => {
        subtaskDefaultValues[`subtaskDefault${i}`] = sub.title
      });
    }

    if (showEditTask || showAddNewBoard || showEditBoard) {
      reset({
        boardName: paramsBoard.name,
        ...columnDefaults,
        ...subtaskDefaultValues,
        editableTitle: task?.title,
        editableDescription: task?.description
      });
    }
  }, [paramsBoard, showEditTask, showAddNewBoard, showEditBoard])


  const onSubmit = () => { }
  console.log(watch())
  const { H2, H4, inputStyle, P1 } = tailwind()
  return (
    <div className={`bg-[#20212C] w-full transition-all min-h-screen flex flex-col ${toggle ? "bg-[#F4F7FD]" : ""}`}>

      <context.Provider value={{
        showDetails, deleteBoard, showAddTask, showAddNewBoard, showEditTask, setShowDetails, setShowEditTask, setShowDotMenu, setShowStatus, setDeleteBoard, setShowAddTask, setShowDotMenuHeader, setShowAddNewBoard, reset, setBoards, boards, board, handleSubmit, register, renderInputsArr, setRenderInputsArr, onSubmit, unregister, showStatus, setStatus, status, paramsBoard, watch, setShowSidebar, showSidebar, showDotMenuHeader, toggle, setToggle, setDeleteTask, deleteTask, isMobile, setShowEditBoard, showEditBoard, subtasks, setSubtasks
      }}>

        <Background />
        <DeleteBoard />
        <NewBoard />
        <NewTask />
        <EditTask />
        <SidebarIcon />
        <DeleteTask />
        <Header />

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
                  {renderInputsArr.map((e, i) => {
                    return <div key={i} className="flex gap-[16px] items-center">
                      <input {...register(`column${e}`)} className={`${inputStyle}`} placeholder="e.g. Todo" type="text" />
                      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                    </div>
                  })}
                </div>
                <button onClick={() => setRenderInputsArr([...renderInputsArr, renderInputsArr[renderInputsArr.length - 1] + 1])} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer`}>+ Add New Column</button>
              </div>
            </div>
            <button className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Save Changes</button>
          </form>
        </div>

        <div className={`relative flex-1 overflow-y-auto custom-scroll transition-all duration-1000 ${showSidebar && !isMobile && "ml-[300px]"}`}>
          <Outlet context={{ boards, setBoards, showSidebar, setShowStatus, showStatus, paramsBoard, showDetails, setShowDetails, setDeleteTask, showDotMenu, setShowDotMenu, setShowEditTask, showEditTask, toggle, setShowDotMenuHeader, setSubtasks, subtasks, setShowEditBoard }} />
        </div>


      </context.Provider >
    </div >
  )
}
