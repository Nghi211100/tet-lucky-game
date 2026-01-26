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

  const playBg = async () => {
      const audio = bgAudioRef.current
      if (!audio || !audio.paused) return

      try {
          audio.currentTime = 0
          await audio.play()
          setMuted(false)
      } catch (e) {
          console.log('BG audio blocked')
      }
  }

  const muteBg = async () => {
    const audio = bgAudioRef.current
    if (!audio || audio.paused) return

    try {
        audio.muted = !audio.muted
        setMuted(!muted)
    } catch (e) {
        console.log('BG audio blocked')
    }
}
  
  return (
    <div className={`w-full h-full md:flex justify-center items-center py-10 relative space-y-6 ${openNote&&'h-screen overflow-hidden'}`}>
      <div className='md:w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning} /></div>
      <div className='md:w-1/2'><ValueSelection setItems={setItem} spinning={spinning} /></div>
     
      <div className={`absolute top-10 left-10 h-6 w-6 md:h-10 md:w-10 bg-cover bg-white overflow-hidden rounded-full cursor-pointer z-999 ${ muted ? 'bg-[url("/assets/muted.png")]': 'bg-[url("/assets/unmuted.png")]'}`} onClick={()=>muteBg()}></div>
      <div className='absolute top-10 right-10 h-6 w-6 md:h-10 md:w-10 bg-[url("/assets/info.png")] bg-cover bg-amber-500 rounded-full cursor-pointer z-999' onClick={()=>setOpenNote(!openNote)}></div>
      
      <Note openNote={openNote} setOpenNote={setOpenNote} playBg={playBg}/>
      
    </div>
  )
}

export default LuckySpin