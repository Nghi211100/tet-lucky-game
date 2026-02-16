'use client'

import { useEffect, useRef, useState } from 'react'
import { SpinWheel } from '../components/SpinWheel'
import ValueSelection from '../components/ValueSelection'
import Note from '../components/Note'
import ImagePreloader from '../components/ImagePreloader'

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
    <div className={`w-full py-4 sm:py-0 md:py-6 px-4 sm:px-6 md:px-8 relative z-0 ${openNote&&'h-screen overflow-hidden'}`}>
      <ImagePreloader />
      <h1 className='pt-1 sm:pt-6 md:pt-0 text-center text-3xl sm:text-4xl md:text-7xl font-black bg-cover bg-center text-transparent  bg-clip-text bg-radial from-yellow-300 to-orange-400 text-shadow-2xs leading-[1.19]'>Vòng Quay Lì Xì</h1>
      <div className='flex flex-col lg:flex-row space-y-6 mt-6 md:mt-16 justify-center items-center'>
      <div className='lg:w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning} /></div>
        <div className='lg:w-1/2 max-w-[280px] sm:max-w-[375px] md:max-w-[520px]'><ValueSelection items={items} setItems={setItem} spinning={spinning} /></div>
      </div>     
      <div className={`absolute top-4 sm:top-8 md:top-11 left-5 md:left-10 h-10 w-10 md:h-14 md:w-14 bg-cover overflow-hidden cursor-pointer z-999 ${muted ? 'bg-[url("/assets/unmuted.png")]' : 'bg-[url("/assets/muted.png")]'}`} onClick={()=>muteBg()}></div>
      <div className='absolute top-4 sm:top-8 md:top-11 right-5 md:right-10 h-10 w-10 md:h-14 md:w-14 bg-[url("/assets/note.png")] bg-cover cursor-pointer z-999' onClick={()=>setOpenNote(!openNote)}></div>
      
      <Note openNote={openNote} setOpenNote={setOpenNote} muteBg={()=>muteBg(true)}/>
      
    </div>
  )
}

export default LuckySpin