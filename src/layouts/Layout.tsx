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

  let paramsBoard: TBoard | undefined
  if (boards) {
    paramsBoard = boards.find(e => e.name === board)
  }

  const { register, watch, handleSubmit, unregister, reset } = useForm<TUseForm>({ shouldUnregister: true })

  const { getTaskByName } = index({ paramsBoard, boards, setBoards, setRenderInputsArr, renderInputsArr, unregister, watch, setShowAddNewBoard, reset, setShowDotMenu, setShowEditTask })

  const columnDefaults: any = {}
  const subtaskDefaultValues: any = {}

  useEffect(() => {
    if (paramsBoard) {
      const task = getTaskByName()

      paramsBoard.columns?.forEach((col, i) => {
        columnDefaults[`column${i}`] = col.name
      })

      if (task?.subtasks) {
        task.subtasks.forEach((sub, i) => {
          subtaskDefaultValues[`subtaskDefault${i}`] = sub.title
        })
      }
      if (!showAddTask) {
        reset({
          boardName: paramsBoard.name,
          ...columnDefaults,
          ...subtaskDefaultValues,
          editableTitle: task?.title,
          editableDescription: task?.description
        })
      }
    }
  }, [paramsBoard])


  const onSubmit = () => { }

  console.log(watch())
  return (
    <div className={`bg-[#20212C] transition-all min-h-[100vh] flex flex-col ${toggle ? "bg-[#F4F7FD]" : ""}`}>

      <context.Provider value={{
        showDetails, deleteBoard, showAddTask, showAddNewBoard, showEditTask, setShowDetails, setShowEditTask, setShowDotMenu, setShowStatus, setDeleteBoard, setShowAddTask, setShowDotMenuHeader, setShowAddNewBoard, reset, setBoards, boards, board, handleSubmit, register, renderInputsArr, setRenderInputsArr, onSubmit, unregister, showStatus, setStatus, status, paramsBoard, watch, setShowSidebar, showSidebar, showDotMenuHeader, toggle, setToggle
      }}>

        <Background />
        <DeleteBoard />
        <NewBoard />
        <NewTask />
        <EditTask />
        <SidebarIcon />
        <Header />

        <Outlet context={{ boards, setBoards, showSidebar, setShowStatus, showStatus, paramsBoard, showDetails, setShowDetails, showDotMenu, setShowDotMenu, setShowEditTask, showEditTask, toggle }} />

      </context.Provider>
    </div>
  )
}
