import Link from 'next/link';
import { useRouter } from 'next/router'

type activeLinkType = {
    children: any,
    href: string,
    logo: string
}

function ActiveLink({ children, href, logo }: activeLinkType) {
  const router = useRouter();
  const style = router.asPath.includes(href);

  return (
     <>
        <div style={{borderRadius: "1.8px"}} className={`w-full font-bold flex items-center p-2 mb-4 
             ${style ? "text-[#FF5403] font-bold border-l-4  border-[#FF5403]" : "text-[#56616B]" }`}>
            <img alt={children} className='ml-8 mr-4' src={logo} width={18} height={20} />
           <Link href={href} className='text-[16px]'>{children}</Link>
        </div>
    </>
  )
}

export default ActiveLink

