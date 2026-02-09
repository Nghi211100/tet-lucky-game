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
      <h1 className='pt-6 text-center text-3xl md:text-7xl font-black bg-cover bg-center text-transparent  bg-clip-text bg-radial from-yellow-300 to-orange-400 text-shadow-2xs leading-[1.19]'>Vòng Quay Lì Xì</h1>
      <div className='lg:flex space-y-6 mt-6 md:mt-16 justify-center items-center'>
      <div className='lg:w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning} /></div>
      <div className='lg:w-1/2'><ValueSelection items={items} setItems={setItem} spinning={spinning} /></div>
      </div>     
      <div className={`absolute top-10 md:top-10 left-5 md:left-10 h-10 w-10 md:h-14 md:w-14 bg-cover overflow-hidden cursor-pointer z-999 ${muted ? 'bg-[url("/assets/sound.svg")]' : 'bg-[url("/assets/sound.svg")]'}`} onClick={()=>muteBg()}></div>
      <div className='absolute top-10 md:top-10 right-5 md:right-10 h-10 w-10 md:h-14 md:w-14 bg-[url("/assets/note.svg")] bg-cover cursor-pointer z-999' onClick={()=>setOpenNote(!openNote)}></div>
      
      <Note openNote={openNote} setOpenNote={setOpenNote} muteBg={()=>muteBg(true)}/>
      
    </div>
  )
}

export default LuckySpin