'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { IItemSpin } from '../features/LuckySpin'
import { shuffleAvoidAdjacent } from '../help'
import Fireworks from './Fireworks'

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

  const [showFireworks, setShowFireworks] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [isOpenResult, setIsOpenResult] = useState(false)
  const [result, setResult] = useState<IItemSpin | null>(null)
  const [shuffleItems, setShuffleItems] = useState<IItemSpin[]>(() =>
    shuffleAvoidAdjacent(items)
  )

  // ---------- AUDIO (iOS SAFE) ----------
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

    baddest.current = create('/audio/10k.m4a')
    bad.current = create('/audio/20k.m4a')
    fine.current = create('/audio/50k.m4a')
    good.current = create('/audio/100k.m4a')
    well.current = create('/audio/200k.m4a')
    surprise.current = create('/audio/500k.m4a')

    const all = [baddest, bad, fine, good, well, surprise]

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
      (360 - targetSliceAngle - current) +
      (175 - items.length * 0.5)

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

    setTimeout(() => setSpinning(false), 4600)

    setTimeout(() => {
      const newResult = shuffleItems[index]
      setResult(newResult)
      setIsOpenResult(true)

      setFadeOut(false)
      setShowFireworks(true)

      setTimeout(() => setFadeOut(true), 3000)
      setTimeout(() => setShowFireworks(false), 3800)
    }, 6000)
  }

  // ---------- UI ----------

  const renderWheel = (size: number, mobile?: boolean) => (
    <div
      className="relative rounded-full p-2 bg-[url('/assets/vq5.png')] bg-contain bg-no-repeat shadow-2xl overflow-hidden"
      style={{ width: size + 16, height: size + 16 }}
    >
      <div
        ref={mobile ? wheelRefMobile : wheelRef}
        className="relative rounded-full overflow-hidden bg-white"
        style={{ width: size, height: size }}
      >
        {shuffleItems.map((item, i) => {
          const sliceAngle = 360 / items.length
          const rotation = i * sliceAngle - 90
          const radius = size * 0.1

          return (
            <div
              key={i}
              className="absolute left-[28.5%] top-[41.5%]"
              style={{
                transform: `rotate(${rotation}deg) translateY(-${radius}px)`,
                transformOrigin: 'center center',
              }}
            >
              <div
                className="relative w-[160px] h-[62px] md:w-[260px] md:h-[105px] -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${sliceAngle / 2}deg)` }}
              >
                <Image
                  alt="money"
                  src={item.imageUrl}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      <div className="relative flex flex-col items-center justify-center z-10">
        <div
          className={`w-[30px] h-[40px] bg-[url('/assets/moc.png')] bg-contain bg-no-repeat absolute top-0 z-10 ${
            spinning ? 'pointer-wiggle' : ''
          }`}
        />

        <div className="md:hidden block">{renderWheel(370, true)}</div>
        <div className="md:block hidden">{renderWheel(600)}</div>

        <button
          onClick={spin}
          disabled={spinning || items.length < 6 || !hasAtLeastThreeDifferentValues(items)}
          className="absolute inset-0 m-auto w-28 h-28 rounded-full bg-[url('/assets/vq5.png')] p-1 bg-contain bg-no-repeat active:scale-95 disabled:opacity-60"
        >
          <div className="cursor-pointer hover:from-30% bg-radial from-red-500 to-yellow-400 w-full h-full rounded-full flex items-center justify-center text-yellow-400 font-bold">
            Quay
          </div>
        </button>
      </div>

      {/* Result modal */}
      <div
        className={`transition-opacity bg-black/65 duration-1000 absolute inset-0 h-full w-full z-999 ${
          isOpenResult ? 'opacity-100' : 'opacity-0'
        }`}
        hidden={!isOpenResult}
        onClick={() => {
          setResult(null)
          setIsOpenResult(false)
        }}
      >
        <div className="flex w-full h-full items-center justify-center">
          <div className="relative h-1/2 w-full md:w-1/2">
            <Image
              alt="money"
              src={result?.imageUrl || '/'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {showFireworks && <Fireworks show={showFireworks} fadeOut={fadeOut} />}
    </>
  )
}
