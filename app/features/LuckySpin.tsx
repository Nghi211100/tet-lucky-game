'use client'

import { useEffect, useRef, useState } from 'react'
import { SpinWheel } from '../components/SpinWheel'
import ValueSelection from '../components/ValueSelection'
import Note from '../components/Note'

export type IItemSpin = {
  value: string
  imageUrl: string
}

const LuckySpin = () => {
  const [spinning, setSpinning] = useState(false)
  const [openNote, setOpenNote] = useState(true)
  const [items, setItem] = useState<IItemSpin[]>([]);
  
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  

  useEffect(() => {
      bgAudioRef.current = new Audio('/audio/background.m4a')
      bgAudioRef.current.loop = true
      bgAudioRef.current.volume = 1
  }, [])

  const muteBg = async (first?: boolean) => {
    const audio = bgAudioRef.current
    if (!audio) return
    try {
      if(!first)
      {
        audio.muted = !muted
        setMuted(!muted)
      } else if(audio.paused) {
        await audio.play(); 
        setMuted(!muted)
      }
    } catch (e) {
        console.log('BG audio blocked')
    }
}
  
  return (
    <div className={`w-full h-[-webkit-fill-available] py-4 md:py-10 px-4 md:px-8 relative z-0 ${openNote&&'h-screen overflow-hidden'}`}>
      <h1 className='text-center text-3xl md:text-7xl font-black bg-cover bg-center text-transparent bg-clip-text bg-[url("/assets/result.jpg")]'>Vòng Quay Lì Xì</h1>
      <div className='lg:flex space-y-6 mt-16 justify-center items-center'>
      <div className='lg:w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning} /></div>
      <div className='lg:w-1/2'><ValueSelection items={items} setItems={setItem} spinning={spinning} /></div>
      </div>     
      <div className={`absolute top-5.5 md:top-10 left-10 h-6 w-6 md:h-10 md:w-10 bg-cover bg-white overflow-hidden rounded-full cursor-pointer z-999 ${ muted ? 'bg-[url("/assets/muted.png")]': 'bg-[url("/assets/unmuted.png")]'}`} onClick={()=>muteBg()}></div>
      <div className='absolute top-5.5 md:top-10 right-10 h-6 w-6 md:h-10 md:w-10 bg-[url("/assets/info.png")] bg-cover bg-amber-500 rounded-full cursor-pointer z-999' onClick={()=>setOpenNote(!openNote)}></div>
      
      <Note openNote={openNote} setOpenNote={setOpenNote} muteBg={()=>muteBg(true)}/>
      
    </div>
  )
}

export default LuckySpin