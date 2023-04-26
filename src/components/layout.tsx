// components/layout.js

import { ReactElement } from 'react'
import SideBar from './sidebar'
import Head from 'next/head'

type LayoutType = {children: ReactElement}

export default function Layout({ children }:  LayoutType) {
  return (
    <> 
      <Head>
          <title>Dashboard | Mainstack</title>
         <link rel="shortcut icon" href="mainstack-logo.svg" type="image/x-icon" />
      </Head>
      <main className='flex min-w-[100vw] min-h-[100vh]'>
        <SideBar />
        <main>{children}</main>
     </main>
    </>
  )
}
