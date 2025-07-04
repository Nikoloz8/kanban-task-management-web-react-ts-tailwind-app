export default function tailwind() {

    const H1 = "text-[2.4rem] font-[700] text-[#000112] leading-[100%]"
    const H2 = "text-[1.8rem] font-[700] text-[#000112] leading-[100%]"
    const H3 = "text-[1.5rem] font-[700] text-[#000112] leading-[100%]"
    const H4 = "text-[1.2rem] font-[700] text-[#828FA3] leading-[100%] tracking-[2.4px]"
    const P1 = "text-[1.3rem] font-[500] text-[#2B2C37] leading-[23px]"
    const P2 = "text-[1.2rem] font-[700] text-[#2B2C37] leading-[100%]"
    const inputStyle = `w-[100%] border-[1px] border-solid border-[rgba(130,143,163,0.25)] rounded-[4px] p-[8px_16px] outline-none ${P1} placeholder:text-[rgba(255,255,255,0.25)] text-[#FFFFFF] focus:border-[#635FC7]`

    return { H1, H2, H3, H4, P1, P2, inputStyle }
}
