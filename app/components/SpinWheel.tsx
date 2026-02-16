'use client'

import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { IItemSpin } from '../features/LuckySpin'
import { shuffleAvoidAdjacent } from '../help'
import Wheel from './Wheel'
import { toast } from 'react-toastify'

const Fireworks = dynamic(() => import('./Fireworks'), { ssr: false })

export function SpinWheel({
  items,
  spinning,
  setSpinning,
}: {
  items: IItemSpin[]
  spinning: boolean
  setSpinning: Dispatch<SetStateAction<boolean>>
}) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const wheelRefMobile = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0);

  const [showFireworks, setShowFireworks] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [isOpenResult, setIsOpenResult] = useState(false)
  const [result, setResult] = useState<IItemSpin | null>(null)
  const [wishMessage, setWishMessage] = useState('')
  const [shuffleItems, setShuffleItems] = useState<IItemSpin[]>(() =>
    shuffleAvoidAdjacent(items)
  )

  // ---------- AUDIO (iOS SAFE) ----------
  const cry = useRef<HTMLAudioElement | null>(null)
  const baddest = useRef<HTMLAudioElement | null>(null)
  const bad = useRef<HTMLAudioElement | null>(null)
  const fine = useRef<HTMLAudioElement | null>(null)
  const good = useRef<HTMLAudioElement | null>(null)
  const well = useRef<HTMLAudioElement | null>(null)
  const surprise = useRef<HTMLAudioElement | null>(null)

  const audioUnlocked = useRef(false)

  const unlockAudio = () => {
    if (audioUnlocked.current) return

    const create = (src: string) => {
      const a = new Audio(src)
      a.volume = 1
      a.setAttribute('playsinline', 'true')
      a.currentTime = 0
      a.muted = true
      return a
    }

    cry.current = create('/audio/5k.m4a')
    baddest.current = create('/audio/10k.m4a')
    bad.current = create('/audio/20k.m4a')
    fine.current = create('/audio/50k.m4a')
    good.current = create('/audio/100k.m4a')
    well.current = create('/audio/200k.m4a')
    surprise.current = create('/audio/500k.m4a')

    const all = [baddest, bad, fine, good, well, surprise, cry]

    // silent warm-up (required for iOS)
    all.forEach(ref => {
      if (ref.current) {
        ref.current.volume = 0
        ref.current
          .play()
          .then(() => {
            ref.current?.pause()
            if (ref.current) {
              ref.current.currentTime = 0
              ref.current.muted = true
              ref.current.volume = 1
            }
          })
          .catch(() => {})
      }
    })

    audioUnlocked.current = true
  }

  const playResultSound = (value: number) => {
    const play = (ref: React.RefObject<HTMLAudioElement>) => {
      if (!ref.current) return
      ref.current.muted = false
      ref.current.pause()
      ref.current.currentTime = 0
      ref.current.play().catch(() => {})
    }

    if (value === 5) play(cry as React.RefObject<HTMLAudioElement>)
    if (value === 10) play(baddest as React.RefObject<HTMLAudioElement>)
    if (value === 20) play(bad as React.RefObject<HTMLAudioElement>)
    if (value === 50) play(fine as React.RefObject<HTMLAudioElement>)
    if (value === 100) play(good as React.RefObject<HTMLAudioElement>)
    if (value === 200) play(well as React.RefObject<HTMLAudioElement>)
    if (value === 500) play(surprise as React.RefObject<HTMLAudioElement>)
  }

  // ---------- EFFECTS ----------

  useEffect(() => {
    if (result) {
      playResultSound(Number(result.value))
    }
  }, [result])

  useEffect(() => {
    setShuffleItems(shuffleAvoidAdjacent(items))
  }, [items])

  // ---------- LOGIC ----------

  function hasAtLeastThreeDifferentValues(items: IItemSpin[]): boolean {
    const uniqueValues = new Set(items.map(item => item.value))
    return uniqueValues.size >= 3
  }

  const spin = () => {
    unlockAudio() // 🔑 IMPORTANT

    if (spinning) return
    setSpinning(true)

    const index = Math.floor(Math.random() * items.length)
    
    const sliceAngle = 360 / items.length

    const current = currentRotation % 360
    const targetSliceAngle = index * sliceAngle + sliceAngle

    const rotateTo =
      currentRotation +
      360 * 5 +
      (360 - targetSliceAngle - current) + (180 * (100 * 1/items.length)/100)
    
    const applyTransform = (ref: React.RefObject<HTMLDivElement>) => {
      if (!ref.current) return
      ref.current.style.transition =
        'transform 5.5s cubic-bezier(0.08, 0.82, 0.17, 1)'
      ref.current.style.transform = `rotate(${rotateTo}deg)`
    }

    applyTransform(wheelRef as React.RefObject<HTMLDivElement>)
    applyTransform(wheelRefMobile as React.RefObject<HTMLDivElement>)

    setCurrentRotation(rotateTo)

    if (navigator.vibrate) navigator.vibrate([30, 20, 30])

    setTimeout(() => {
      const wishes = [
        'Xuân sang phú quý gõ cửa,<br /> Tiền vô lũ lượt, buồn bã xin thưa.',
        'Năm mới chúc bạn phát tài,<br /> Ăn không tăng ký, tiền dài thêm ra.',
        'Mai vàng trước ngõ đơm hoa,<br /> Lộc bay tứ phía, việc nhà nhẹ tênh.',
        'Tết về pháo nổ tưng bừng,<br /> Lương tăng đều đặn, tình đừng giảm đi.',
        'Đầu năm ví mỏng tí ti,<br /> Cuối năm dày cộm, cười khì khì vui.',
        'Xuân này chúc bạn thảnh thơi,<br /> Deadline né hết, tiền rơi trúng nhà.'
      ]
      
      const newResult = shuffleItems[index]
      const randomWish = wishes[Math.floor(Math.random() * wishes.length)]
      setResult(newResult)
      setWishMessage(randomWish)
      setIsOpenResult(true)

      setFadeOut(false)
      setShowFireworks(true)

      setTimeout(() => setFadeOut(true), 3000)
      setTimeout(() => {setShowFireworks(false); setSpinning(false)}, 3800)
    }, 6000)
  }

  // ---------- UI ----------

  useEffect(() => {
    // Set initial size
    const updateSize = () => {
      if (typeof window !== 'undefined') {
        setSize(window.innerWidth)
      }
    }
    
    // Set initial size
    updateSize()
    
    // Handle window resize
    window.addEventListener('resize', updateSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  // Log size when it changes (inside useEffect to see actual updates)
  useEffect(() => {
    console.log('Size updated:', size)
  })
  
  
  const sliceColors = useMemo(() => {
    // Alternating light yellow/cream and light pink/peach colors
    const color1 = '#FFD7D7' // light yellow/cream
    const color2 = '#FFF5CD' // light pink/peach
    const color3 = '#FFFAEE' // light skin color
    const colors = [color1, color2, color3]
    
    if (items.length === 0) return []
    
    // Calculate how many times each color should appear (equal distribution)
    const baseCount = Math.floor(items.length / 3)
    const remainder = items.length % 3
    
    // Create counts for each color
    const colorCounts = colors.map((_, index) => baseCount + (index < remainder ? 1 : 0))
    
    // Distribute colors ensuring no adjacent duplicates and equal distribution
    const result: string[] = []
    const used = new Map<string, number>()
    colors.forEach((c) => used.set(c, 0))
    
    for (let i = 0; i < items.length; i++) {
      const prevColor = result[i - 1]
      const nextColor = i === items.length - 1 ? result[0] : null
      
      // Get available colors that don't match adjacent and haven't reached their quota
      const available = colors.filter((c, index) => {
        if (c === prevColor) return false
        if (nextColor && c === nextColor) return false
        const usedCount = used.get(c) || 0
        return usedCount < colorCounts[index]
      })
      
      // If no available colors, use any that doesn't match adjacent
      if (available.length === 0) {
        const fallback = colors.filter(c => c !== prevColor && c !== nextColor)
        if (fallback.length > 0) {
          result.push(fallback[0])
          used.set(fallback[0], (used.get(fallback[0]) || 0) + 1)
          continue
        }
      }
      
      // Pick the first available color (deterministic)
      const selected = available[0] || colors[0]
      result.push(selected)
      used.set(selected, (used.get(selected) || 0) + 1)
    }
    
    // Final check: if last equals first, swap with a safe position
    if (result.length > 2 && result[0] === result[result.length - 1]) {
      for (let i = 1; i < result.length - 1; i++) {
        if (result[i] !== result[0] && result[i] !== result[result.length - 2]) {
          const temp = result[i]
          result[i] = result[result.length - 1]
          result[result.length - 1] = temp
          break
        }
      }
    }
    
    return result
  }, [items.length]) 



const handleSpinClick = () => {
  if (spinning) {
    toast.info('Vòng quay đang chạy rồi nha 🎡')
    return
  }

  if (items.length < 6) {
    toast.warning('Cần ít nhất 6 phần thưởng để quay')
    return
  }

  if (!hasAtLeastThreeDifferentValues(items)) {
    toast.error('Phải có ít nhất 3 mệnh giá khác nhau')
    return
  }

  if(isOpenResult) {
    toast.info('Vòng quay đang chạy rồi nha 🎡')
    return
  }

  spin()
}

  return (
    <>
      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="md:hidden block">
          <Wheel items={shuffleItems} size={size < 500 ? size - 64 : 500} wheelRef={wheelRef} wheelRefMobile={wheelRefMobile} mobile sliceColors={sliceColors} spin={handleSpinClick}/>
        </div>
        <div className="md:block hidden">
          <Wheel items={shuffleItems} size={size < 1400 ? (size / 2) - 64 : 600} wheelRef={wheelRef} wheelRefMobile={wheelRefMobile} sliceColors={sliceColors} spin={handleSpinClick}/>
        </div>
      </div>

      {/* Result modal */}
      <div
        className={`transition-opacity bg-black/65 duration-1000 fixed overscroll-none overflow-hidden inset-0 h-screen w-screen z-999 ${
          isOpenResult ? 'opacity-100' : 'opacity-0'
        }`}
        hidden={!isOpenResult}
        onClick={() => {
          if(spinning) return
          setResult(null)
          setIsOpenResult(false)
        }}
      >
        <div className="flex w-full h-full items-center justify-center">
          <div className="relative flex-col flex items-center justify-center p-6 w-[374px] h-[242px] sm:w-[520px] sm:h-[338px] md:w-[748px] md:h-[476px] bg-[url('/assets/Modal.svg')] bg-cover bg-center bg-no-repeat">
            <p 
              className='text-sm sm:text-base md:text-xl text-[#C50101] text-center font-semibold mt-3! sm:mt-4! md:mt-6! -mb-2! sm:-mb-4!'
              dangerouslySetInnerHTML={{ __html: wishMessage || 'Xuân sang phú quý gõ cửa,<br /> Tiền vô lũ lượt, buồn bã xin thưa.' }}
            />
            <Image
                alt="money"
                src={result?.imageUrl || '/'}
                className="object-contain max-w-[374px] max-h-[242px] sm:max-w-[520px] sm:max-h-[338px] md:max-w-[748px] md:max-h-[476px] flex-1"
                width={374*5}
                height={242*5}
                priority
                unoptimized
              />
            </div>
        </div>
      </div>

      {showFireworks && <Fireworks show={showFireworks} fadeOut={fadeOut} />}
    </>
  )
}
