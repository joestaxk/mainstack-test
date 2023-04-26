import Chart from "./chart";
import Greeting from "./greeting";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TopChart from "./topChart";
import Image from "next/image";



export type resultType = { 
    graph_data: any,
    top_locations: any[]
    top_sources: any[]
}
// Swr cache data on cdn and also revelidate 
const fetcher:(arg0:any) => any = (...args) => fetch(...args).then((res) => res.json())
export default function DashBoard() {
  const { data, error } = useSWR('https://fe-task-api.mainstack.io/', fetcher)
  return (
    <>
      <main id="Dashboard" className="fixed right-0 top-0 flex flex-col items-center h-[100vh]" style={{width: "calc(100vw - 304px)"}}>
        <div className="flex items-center lg:block w-full p-3 pl-0 backdrop-blur-2xl bg-white">
            <div className="flex items-center ml-3 lg:hidden">
               <Image alt={"sidebar icon"} src={"mainstack-logo.svg"} width={50} height={20 } />
            </div>
           <div className="dashboard-text font-bold text-[20px] lg:ml-[3rem] ml-[2rem]">Dashboard</div>
        </div> 
        
        <div className="dashboard-chart w-full h-[100vh] pb-9 pl-[3rem] pr-[3rem] overflow-y-scroll flex flex-col">
           <Greeting />
           {  
               data ?  <Chart data={data} /> : <h4>Loading...</h4>

           }

           { 
               data ?  <TopChart res={data} /> : ""

           }
        </div>
      </main>
    </>
  )
}

