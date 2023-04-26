import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./activeLink";
import { motion } from "framer-motion";
const Links = {
    default: [
      { logo: "dashboard.svg", title: "Dashboard", href: "/dashboard"},
      { logo: "edit.svg", title: "Item 1", href: "#"},
      { logo: "group.svg", title: "Item 2", href:"#"},
      { logo: "hourglass_empty.svg", title: "Item 3", href:"#"},
    ],
   others1: [
      {logo: "add_a_photo.svg", title :"Item 4", href:"#"},
      {logo: "delete.svg", title :"Item 5", href: "#"},
    ],
    other2: [
      {logo: "subscriptions.svg", title :"Item 6", href:"#"},
      {logo: "file_present.svg", title :"Item 7", href:"#"},
      {logo: "alarm.svg", title :"Item 8", href: "#"},
    ]
}

export default function SideBar() {
  return (
    <>
      <main className="fixed left-0 hidden lg:block top-0 min-w-[304px] overflow-y-scroll h-[100vh] border-r-[1px] border-[#EFF1F6]">
         <div className="h-[120px] flex items-center ml-8">
           <Image alt={"sidebar icon"} src={"mainstack-logo.svg"} width={50} height={20 } />
         </div>

         <motion.ul
          initial={{opacity: 0}}
          animate={{ opacity: 1 }}
          transition={{ delay: .5 }}className="">
          <>
             { 
               Links.default.map(({logo, title, href}: {logo: string, title: string, href: string}, i:number) => (
                   <ActiveLink href={href} logo={logo} key={i.toString()}> {title}</ActiveLink>
                ))
             }
           </>

          <> 
            <div className="mt-8 ml-8 mb-4 text-[#4D5760]">OTHERS 1</div>

             { 
               Links.others1.map(({logo, title, href}: {logo: string, title: string, href: string}, i: number) => (
                   <ActiveLink href={href} logo={logo} key={i.toString()}> {title}</ActiveLink>
                ))
             }
           </>

           
          <> 
            <div className="mt-8 ml-8 mb-4 text-[#4D5760]">OTHERS 2</div>
             { 
               Links.other2.map(({logo, title, href}: {logo: string, title: string, href: string}, i:number) => (
                   <ActiveLink href={href} logo={logo} key={i.toString()}>{title}</ActiveLink>
                ))
             }
           </>


           <>
              <div className="flex justify-around items-center mt-20">
                <div className="flex items-center">
                  <Image src={"/profile.jpg"} 
                         alt={"Blessings Daniels"}
                         className="w-[30px] h-[30px] mr-2"
                         style={{borderRadius: "50%"}}
                         width={30} height={30} />
                  <span className="text-[15px]"> Blessings Daniels </span>
                </div>

                <div style={{cursor: "pointer"}} className="w-[20px] h-[20px] bg-[#fdfdfd] rounded-full flex justify-center items-center">
                   <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M1.37496 1.83341C1.15274 1.83341 0.958293 1.75341 0.791626 1.59341C0.624959 1.43397 0.541626 1.23619 0.541626 1.00008C0.541626 0.76397 0.624959 0.565914 0.791626 0.405914C0.958293 0.24647 1.15274 0.166748 1.37496 0.166748C1.61107 0.166748 1.80885 0.24647 1.96829 0.405914C2.12829 0.565914 2.20829 0.76397 2.20829 1.00008C2.20829 1.23619 2.12829 1.43397 1.96829 1.59341C1.80885 1.75341 1.61107 1.83341 1.37496 1.83341ZM5.99996 1.83341C5.76385 1.83341 5.56607 1.75341 5.40663 1.59341C5.24663 1.43397 5.16663 1.23619 5.16663 1.00008C5.16663 0.76397 5.24663 0.565914 5.40663 0.405914C5.56607 0.24647 5.76385 0.166748 5.99996 0.166748C6.23607 0.166748 6.43413 0.24647 6.59413 0.405914C6.75357 0.565914 6.83329 0.76397 6.83329 1.00008C6.83329 1.23619 6.75357 1.43397 6.59413 1.59341C6.43413 1.75341 6.23607 1.83341 5.99996 1.83341ZM10.625 1.83341C10.3888 1.83341 10.1908 1.75341 10.0308 1.59341C9.87135 1.43397 9.79163 1.23619 9.79163 1.00008C9.79163 0.76397 9.87135 0.565914 10.0308 0.405914C10.1908 0.24647 10.3888 0.166748 10.625 0.166748C10.8472 0.166748 11.0416 0.24647 11.2083 0.405914C11.375 0.565914 11.4583 0.76397 11.4583 1.00008C11.4583 1.23619 11.375 1.43397 11.2083 1.59341C11.0416 1.75341 10.8472 1.83341 10.625 1.83341Z" fill="#4D5760"/>
                   </svg>
                </div>
              </div>
           </>
      </motion.ul>
      </main>
    </>
  )
}
