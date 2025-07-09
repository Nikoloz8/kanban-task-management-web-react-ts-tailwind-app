import { useContext } from "react"
import { context } from "../../layouts/Layout"
import tailwind from "../../style/tailwind"
import { useNavigate } from "react-router-dom"

export default function Header() {

    const ctx = useContext(context)
    if (!ctx) return
    const { boards, setShowAddNewBoard, showAddNewBoard, setShowSidebar, showSidebar, showDotMenuHeader, setShowAddTask, showAddTask, setShowDotMenuHeader, setDeleteBoard, board, reset, toggle, setToggle, isMobile } = ctx

    const { H4, H3, H1, P1 } = tailwind()
    const navigate = useNavigate()

    return (
        <header className={`w-[100%] flex relative bg-[#2B2C37] transition-all duration-1000 border-b-[1px] border-solid border-[#3E3F4E] ${toggle ? "bg-[#FFFFFF] border-[#E4EBFA]  " : ""}`}>
            <div className={`fixed z-20 ${showSidebar && !isMobile ? "left-0" : "left-[-310px]"} border-r-[1px] border-solid border-[#3E3F4E] overflow-y-auto custom-scroll transition-all duration-1000 top-0 h-[100%] flex flex-col justify-between bg-[#2B2C37] ${isMobile ? "top-1/2 left-1/2! -translate-x-1/2 -translate-y-1/2 h-auto rounded-[8px] border-none! hidden z-40" : ""} ${isMobile && showSidebar && "flex!"} ${toggle ? "bg-[#FFFFFF] border-[#E4EBFA]" : ""}`}>
                <div className="flex flex-col gap-[54px] items-start">
                    <img src={toggle ? "/images/logo-dark.svg" : "/images/logo-light.svg"} className={`m-[32px_0_0_32px] ${isMobile ? "hidden" : ""}`} alt="" />
                    <div className="w-[276px] flex flex-col gap-[19px] mr-[24px]">
                        <h4 className={`${H4} text-[#828FA3] ml-[32px] ${isMobile && "mt-[16px]"}`}>ALL BOARDS ({boards?.length})</h4>
                        <div className="flex flex-col">
                            {boards?.map((e, i) => {
                                return <button onClick={() => navigate(`/${e.name}`)} key={i} className={`cursor-pointer w-[100%] flex gap-[16px] ${board === e.name && "bg-[#635FC7]"} rounded-[0_100px_100px_0] ${H3} text-[#828FA3] ${e.name === board ? "text-[#FFFFFF]!" : ""} items-center p-[16px_32px]`}>
                                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill={board === e.name ? "#FFFFFF" : "#828FA3"} /></svg>
                                    {e.name}
                                </button>
                            })}
                            <button onClick={() => {
                                setShowAddNewBoard(!showAddNewBoard)
                                isMobile && setShowSidebar(false)
                                reset({ boardName: "", })
                            }} className={`cursor-pointer w-[100%] flex gap-[16px] rounded-[0_100px_100px_0] ${H3} text-[#635FC7] items-center p-[16px_32px]`}>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#635FC7" /></svg>
                                + Create New Board
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[22px] items-center">
                    <div className={`flex p-[14px_64px] gap-[24px] items-center rounded-[6px] bg-[#20212C] ${toggle ? "bg-[#F4F7FD]" : ""} transition-all!`}>
                        <img src="/images/icon-light-theme.svg" alt="" />
                        <div onClick={() => setToggle(!toggle)} className={`p-[3px] cursor-pointer rounded-[12px] bg-[#635FC7] w-[40px]`}>
                            <div className={`w-[14px] h-[14px] rounded-[100%] bg-[#FFFFFF] transition-all duration-500 ${toggle ? "translate-x-[140%]!" : ""}`}></div>
                        </div>
                        <img src="/images/icon-dark-theme.svg" alt="" />
                    </div>
                    <div className={`flex flex-col gap-[22px] w-[100%] pl-[24px] mb-[32px] ${isMobile ? "mb-[16px]!" : ""}`}>
                        <div onClick={() => setShowSidebar(false)} className={`flex items-center gap-[15px] ml-[8px] ${H3} text-[#828FA3] cursor-pointer`}>
                            <img src="/images/icon-hide-sidebar.svg" alt="" />
                            Hide Sidebar
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-[32px] w-[100%]">
                <div className={`p-[35px_32px_35px_24px] border-r-[1px] border-solid border-[#3E3F4E] ${toggle ? "border-[#E4EBFA]" : ''} ${isMobile ? "hidden" : ''}`}>
                    <img src={toggle ? "/images/logo-dark.svg" : "/images/logo-light.svg"} className="min-w-[152px]!" alt="" />
                </div>
                <div className="p-[24px_32px] items-center w-[100%] flex justify-between">
                    <div className="flex gap-[16px]">
                        {isMobile ? <img src="/images/logo-mobile.svg" alt="" /> : ""}
                        <div className=" flex gap-[8px] items-center">
                            <h1 onClick={() => isMobile && setShowSidebar(!showSidebar)} className={`${H1} ${toggle ? "text-[#000112]!" : ""} text-[#FFFFFF] transition-all duration-1000 ${isMobile ? "cursor-pointer" : ""} max-sm:text-[1.8rem]! ${showSidebar && !isMobile && "ml-[77px]"}`}>{board}</h1>
                            {isMobile ? <img src="/images/icon-chevron-down.svg" className={`mt-[4px]! transition-all duration-500" ${showSidebar ? "rotate-180" : ""}`} alt="" /> : ""}
                        </div>
                    </div>
                    <div className="flex gap-[24px] items-center">
                        <button onClick={() => setShowAddTask(!showAddTask)} className={`p-[15px_24px] cursor-pointer bg-[#635FC7] flex items-center rounded-[24px] ${H3} text-[#FFFFFF]`}>
                            {isMobile ? <img src="/images/icon-add-task-mobile.svg" alt="" /> : "+ Add New Task"}
                        </button>
                        <div className="relative">
                            <img className="cursor-pointer" onClick={() => {
                                setShowDotMenuHeader(!showDotMenuHeader)
                            }} src="/images/icon-vertical-ellipsis.svg" alt="" />
                            <div className={`absolute ${!showDotMenuHeader && "hidden"} p-[16px] flex flex-col gap-[16px] bg-[#20212C] z-10 shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] top-[50px] right-0`}>
                                <h5 className={`${P1} text-[#828FA3] w-[160px] cursor-pointer`}>Edit Board</h5>
                                <h5 onClick={() => {
                                    setDeleteBoard(true)
                                    setShowDotMenuHeader(false)
                                }} className={`${P1} text-[#EA5555] cursor-pointer`}>Delete Board</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>)
}
