import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/context/cartContextProvider';
import { Toaster } from 'react-hot-toast';

export default function App({ Component,pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      <Layout>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </Layout>
    </SessionProvider>
  )
}
