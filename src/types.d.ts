interface ISubtasks {
    title: string,
    isCompleted: boolean
}[]

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

type TBoardPage = {
    boards: TBoard[]
    setBoards: React.Dispatch<React.SetStateAction<TBoard[] | undefined>>
    showSidebar: boolean
    deleteBoard: boolean
    setDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>
    setShowStatus: React.Dispatch<React.SetStateAction<boolean>>
    showStatus: boolean
    paramsBoard: TBoard | undefined
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    showDetails: boolean
}


type TIndex = Partial<{
    paramsBoard: TBoard | undefined
    setBoards: React.Dispatch<React.SetStateAction<TBoard[] | undefined>>
    boards: TBoard[]
    unregister: UseFormUnregister<FieldValues>
    setSubtasks: React.Dispatch<React.SetStateAction<number[]>>
    subtasks: number[]
}>