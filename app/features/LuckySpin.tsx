'use client'

import { useState } from 'react'
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

  
  return (
    <div className={`w-full h-full md:flex justify-center items-center py-10 relative space-y-6 ${openNote&&'h-screen overflow-hidden'}`}>
      <div className='md:w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning} /></div>
      <div className='md:w-1/2'><ValueSelection setItems={setItem} spinning={spinning} /></div>
     
      <div className='absolute top-10 right-10 h-6 w-6 bg-[url("/assets/info.png")] bg-cover bg-amber-500 rounded-full cursor-pointer z-999' onClick={()=>setOpenNote(!openNote)}></div>
      <Note openNote={openNote} setOpenNote={setOpenNote}/>
      
    </div>
  )
}

export default LuckySpin