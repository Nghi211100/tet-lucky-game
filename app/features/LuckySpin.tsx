'use client'

import { useState } from 'react'
import { SpinWheel } from '../components/SpinWheel'
import ValueSelection from '../components/ValueSelection'
import Image from 'next/image'

export type IItemSpin = {
  value: string
  imageUrl: string
}

const LuckySpin = () => {
  
  const [spinning, setSpinning] = useState(false)
  const [start, setStart] = useState(true)
  const [items, setItem] = useState<IItemSpin[]>([]);

  return (
    <div className='w-full flex items-end justify-center py-32 px-16 relative'>
      <div className='w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning}/></div>
      <div className='w-1/2'><ValueSelection setItems={setItem} spinning={spinning}/></div>
        {start&&<div className='absolute inset-0 h-screen w-screen flex items-center justify-center' onClick={()=>setStart(false)}>
          <div className='w-1/2 h-[80vh] relative z-99'>
            <Image alt='banner' src={'/assets/phattai.jpg'} fill objectFit='contain'/>
          </div>
        </div>
      } 
    </div>
  )
}

export default LuckySpin