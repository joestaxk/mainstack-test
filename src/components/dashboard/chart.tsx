import Link from "next/link";
import  {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler} from "chart.js";
import  { Line } from "react-chartjs-2"
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { resultType } from ".";
import { motion } from "framer-motion"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);


const btnsIds = [
    {text: "1 Day", scope: "1day"},
    {text: "2 Days", scope: "2days"},
    {text: "7 Days", scope: "7days"},
    {text: "30 Days", scope: "30days"},
    {text: "All Time", scope: "allTime"},
    {text: "Custom Date", scope: "custom"}
]

type initialStateType = {
   labels: string[],
   data: string[]
}

let initialState = {
   labels: [],
   data: []
} as initialStateType


type reducerKey = "1day"|"2days"|"7days"|"30days"|"allTime"|"payload";
function reducer(state: initialStateType, action: {type: reducerKey, payload: any}) {
    if(!action.type) return;
   const snip = (cutD:number, which:any) => {
      return which.length < cutD ? which : which.slice(which.length - cutD)
   }
   switch (action.type) {
      case "1day":
         return {labels: snip(1, action.payload.labels), data: snip(1, action.payload.data)} 
      case "2days":
         return  {labels: snip(2, action.payload.labels), data: snip(2, action.payload.data)} 
      case "7days": 
         return {labels: snip(7, action.payload.labels), data: snip(7, action.payload.data)}
      case "30days": 
         return {labels: snip(30, action.payload.labels), data: snip(30, action.payload.data)}
      case "allTime":
         return {labels: action.payload.labels, data: action.payload.data}
      case "payload": 
         return {labels: action.payload.labels, data: action.payload.data};
   }
}

export default function Chart({data}: {data: resultType}) {
  const [chart, setChart] = useState(false) 
  const [graph, setGraph] = useState({} as initialStateType)
  const [config, setConfig] = useState({
      options: {},
      data: {} as any
  })
  const [state, dispatch]:any = useReducer<any>(reducer, initialState)
  const [realTimeCount, setRealTimeCount] = useState(0);
  const [showChart, setShowChart] = useState(false)
  const router = useRouter();

  useEffect(() => {
     setGraph((prev) => data.graph_data?.views);
     setChart(true)
  }, [data])

  useEffect(() => {
      const compute = convertDate(graph);
      if(!compute.data.length) return
      dispatch({type: "payload", payload: compute})
      dispatch({type: router.query.views, payload: compute});
  }, [graph])

  useEffect(() => {
      router.query.views ?? router.replace("dashboard?views=allTime");
      const compute = convertDate(graph);
      if(!compute.data.length) return;
     dispatch({type: router.query.views, payload: compute});
  }, [router.query.views])

  useEffect(() => {
      if(!state) return;
       const chartConfig = { 
          data: {
            labels: state.labels,
            datasets: [
               {
                  label: "",
                  data: state.data,
                  borderColor: ['#FF5403'],
                  borderWidth: '1',
                  backgroundColor: (context:any) => {
                      const bgColor =  ['rgba(255, 84, 3, 0.2)','rgba(255, 84, 3, 0)'] 
                      if(!context.chart.chartArea) {
                          return;
                      }

                      const {ctx, data, chartArea: {top, bottom}} = context.chart;
                      const gradientBg = ctx.createLinearGradient(0,top,0,bottom);
                      gradientBg.addColorStop(0, bgColor[0])
                      gradientBg.addColorStop(1, bgColor[1])
                      return gradientBg
                  },
                  fill: true,
                  tension: 0,
                  pointStyle: false
               }
           ]
        },
        options: {
           responsive: true,
           plugins: {
               legend: {
                   display: false
                }
           },
           scales: {
               x: { 
                   grid: {display: false}
               },
               y: {
                   border: { 
                       dash: [4]
                   },
                  ticks: {
                    // forces step size to be 50 units
                     stepSize: 20
                  }
              }
          }
        }
    }

     setConfig((prev) => prev = chartConfig)

  }, [state])

  useEffect(() => {
      if(!Object.keys(config.data).length) return;
       const totalViews:string[] = config.data.datasets[0].data;
       setRealTimeCount((prev:any) => prev = totalViews.reduce((cur:any,acc:any) => cur + acc,0))
       setShowChart(true)
  }, [config])

  return (
    <>
      <motion.main 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      className="flex flex-col justify-center min-w-[100%]">
        <div className="flex gap-4 p-2 mt-4 mb-4 w-full overflow-x-scroll">
           {
               btnsIds.map(({text, scope}, i) => (
                 <CustomChartButton key={i.toString()} scope={scope}>{text}</CustomChartButton>
               ))
           }
        </div>

        <div className="w-full w-[100%]  min-h-[50vh] rounded-xl border-[1px] border-[#EFF1F6] p-5">
            <div className="flex justify-between items-center mb-3">
                <div className="">
                   <h2 className="font-bold">Page Views</h2>
                    <p className="text-[14px]">All time</p>
                </div>

                <div style={{cursor: "pointer"}}>
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.58333 11.75H8.41667V7.16667H7.58333V11.75ZM8 5.97917C8.13889 5.97917 8.26056 5.93056 8.365 5.83333C8.46889 5.73611 8.52083 5.61111 8.52083 5.45833C8.52083 5.31944 8.46889 5.20139 8.365 5.10417C8.26056 5.00694 8.13889 4.95833 8 4.95833C7.86111 4.95833 7.73944 5.00694 7.635 5.10417C7.53111 5.20139 7.47917 5.31944 7.47917 5.45833C7.47917 5.61111 7.53111 5.73611 7.635 5.83333C7.73944 5.93056 7.86111 5.97917 8 5.97917ZM8 15.5C6.95833 15.5 5.97917 15.3056 5.0625 14.9167C4.14583 14.5278 3.35083 13.9967 2.6775 13.3233C2.00361 12.6494 1.47222 11.8542 1.08333 10.9375C0.694444 10.0208 0.5 9.04167 0.5 8C0.5 6.95833 0.694444 5.97917 1.08333 5.0625C1.47222 4.14583 2.00361 3.35056 2.6775 2.67667C3.35083 2.00333 4.14583 1.47222 5.0625 1.08333C5.97917 0.694444 6.95833 0.5 8 0.5C9.04167 0.5 10.0208 0.694444 10.9375 1.08333C11.8542 1.47222 12.6494 2.00333 13.3233 2.67667C13.9967 3.35056 14.5278 4.14583 14.9167 5.0625C15.3056 5.97917 15.5 6.95833 15.5 8C15.5 9.04167 15.3056 10.0208 14.9167 10.9375C14.5278 11.8542 13.9967 12.6494 13.3233 13.3233C12.6494 13.9967 11.8542 14.5278 10.9375 14.9167C10.0208 15.3056 9.04167 15.5 8 15.5ZM8 14.6667C9.84722 14.6667 11.4203 14.0175 12.7192 12.7192C14.0175 11.4203 14.6667 9.84722 14.6667 8C14.6667 6.15278 14.0175 4.57972 12.7192 3.28083C11.4203 1.9825 9.84722 1.33333 8 1.33333C6.15278 1.33333 4.58 1.9825 3.28167 3.28083C1.98278 4.57972 1.33333 6.15278 1.33333 8C1.33333 9.84722 1.98278 11.4203 3.28167 12.7192C4.58 14.0175 6.15278 14.6667 8 14.6667Z" fill="#31373D"/>
                   </svg>
                </div>
            </div>

            <h1 className="font-bold text-[3rem]">{realTimeCount}</h1>
            <div className="w-[100%]  min-h-auto xl:h-[400px]">
              {showChart&&<Line options={config.options} data={config.data} />}
            </div>
        </div>
      </motion.main>
    </>
  )
}


function CustomChartButton({children, scope}: {children: any, scope: string}) { 
    const router = useRouter();
    const activeTab = router.query?.views === scope.split("=")[0];
    return (
     <>
        <Link 
        className={`min-w-fit p-3 border-[1px] border-[#EFF1F6] text-[14px] text-[#31373D] font-[500] rounded-full 
        ${activeTab ? "text-[#FF5403] bg-[#FFEEE5] border-[#FF5403]" : ""} transition-all`} 
        href={`?views=${scope}`}>
          {children}
        </Link>
     </>
    )
}


function convertDate(graphdata: any): initialStateType{
      const data:string[] = Object.values(graphdata)
      const labels = Object.keys(graphdata).map((el:string) => {
          // convert date 
          const date = new Date(el);
          return new Intl.DateTimeFormat("en-GB", {month: "short", day: "numeric"}).format(date);
      })

      return {data, labels}
}
