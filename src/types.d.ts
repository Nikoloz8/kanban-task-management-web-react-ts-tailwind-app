interface ISubtasks {
    title: string,
    isCompleted: boolean
}[]

interface ITask {
    title: string,
    description: string,
    status: string | undefined,
    subtasks: ISubtasks[]
}


type TColumn = {
    name: string
    color?: string
    tasks: {
        title: string
        description: string
        status: string
        subtasks: ISubtasks[]
    }[]
}

type TBoard = {
    name: string,
    columns: {
        name: string,
        color?: string
        tasks: {
            title: string,
            description: string,
            status: string,
            subtasks: ISubtasks[]
        }[]
    }[]
}

type TUseForm = {
    [key: `column${number}`]: string
    boardName: string,
    title: string,
    description: string,
    [key: `subtaskDefault${number}`]: string
    [key: `subtask${number}`]: string


}

type TBoardPage = {
    boards: TBoard[]
    setBoards: React.Dispatch<React.SetStateAction<TBoard[] | undefined>>
    showSidebar: boolean
    setShowStatus: React.Dispatch<React.SetStateAction<boolean>>
    showStatus: boolean
    paramsBoard: TBoard | undefined
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    showDetails: boolean
    showDotMenu: boolean
    setShowDotMenu: React.Dispatch<React.SetStateAction<boolean>>
    setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>
    showEditTask: boolean
    toggle: boolean
    setDeleteTask: React.Dispatch<React.SetStateAction<boolean>>
    subtasks: { title: string, isCompleted: boolean }[]
    setSubtasks: React.Dispatch<React.SetStateAction<{ title: string; isCompleted: boolean; }[]>>
    setShowDotMenuHeader: React.Dispatch<React.SetStateAction<boolean>>
    setRenderInputsArr: React.Dispatch<React.SetStateAction<number[]>>
    renderInputsArr: number[]
}


type TIndex = Partial<{
    paramsBoard: TBoard | undefined
    setBoards: React.Dispatch<React.SetStateAction<TBoard[] | undefined>>
    boards: TBoard[]
    status: string
    unregister: UseFormUnregister<FieldValues>
    setRenderInputsArr: React.Dispatch<React.SetStateAction<number[]>>
    renderInputsArr: number[]
    watch: UseFormWatch<FieldValues>
    reset: UseFormReset<FieldValues>
    setShowAddNewBoard: React.Dispatch<React.SetStateAction<boolean>>
    setShowDotMenu: React.Dispatch<React.SetStateAction<boolean>>
    setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>
    subtasks: { title: string, isCompleted: boolean }[]
    setColumns: React.Dispatch<React.SetStateAction<{
        name: string
        color?: string
        tasks: {
            title: string
            description: string
            status: string
            subtasks: ISubtasks[]
        }[]
    }[]>>
    columns: {
        name: string
        color?: string
        tasks: {
            title: string
            description: string
            status: string
            subtasks: ISubtasks[]
        }[]
    }[]
}>

type TContext = {
    showDetails: boolean
    deleteBoard: boolean
    showAddTask: boolean
    showAddNewBoard: boolean
    showEditTask: boolean
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>
    setShowDotMenu: React.Dispatch<React.SetStateAction<boolean>>
    setShowStatus: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddTask: React.Dispatch<React.SetStateAction<boolean>>
    setShowDotMenuHeader: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddNewBoard: React.Dispatch<React.SetStateAction<boolean>>
    reset: UseFormReset<FieldValues>
    setDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>
    setBoards: React.Dispatch<React.SetStateAction<TBoard[] | undefined>>
    boards: TBoard[] | undefined
    deleteBoard: React.Dispatch<React.SetStateAction<boolean>>
    board: string | undefined
    setRenderInputsArr: React.Dispatch<React.SetStateAction<number[]>>
    renderInputsArr: number[]
    handleSubmit: UseFormHandleSubmit<TUseForm, TUseForm>
    register: UseFormRegister<TUseForm>
    onSubmit: () => void
    unregister: UseFormUnregister<FieldValues>
    showStatus: boolean
    setStatus: React.Dispatch<React.SetStateAction<string>>
    status: string
    paramsBoard: TBoard | undefined
    watch: UseFormWatch<FieldValues>
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
    showSidebar: boolean
    showDotMenuHeader: boolean
    toggle: boolean
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
    deleteTask: boolean
    setDeleteTask: React.Dispatch<React.SetStateAction<boolean>>
    isMobile: boolean
    setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>
    showEditBoard: boolean
    subtasks: { title: string, isCompleted: boolean }[]
    setSubtasks: React.Dispatch<React.SetStateAction<{ title: string; isCompleted: boolean; }[]>>
    setColumns: React.Dispatch<React.SetStateAction<{
        name: string
        color?: string
        tasks: {
            title: string
            description: string
            status: string
            subtasks: ISubtasks[]
        }[]
    }[]>>
    columns: {
        name: string
        color?: string
        tasks: {
            title: string
            description: string
            status: string
            subtasks: ISubtasks[]
        }[]
    }[]
}