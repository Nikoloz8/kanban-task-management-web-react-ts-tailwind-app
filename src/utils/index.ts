import { useParams } from "react-router-dom"

export default function index({ paramsBoard, boards, setShowAddNewBoard, setBoards, reset, setRenderInputsArr, unregister, renderInputsArr, watch }: TIndex) {

    const { board } = useParams()

    const getColumnByName = () => {
        const columnName = localStorage.getItem("column name")
        const column = paramsBoard?.columns.find((e) => e.name === columnName)
        return column
    }

    const getTaskByName = () => {
        const taskName = localStorage.getItem("task name")
        const column = getColumnByName()
        if (!column || !Array.isArray(column.tasks)) return undefined
        return column.tasks.find((e) => e.title === taskName)
    }

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

    const handleSaveColumns = (filteredColumns: any) => {
        const editedBoard = {
            name: paramsBoard?.name ?? "",
            columns: filteredColumns ?? [],
        }


        const filteredBoards = boards?.filter((e) => e.name !== paramsBoard?.name)
        if (!editedBoard.name || !editedBoard) return

        filteredBoards?.push(editedBoard)
        setBoards!(filteredBoards!)
        const stringedBoards = JSON.stringify(filteredBoards)
        localStorage.setItem("boards", stringedBoards)
    }

    const handleSaveChangedTasks = (editedTasks: any) => {
        const column = getColumnByName()
        const subtasks = getTaskByName()?.subtasks
        if (!subtasks) return
        const task = getTaskByName()
        if (!task || !column) return

        const EditedColumn = {
            name: column.name,
            tasks: editedTasks,
            color: column.color,
        }

        const filteredColumns = paramsBoard?.columns.filter((e) => e.name !== localStorage.getItem("column name"))
        filteredColumns?.push(EditedColumn)

        handleSaveColumns(filteredColumns)
    }

    const returnSubtastks = (subtaskName: string) => {
        const subtasks = []
        for (let i of Object.keys(watch())) {
            if (i.includes(subtaskName)) {
                const subtaskObj = {
                    title: watch()[i],
                    isCompleted: false
                }
                subtasks.push(subtaskObj)
            }
        }

        return subtasks
    }

    const returnTaskObject = (status: string) => {

        const taskObject = {
            title: watch().title,
            description: watch().description,
            status: status,
            subtasks: returnSubtastks("subtask")
        }

        return taskObject
    }

    const handleSaveTask = (status: string) => {
        const column = paramsBoard?.columns.find((e) => e.name === status)
        if (!column) return
        const editedTasks = column.tasks
        editedTasks.push(returnTaskObject(status))
        const EditedColumn = {
            name: column.name,
            tasks: editedTasks,
            color: column.color,
        }
        const filteredColumns = paramsBoard?.columns.filter((e) => e.name !== status)
        filteredColumns?.push(EditedColumn)
        handleSaveColumns(filteredColumns)
        reset()
    }

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


        const editedTasks = column?.tasks.map((taskItem) =>
            taskItem.title === task.title ? editedTask : taskItem
        )

        handleSaveChangedTasks(editedTasks)

    }

    const task = getTaskByName()

    const handleDeleteTask = () => {
        const tasks = getColumnByName()?.tasks
        const filteredTasks = tasks?.filter((e) => e.title !== task?.title)
        handleSaveChangedTasks(filteredTasks)
    }

    const handleChangeStatus = (newStatus: string) => {
        const task = getTaskByName()
        if (!task) return

        const prevColumn = paramsBoard?.columns.find(col => col.name === task.status)
        const newColumn = paramsBoard?.columns.find(col => col.name === newStatus)
        if (!prevColumn || !newColumn) return

        const updatedPrevTasks = prevColumn.tasks.filter(t => t.title !== task.title)

        const updatedTask = {
            ...task,
            status: newStatus,
        }

        const updatedNewTasks = [...newColumn.tasks, updatedTask]

        const updatedColumns = paramsBoard?.columns.map(col => {
            if (col.name === prevColumn.name) {
                return { ...col, tasks: updatedPrevTasks }
            } else if (col.name === newColumn.name) {
                return { ...col, tasks: updatedNewTasks }
            } else {
                return col
            }
        })

        handleSaveColumns(updatedColumns)
    }

    const handleDeleteBoard = () => {
        const filteredBoards = boards?.filter((e) => e.name !== board)
        setBoards!(filteredBoards!)
        const stringedFilteredboards = JSON.stringify(filteredBoards)
        localStorage.setItem("boards", stringedFilteredboards)
    }

    const handleDeleteSubtask = (index: number) => {
        setRenderInputsArr!(renderInputsArr!.filter((_e, i) => i !== index))
        unregister(`subtask${index}`)
    }

    const returnBoardObject = () => {
        const columns = []

        for (let i of Object.keys(watch())) {
            if (i.includes("column")) {
                const columnObj = {
                    name: watch()[i],
                    tasks: []
                }
                columns.push(columnObj)
            }
        }
        const board = {
            name: watch().boardName,
            columns
        }
        return board
    }

    const handleSaveBoard = () => {
        if (!boards) return
        setBoards!([...boards, returnBoardObject()])
        setShowAddNewBoard!(false)
        const boardsForPush = boards
        boardsForPush.push(returnBoardObject())
        const stringedBoards = JSON.stringify(boardsForPush)
        localStorage.setItem("boards", stringedBoards)
    }

    return { getColumnByName, getTaskByName, getSubtasksCompletedCount, storeTaskName, storeColumnName, handleSaveColumns, handleSaveChangedTasks, handleChangeIsCompleted, handleDeleteTask, handleChangeStatus, handleDeleteBoard, handleDeleteSubtask, handleSaveTask, handleSaveBoard, returnSubtastks, returnTaskObject }
}
