import Chart from "./chart";
import Greeting from "./greeting";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TopChart from "./topChart";



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
      <main className="fixed right-0 top-0 flex flex-col items-center h-[100vh]" style={{width: "calc(100vw - 304px)"}}>
        <div className="w-full p-5 pl-0 opacity-90 backdrop-blur-2xl bg-white">
           <div className="font-bold text-[20px] ml-[3rem]">Dashboard</div>
        </div> 
        
        <div className="w-full h-[100vh] pb-9 pl-[3rem] pr-[3rem] overflow-y-scroll">
           <Greeting />
           { 
               data ?  <Chart data={data} /> : "loading.."

           }

           { 
               data ?  <TopChart res={data} /> : "loading.."

           }
        </div>
      </main>
    </>
  )
}

