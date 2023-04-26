import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import localFont from "next/font/local"

const sohne = localFont({
    src: [
      {
       path: '../../public/sohnefont/test-soehne-buch.woff2',
        weight: '400'
      },
      {
       path: '../../public/sohnefont/test-soehne-kraftig.woff2',
        weight: '500'
      },
      {
        path: '../../public/sohnefont/test-soehne-dreiviertelfett.woff2',
        weight: '700'
      }


    ],
    variable: '--font-sohne'
})
export default function App({ Component, pageProps }: AppProps) {
  return (
  <main className={`${sohne.variable} font-sans`}>
   <Layout>
     <Component {...pageProps} />
  </Layout>
  </main>
  )
}
