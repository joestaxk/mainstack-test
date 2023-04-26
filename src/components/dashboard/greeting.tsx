import Link from "next/link";
import SocialIcons from "../socialib/react-socials";

export default function Greeting() {
  return (
    <>
      <main className="flex justify-between items-center min-w-[100%]  p-4 pl-0">
        <div className="">
           <h2 className="font-bold text-[24px] mb-2 text-[#131316]">Good morning, Blessing ⛅️</h2>
           <p className="text-[#31373D]">Check out your dashboard summary.</p>
        </div>


        <div className="">
           <Link href={"#Analytics"} className="text-[#FF5402] text-[13px]">
             View Analytics
           </Link>
        </div>
      </main>
    </>
  )
}
