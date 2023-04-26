import Icon from './datalist';
import Image from 'next/image';

type socialType = {
    iconName: string,
    className?: string,
    width?:number,
    height?: number,
    style?: {},
    type?: 'white'|'black',
}

export default function SocialIcons({iconName, width, height, className, style, type}: socialType){ 
   if(!iconName) return (<></>);
   const getType:string  = type === "black" ? "/Black" :
                            type === "white" ? "/White" : "/Color"
    return (
      <Image src={require(`./SVG${getType}/${Icon(iconName, type)}`)} alt={iconName} width={width||24} height={height||24} className={className} style={style}/> 
    )
}
