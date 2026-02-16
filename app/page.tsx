'use client'

import dynamic from 'next/dynamic'
import LuckySpin from './features/LuckySpin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const InstallPrompt = dynamic(() => import('./components/installPrompt'), { ssr: false })

export default function Home() {
  return (
    <div className="flex max-w-[100vw] overflow-x-hidden overscroll-x-none min-h-screen bg-[url('/assets/background.png')] md:bg-[url('/assets/background.jpg')] bg-cover bg-bottom bg-fixed pb-6"> 
        <InstallPrompt />
        <LuckySpin />
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
    </div>
  );
}
