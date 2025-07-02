import { useContext } from "react"
import { context } from "../../layouts/Layout"

export default function SidebarIcon() {

    const ctx = useContext(context)
    if (!ctx) return

    const { setShowSidebar, showSidebar } = ctx

    return (
        <div onClick={() => setShowSidebar(true)} className={`p-[19px_22px_19px_18px] cursor-pointer bg-[#635FC7] rounded-[0_100px_100px_0] z-10 transition-all duration-1000 fixed bottom-[5%] left-0 ${showSidebar && "left-[-1000px]"}`}>
            <img src="/images/icon-show-sidebar.svg" alt="" />
        </div>)
}
