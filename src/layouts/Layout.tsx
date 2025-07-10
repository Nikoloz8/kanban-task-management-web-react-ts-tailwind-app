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
import EditBoard from "../components/LayoutComponents/EditBoard"

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
  const [columns, setColumns] = useState<{ name: string, color?: string, tasks: { title: string, description: string, status: string, subtasks: ISubtasks[] }[] }[]>([])

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
      columnDefaults[`columnDefault${i}`] = col.name
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

  return (
    <div className={`bg-[#20212C] w-full transition-all min-h-screen flex flex-col ${toggle ? "bg-[#F4F7FD]" : ""}`}>

      <context.Provider value={{
        showDetails, deleteBoard, showAddTask, showAddNewBoard, showEditTask, setShowDetails, setShowEditTask, setShowDotMenu, setShowStatus, setDeleteBoard, setShowAddTask, setShowDotMenuHeader, setShowAddNewBoard, reset, setBoards, boards, board, handleSubmit, register, renderInputsArr, setRenderInputsArr, onSubmit, unregister, showStatus, setStatus, status, paramsBoard, watch, setShowSidebar, showSidebar, showDotMenuHeader, toggle, setToggle, setDeleteTask, deleteTask, isMobile, setShowEditBoard, showEditBoard, subtasks, setSubtasks, setColumns, columns
      }}>

        <Background />
        <DeleteBoard />
        <NewBoard />
        <NewTask />
        <EditTask />
        <SidebarIcon />
        <DeleteTask />
        <EditBoard />
        <Header />



        <div className={`relative flex-1 overflow-y-auto custom-scroll transition-all duration-1000 ${showSidebar && !isMobile && "ml-[300px]"}`}>
          <Outlet context={{ boards, setBoards, showSidebar, setShowStatus, showStatus, paramsBoard, showDetails, setShowDetails, setDeleteTask, showDotMenu, setShowDotMenu, setShowEditTask, showEditTask, toggle, setShowDotMenuHeader, setSubtasks, subtasks, setShowEditBoard, renderInputsArr, setRenderInputsArr, setColumns }} />
        </div>


      </context.Provider >
    </div >
  )
}
