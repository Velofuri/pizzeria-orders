import { AuthProvider } from '@/contexts/AuthContext'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position='top-center' autoClose={3000} theme='dark' />
    </AuthProvider>
  )
}
