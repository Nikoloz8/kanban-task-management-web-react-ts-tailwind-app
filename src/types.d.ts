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

type TUseForm = {
    [key: `column${number}`]: string
    boardName: string,
    title: string,
    description: string,
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
}


type TIndex = Partial<{
    paramsBoard: TBoard | undefined
    setBoards: React.Dispatch<React.SetStateAction<TBoard[] | undefined>>
    boards: TBoard[]
    unregister: UseFormUnregister<FieldValues>
    setRenderInputsArr: React.Dispatch<React.SetStateAction<number[]>>
    renderInputsArr: number[]
    watch: UseFormWatch<FieldValues>
    reset: UseFormReset<FieldValues>
    setShowAddNewBoard: React.Dispatch<React.SetStateAction<boolean>>

}>