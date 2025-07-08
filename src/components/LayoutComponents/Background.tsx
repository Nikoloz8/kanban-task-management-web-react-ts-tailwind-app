import { useContext } from "react"
import { context } from "../../layouts/Layout"

export default function Background() {

    const ctx = useContext(context)
    if (!ctx) return null

    const { showDetails, deleteBoard, showAddNewBoard, showEditTask, setShowDetails, showAddTask, setShowEditTask, setShowDotMenu, setShowStatus, setDeleteBoard, setShowAddTask, setShowDotMenuHeader, setShowAddNewBoard, reset, deleteTask, setDeleteTask } = ctx

    return showDetails || deleteBoard || deleteTask || showAddTask || showAddNewBoard || showEditTask ? <div onClick={() => {
        setDeleteTask(false)
        setShowDetails(false)
        setShowEditTask(false)
        setShowDotMenu(false)
        setShowStatus(false)
        setDeleteBoard(false)
        setShowAddTask(false)
        setShowDotMenuHeader(false)
        setShowAddNewBoard(false)
        reset()
    }} className="fixed w-[100%] h-[100%] top-0 left-0 bg-[rgba(0,0,0,0.5)] z-30"></div> : ""
}

