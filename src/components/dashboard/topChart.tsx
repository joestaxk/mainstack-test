import Link from "next/link";
import { resultType } from ".";
import  useSWR from "swr";
import Flag from "react-world-flags"
import { useCallback, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SocialIcons from "../socialib/react-socials";

ChartJS.register(ArcElement, Tooltip);

const populateTopChartData:any = [
    {
      id: "top_locations",
      title: "Top Location",
      linktext: "View full reports",
      link: "#toplocation"
    },

    {
       id: "top_sources",
       title: "Top Referral source",
       linktext: "View full reports",
       link: "#topReferral"
     }
]

const fetcher:(arg0:any) => any = (...args) => fetch(...args).then((res) => res.json())
export default function TopChart({res}: {res: resultType}) {
    const {data, error} = useSWR("https://countriesnow.space/api/v0.1/countries/codes", fetcher)
    const [countries, setCode] = useState({} as any)
     
    useEffect(() => {
        if(!data && !res.top_locations) return;
           console.log(data, error)
          for(let i = 0; i < data?.data.length; ++i){
             setCode((prev:any) => {return {...prev, [data.data[i].name.toLowerCase()]: data.data[i].code}})
          }
    }, [res, data])

    return (
       <main className="mt-8 flex flex-wrap justify-between">
        {
           populateTopChartData.map(({id, title, linktext, link}: any, i:number) => (
             <div key={i.toString()} className="w-[49%] border-[1px] rounded-xl border-[#EFF1F6]"> 
                 <div className="flex justify-between items-center min-w-[100%]  p-4">
                      <h2>{title}</h2>
                      <div className="">
                         <Link href={link} className="text-[#FF5402] text-[13px]">
                           {linktext}
                        </Link>
                      </div>
                 </div>
                 { 
                     id === "top_locations"  ? 
                     <TopLocation locationdata={res.top_locations} flag={countries}/> : 
                     <TopReferral referraldata={res.top_sources}/>
                 }
             </div>
          ))
        }
       </main>
    )
}




function TopLocation({locationdata, flag}: {locationdata: {country: string, count: number, percent: number}[], flag:any}){
    const colorConst = ["#599EEA", "#844FF6", "#0FB77A", "#FAB70A", "#F09468"]
    function handleSortingList(){
        // sort countries by 
        const limit = 4;
        let getCountries:any[];
        let getOthers:any;
        let getCounts:any;

        if(locationdata.length <= 4){
            getCountries = locationdata;
            getCounts = locationdata.map(({count}) => count).reduce((acc,cur) => acc+cur);
        }else {
            getCountries = locationdata.slice(0, 4);
            getOthers = locationdata.slice(4).map(({percent}) => percent).reduce((acc,cur) => acc+cur);
            getCounts = locationdata.slice(4).map(({count}) => count).reduce((acc,cur) => acc+cur);

        }        
         
        const data:any[] = getCountries.map(({country, count, percent}, i) => {
            return {
                country,
                color: colorConst[i],
                percent,
                count,
                flagId: flag[country.toLowerCase()]
            }
        })

        if(locationdata.length > limit) {
          data.push({
              country: "Others",
              color: colorConst[colorConst.length-1],
              percent: getOthers,
              count: getCounts,
          })
        }

        return data
    }

    const memoized = useCallback( handleSortingList, [locationdata, flag])
    const data = {
       labels: memoized().map(({country}) => country),
       datasets: [
        {
            label: 'Count',
            data: memoized().map(({count}) => count),
            backgroundColor: colorConst,
            borderColor: colorConst,
             borderWidth: 1,
        },
       ],
     };

     const options =  {
       responsive: true,
     }
 

    return (
       <>
          <main className="flex justify-around items-center">
             <ul className="w-[50%] p-4">
               {
                   memoized().map(({country, percent, color, count, flagId}, i) => (
                      <li key={i.toString()} className="flex  mb-3 text-[#131316]">
                         { !flagId ? 
                           <div className="w-[24] mr-[1.5rem]"></div> :
                           <Flag code={flagId}  width={24} className={'rounded-[10px]'}/>
                         }
                         <div className="mx-3 font-[100] text-[16px]">{country}</div>
                         <div className="mr-2 font-[500]">{percent}%</div>
                         <div className={`w-[12px] h-[12px] mt-2 rounded-full`} style={{background: color}}></div>
                      </li>
                   ))
               }
             </ul>

             <div className="w-[40%]">
                <Doughnut data={data} options={options} width={50} height={50} />
             </div>
          </main>
       </>
    )
}

function TopReferral({referraldata}: {referraldata: {source: string, count: number, percent: number}[]}){
    const [sources, setSource] = useState([] as any[]);

    const colorConst = ["#599EEA", "#844FF6", "#0FB77A", "#FAB70A", "#F09468"]
    function handleSortingList(){
        // sort countries by
        const limit = 4;
        let getSource:any[];
        let getOthers:any;
        let getCounts:any;

        if(referraldata.length <= 4){
            getSource = referraldata;
            getCounts = referraldata.map(({count}) => count).reduce((acc,cur) => acc+cur);
        }else {
            getSource = referraldata.slice(0, 4);
            getOthers = referraldata.slice(4).map(({percent}) => percent).reduce((acc,cur) => acc+cur);
            getCounts = referraldata.slice(4).map(({count}) => count).reduce((acc,cur) => acc+cur);

        }
        const data:any[] = getSource.map(({source, count, percent}, i) => {
            return {
                source,
                color: colorConst[i],
                percent,
                count,
            }
        })
        
        if(referraldata.length > 4) {
            data.push({
               source: "Others",
               color: colorConst[colorConst.length-1],
               percent: getOthers,
               count: getCounts,
            })
        }

        return data
    }

    const memoized = useCallback( handleSortingList, [referraldata])
    const data = {
       labels: memoized().map(({source}) => source),
       datasets: [
        {
            label: 'Count',
            data: memoized().map(({count}) => count),
            backgroundColor: colorConst,
            borderColor: colorConst,
            borderWidth: 1,
        },
       ],
     };

     const options =  {
       responsive: true,
     }
    return (
       <>
          <main className="flex justify-around items-center">
             <ul className="w-[50%] p-4">
               {
                   memoized().map(({source, percent, color, count}, i) => (
                      <li key={i.toString()} className="flex  mb-3 text-[#131316]">
                         {
                             source == "Others"?
                             <div className="w-[24] mr-[1.5rem]"></div> :
                             <SocialIcons iconName={source} />
                         }
                         <div className="mx-3 font-[100] capitalize text-[16px]">{source}</div>
                         <div className="mr-2 font-[500]">{percent}%</div>
                         <div className={`w-[12px] h-[12px] mt-2 rounded-full`} style={{background: color}}></div>
                      </li>
                   ))
               }
             </ul>

             <div className="w-[40%]">
                <Doughnut data={data} options={options} width={50} height={50} />
             </div>
          </main>
       </>
    )
}


