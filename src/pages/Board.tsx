import RenderColumns from "../components/Boards/RenderColumns"
import Details from "../components/Boards/Details"
import EmptyBoard from "../components/Boards/EmptyBoard"

export default function Board() {
    return (
        <div className={`flex h-[100%] absolute p-[24px] gap-[24px] w-[100%]`}>

            <Details />

            <RenderColumns />

            <EmptyBoard />

        </div>
    )
}
