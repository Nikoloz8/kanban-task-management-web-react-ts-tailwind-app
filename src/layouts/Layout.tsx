import { useEffect, useState } from "react"
import tailwind from "../style/tailwind"
import data from "../data.json"
import { Outlet, useNavigate, useParams } from "react-router-dom"

export default function Layout() {

  const { H1, H3, H4 } = tailwind()
  const [showSidebar, setShowSidebar] = useState(false)
  const [boards, setBoards] = useState<TBoard[]>()

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

  const { board } = useParams()
  const navigate = useNavigate()

  return (
    <div className="bg-[#20212C] min-h-[100vh] flex flex-col">
      <div onClick={() => setShowSidebar(true)} className={`p-[19px_22px_19px_18px] cursor-pointer bg-[#635FC7] rounded-[0_100px_100px_0] z-10 transition-all duration-1000 fixed bottom-[5%] left-0 ${showSidebar && "left-[-1000px]"}`}>
        <img src="/images/icon-show-sidebar.svg" alt="" />
      </div>
      <header className="w-[100%] flex relative bg-[#2B2C37] transition-all duration-1000 border-b-[1px] border-solid border-[#3E3F4E]">
        <div className={`fixed z-20 ${showSidebar ? "left-0" : "left-[-300px]"} border-r-[1px] border-solid border-[#3E3F4E] transition-all duration-1000 top-0 h-[100%] flex flex-col justify-between bg-[#2B2C37]`}>
          <div className="flex flex-col gap-[54px] items-start">
            <img src="/images/logo-light.svg" className="m-[32px_0_0_32px]" alt="" />
            <div className="w-[276px] flex flex-col gap-[19px] mr-[24px]">
              <h4 className={`${H4} text-[#828FA3] ml-[32px]`}>ALL BOARDS ({boards?.length})</h4>
              <div className="flex flex-col">
                {boards?.map((e, i) => {
                  return <button onClick={() => navigate(`/${e.name}`)} key={i} className={`cursor-pointer w-[100%] flex gap-[16px] ${board === e.name && "bg-[#635FC7]"} rounded-[0_100px_100px_0] ${H3} text-[#FFFFFF] items-center p-[16px_32px]`}>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill={board === e.name ? "#FFFFFF" : "#828FA3"} /></svg>
                    {e.name}
                  </button>
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[22px] pl-[24px] mb-[32px]">
            <div onClick={() => setShowSidebar(false)} className={`flex items-center gap-[15px] ml-[8px] ${H3} text-[#828FA3] cursor-pointer`}>
              <img src="/images/icon-hide-sidebar.svg" alt="" />
              Hide Sidebar
            </div>
          </div>
        </div>
        <div className="flex gap-[32px] w-[100%]">
          <div className={`p-[35px_32px_35px_24px] border-r-[1px] border-solid border-[#3E3F4E]`}>
            <img src="/images/logo-light.svg" className="min-w-[152px]!" alt="" />
          </div>
          <div className="p-[24px_32px] items-center w-[100%] flex justify-between">
            <h1 className={`${H1} text-[#FFFFFF]! transition-all duration-1000 ${showSidebar && "ml-[77px]"}`}>Platform Launch</h1>
            <div className="flex gap-[24px] items-center">
              <button className={`p-[15px_24px] bg-[#635FC7] rounded-[24px] ${H3} text-[#FFFFFF]`}>
                + Add New Task
              </button>
              <img src="/images/icon-vertical-ellipsis.svg" alt="" />
            </div>
          </div>
        </div>
      </header>
      <Outlet context={{ boards, setBoards, showSidebar }} />
    </div>
  )
}
