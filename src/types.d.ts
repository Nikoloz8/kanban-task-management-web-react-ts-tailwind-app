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
    setBoards: React.Dispatch<React.SetStateAction<TBoard[]>>
}