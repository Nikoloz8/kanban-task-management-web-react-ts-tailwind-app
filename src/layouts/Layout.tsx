import { useEffect, useState } from "react"
import tailwind from "../style/tailwind"
import data from "../data.json"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import index from "../utils"

export default function Layout() {

  const { H1, H3, H4, P1, H2, inputStyle } = tailwind()
  const { board } = useParams()
  const { register, watch, handleSubmit, unregister, reset } = useForm()
  const navigate = useNavigate()

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

  const [showSidebar, setShowSidebar] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [deleteBoard, setDeleteBoard] = useState(false)
  const [showDotMenu, setShowDotMenu] = useState(false)
  const [showDotMenuHeader, setShowDotMenuHeader] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [boards, setBoards] = useState<TBoard[]>()
  const [showAddTask, setShowAddTask] = useState(false)
  const [renderInputsArr, setRenderInputsArr] = useState([0])
  const [status, setStatus] = useState("Choose")
  const [showAddNewBoard, setShowAddNewBoard] = useState(false)

  let paramsBoard: TBoard | undefined
  if (boards) {
    paramsBoard = boards.find(e => e.name === board)
  }

  const { handleDeleteBoard, handleDeleteSubtask, handleSaveTask, handleSaveBoard } = index({ paramsBoard, boards, setBoards, setRenderInputsArr, renderInputsArr, unregister, watch, setShowAddNewBoard, reset })

  const onSubmit = () => { }


  return (
    <div className="bg-[#20212C] min-h-[100vh] flex flex-col">
      {showDetails || deleteBoard || showAddTask || showAddNewBoard ? <div onClick={() => {
        setShowDetails(false)
        setShowDotMenu(false)
        setShowStatus(false)
        setDeleteBoard(false)
        setShowAddTask(false)
        setShowDotMenuHeader(false)
        setShowAddNewBoard(false)
        reset()
      }} className="fixed w-[100%] h-[100%] top-0 left-0 bg-[rgba(0,0,0,0.5)] z-30"></div> : ""}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] w-[480px] ${!deleteBoard && "hidden"}`}>
        <h2 className={`${H2} text-[#EA5555]`}>Delete this board?</h2>
        <p className={`${P1} text-[#828FA3]`}>Are you sure you want to delete the {board} board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="flex justify-between">
          <button onClick={() => {
            handleDeleteBoard()
            setDeleteBoard(false)
          }} className={`p-[14px_78px] rounded-[20px] bg-[#EA5555] hover:bg-[#FF9898] cursor-pointer ${H3} text-[1.3rem]! text-[#FFFFFF]`}>
            Delete
          </button>
          <button onClick={() => setDeleteBoard(false)} className={`p-[14px_78px] cursor-pointer rounded-[20px] bg-[#FFFFFF] ${H3} text-[1.3rem]! text-[#635FC7]`}>
            Cancel
          </button>
        </div>
      </div>
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] w-[480px] ${!showAddNewBoard && "hidden!"}`}>
        <h2 className={`${H2} text-[#FFFFFF]`}>Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="boardName" className={`${H4} text-[#FFFFFF]`}>Board Name</label>
            <input {...register("boardName")} type="text" id="boardName" className={`${inputStyle}`} placeholder="e.g. Web Design" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="" className={`${H4} text-[#FFFFFF]`}>Board Columns</label>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[20vh]!">
                {renderInputsArr.map((e, i) => {
                  return <div key={i} className="flex gap-[16px] items-center">
                    <input {...register(`column${e}`)} className={`${inputStyle}`} placeholder="e.g. Todo" type="text" />
                    <svg onClick={() => handleDeleteSubtask(i)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                  </div>
                })}
              </div>
              <button onClick={() => setRenderInputsArr([...renderInputsArr, renderInputsArr[renderInputsArr.length - 1] + 1])} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer`}>+ Add New Column</button>
            </div>
          </div>
          <button onClick={() => handleSaveBoard()} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Create New Board</button>
        </form>
      </div>
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2B2C37] p-[32px] flex flex-col gap-[24px] z-40 rounded-[6px] w-[480px] ${!showAddTask ? "hidden" : ''}`}>
        <h2 className={`${H2} text-[#FFFFFF]`}>Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="title" className={`${H4} text-[#FFFFFF]`}>Title</label>
            <input {...register("title")} type="text" id="title" className={`${inputStyle}`} placeholder="e.g. Take coffee break" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="description" className={`${H4} text-[#FFFFFF]`}>Description</label>
            <textarea {...register("description")} id="description" className={`${inputStyle} h-[112px]!`} placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little." />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="" className={`${H4} text-[#FFFFFF]`}>Subtasks</label>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[20vh]!">
                {renderInputsArr.map((e, i) => {
                  return <div key={i} className="flex gap-[16px] items-center">
                    <input {...register(`subtask${e}`)} className={`${inputStyle}`} placeholder="e.g. Make coffee" type="text" />
                    <svg onClick={() => handleDeleteSubtask(i)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" className="hover:fill-[#EA5555] cursor-pointer" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g></svg>
                  </div>
                })}
              </div>
              <button onClick={() => setRenderInputsArr([...renderInputsArr, renderInputsArr[renderInputsArr.length - 1] + 1])} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#FFFFFF] ${P1} font-[700] text-[#635FC7] cursor-pointer`}>+ Add New Subtask</button>
            </div>
          </div>
        </form>
        <div className="flex flex-col relative gap-[8px]">
          <h4 className={`${H4} text-[#FFFFFF]`}>Status</h4>
          <div onClick={() => setShowStatus(!showStatus)} className={`cursor-pointer w-[100%] p-[8px_16px] flex justify-between rounded-[4px] border-[1px] border-solid border-[rgba(130,143,163,0.25)] hover:border-[#635FC7] items-center ${P1} text-[#FFFFFF]`}>
            {status}
            <img src="/images/icon-chevron-down.svg" className={`${showStatus && "rotate-180"} transition-all duration-400`} alt="" />
          </div>
          <div className={`absolute w-[100%] flex flex-col gap-[8px] bg-[#20212C] shadow-[0_10px_20px_0_rgba(54,78,126,0.25)] rounded-[8px] p-[16px] top-[66px] ${!showStatus && "hidden"}`}>
            {paramsBoard?.columns.map((e, i) => {
              return <h5 key={i} onClick={() => {
                setStatus(e.name)
                setShowDetails(false)
                setShowDotMenu(false)
                setShowStatus(false)
              }} className={`${P1} text-[#828FA3] cursor-pointer`}>{e.name}</h5>
            })}
          </div>
        </div>
        <button onClick={() => {
          handleSaveTask(status)
          setShowAddTask(false)
        }} className={`w-[100%] p-[8px] text-center rounded-[20px] bg-[#635FC7] ${P1} font-[700] text-[#FFFFFF] cursor-pointer`}>Create Task</button>
      </div>
      <div onClick={() => setShowSidebar(true)} className={`p-[19px_22px_19px_18px] cursor-pointer bg-[#635FC7] rounded-[0_100px_100px_0] z-10 transition-all duration-1000 fixed bottom-[5%] left-0 ${showSidebar && "left-[-1000px]"}`}>
        <img src="/images/icon-show-sidebar.svg" alt="" />
      </div>
      <header className="w-[100%] flex relative bg-[#2B2C37] transition-all duration-1000 border-b-[1px] border-solid border-[#3E3F4E]">
        <div className={`fixed z-20 ${showSidebar ? "left-0" : "left-[-310px]"} border-r-[1px] border-solid border-[#3E3F4E] transition-all duration-1000 top-0 h-[100%] flex flex-col justify-between bg-[#2B2C37]`}>
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
                <button onClick={() => setShowAddNewBoard(!showAddNewBoard)} className={`cursor-pointer w-[100%] flex gap-[16px] rounded-[0_100px_100px_0] ${H3} text-[#635FC7] items-center p-[16px_32px]`}>
                  <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#635FC7" /></svg>
                  + Create New Board
                </button>
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
              <button onClick={() => setShowAddTask(!showAddTask)} className={`p-[15px_24px] cursor-pointer bg-[#635FC7] rounded-[24px] ${H3} text-[#FFFFFF]`}>
                + Add New Task
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
      </header>
      <Outlet context={{ boards, setBoards, showSidebar, setShowStatus, showStatus, paramsBoard, showDetails, setShowDetails, showDotMenu, setShowDotMenu }} />
    </div>
  )
}
