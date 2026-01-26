import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { IItemSpin } from '../features/LuckySpin'
import Image from 'next/image'
import { shuffleAvoidAdjacent } from '../help'
import Fireworks from './Fireworks'

export function SpinWheel({ items, spinning, setSpinning }: { items: IItemSpin[], spinning: boolean, setSpinning: Dispatch<SetStateAction<boolean>> }) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const wheelRefMobile = useRef<HTMLDivElement>(null);
  const [showFireworks, setShowFireworks] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const [currentRotation, setCurrentRotation] = useState(0)

  const [isOpenResult, setIsOpenResult] = useState(false)

  const [result, setResult] = useState<IItemSpin | null>(null)

  const [shuffleItems, setShuffleItems] = useState<IItemSpin[]>(() => shuffleAvoidAdjacent(items))

  const baddest = useRef<HTMLAudioElement | null>(null)
  const bad = useRef<HTMLAudioElement | null>(null)
  const fine = useRef<HTMLAudioElement | null>(null)
  const good = useRef<HTMLAudioElement | null>(null)
  const well = useRef<HTMLAudioElement | null>(null)
  const surprise = useRef<HTMLAudioElement | null>(null)
  const background = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    baddest.current = new Audio('/audio/10k.m4a')
    baddest.current.volume = 1

    bad.current = new Audio('/audio/20k.m4a')
    bad.current.volume = 1

    fine.current = new Audio('/audio/50k.m4a')
    fine.current.volume = 1

    good.current = new Audio('/audio/100k.m4a')
    good.current.volume = 1

    well.current = new Audio('/audio/200k.m4a')
    well.current.volume = 1

    surprise.current = new Audio('/audio/500k.m4a')
    surprise.current.volume = 1
  }, [])


  useEffect(() => {
    if (fadeOut === false) {
      if (baddest.current) baddest.current.currentTime = 0;
      if (bad.current) bad.current.currentTime = 0;
      if (fine.current) fine.current.currentTime = 0;
      if (good.current) good.current.currentTime = 0;
      if (well.current) well.current.currentTime = 0;
      if (surprise.current) surprise.current.currentTime = 0;
    }

  }, [fadeOut]);

  useEffect(() => {
    const unlock = () => {
      if (!background.current) return

      background.current.volume = 0.5

      background.current.play().then(() => {
        console.log('Audio started')
      }).catch(err => {
        console.log('Play failed:', err)
      })

      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }

    window.addEventListener('click', unlock)
    window.addEventListener('touchstart', unlock)
    window.addEventListener('keydown', unlock)

    return () => {
      window.removeEventListener('click', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => {
    setShuffleItems(shuffleAvoidAdjacent(items))
  }, [items])

  const spin = () => {
    if (spinning) return
    setSpinning(true)

    const index = Math.floor(Math.random() * items.length)
    const sliceAngle = 360 / items.length

    // normalize current rotation (0–360)
    const current = currentRotation % 360

    // angle to center of selected slice
    const targetSliceAngle = index * sliceAngle + sliceAngle

    // pointer is at 0deg (top), wheel rotates clockwise
    const rotateTo =
      currentRotation +
      360 * 5 + // full spins
      (360 - targetSliceAngle - current) + (175 - items.length * 0.5)

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        'transform 5.5s cubic-bezier(0.08, 0.82, 0.17, 1)'
      wheelRef.current.style.transform = `rotate(${rotateTo}deg)`
    }
    if (wheelRefMobile.current) {
      wheelRefMobile.current.style.transition =
        'transform 5.5s cubic-bezier(0.08, 0.82, 0.17, 1)'
      wheelRefMobile.current.style.transform = `rotate(${rotateTo}deg)`
    }

    setCurrentRotation(rotateTo)

    if (navigator.vibrate) {
      navigator.vibrate([30, 20, 30])
    }

    setTimeout(() => {
      setSpinning(false)
    }, 4600)
    setTimeout(() => {
      const newResult = shuffleItems[index];
      setIsOpenResult(true)
      setResult(newResult)

      if (Number(newResult.value) === 10) {
        baddest.current?.play()
      }

      if (Number(newResult.value) === 20) {
        bad.current?.play()
      }

      if (Number(newResult.value) == 50) {
        fine.current?.play()
      }

      if (Number(newResult.value) === 100) {
        good.current?.play()
      }

      if (Number(newResult.value) === 200) {
        well.current?.play()
      }

      if (Number(newResult.value) === 500) {
        surprise.current?.play()
      }

      // auto hide after 3s
      setFadeOut(false)
      setShowFireworks(true)

      // start fade out after 3s
      setTimeout(() => {
        setFadeOut(true)

      }, 3000)

      // fully hide after fade animation
      setTimeout(() => {
        setShowFireworks(false)
      }, 3800) // 3000 + 800ms fade duration
    }, 6000)
  }

  function hasAtLeastThreeDifferentValues(items: IItemSpin[]): boolean {
    const uniqueValues = new Set(items.map(item => item.value))
    return uniqueValues.size >= 3
  }

  const renderWheel = (size: number, mobile?: boolean) => {
    if (mobile) {
      return (
        <div
          className="relative rounded-full p-2 bg-[url('/assets/vq5.png')] bg-contain bg-no-repeat shadow-2xl overflow-hidden"
          style={{ width: size + 16, height: size + 16 }}
        >
          {/* Wheel */}
          <div
            ref={wheelRefMobile}
            className="relative rounded-full overflow-hidden bg-white"
            style={{ width: size, height: size }}
          >
            {shuffleItems.map((item, i) => {
              const sliceAngle = 360 / items.length
              const rotation = i * sliceAngle - 90 // pointer at top

              const radius = size * 0.1 // distance from center (adjustable)

              return (
                <div
                  key={i}
                  className="absolute left-[28.5%] top-[41.5%]"
                  style={{
                    transform: `
                    rotate(${rotation}deg)
                    translateY(-${radius}px)
                  `,
                    transformOrigin: 'center center',
                  }}
                >
                  <div
                    className="relative w-[160px] h-[62px] md:w-[260px] md:h-[105px] -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${sliceAngle / 2}deg)`,
                    }}
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
    }
    return (
      <div
        className="relative rounded-full p-[10px] bg-[url('/assets/vq5.png')] bg-contain bg-no-repeat"
        style={{ width: size + 20, height: size + 20 }}
      >
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative rounded-full overflow-hidden bg-white"
          style={{ width: size, height: size }}
        >
          {shuffleItems.map((item, i) => {
            const sliceAngle = 360 / items.length
            const rotation = i * sliceAngle - 90 // pointer at top

            const radius = size * 0.1 // distance from center (adjustable)

            return (
              <div
                key={i}
                className="absolute left-[28.5%] top-[41.5%]"
                style={{
                  transform: `
                  rotate(${rotation}deg)
                  translateY(-${radius}px)
                `,
                  transformOrigin: 'center center',
                }}
              >
                <div
                  className="relative w-[170px] h-[60px] md:w-[260px] md:h-[105px] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotate(${sliceAngle / 2}deg)`,
                  }}
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
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Pointer */}
        <div className={`w-[30px] h-[40px] bg-[url('/assets/moc.png')] bg-contain bg-no-repeat absolute top-0 z-10 ${spinning ? 'pointer-wiggle' : ''}`} />

        {/* Wheel Container */}
        <div className='md:hidden block overflow-hidden'>
          {renderWheel(370, true)}
        </div>
        <div className='md:block hidden'>
          {renderWheel(600)}
        </div>


        {/* Center Button */}
        < button
          onClick={spin}
          disabled={spinning || items.length < 6 || !hasAtLeastThreeDifferentValues(items)}
          className="transition-all duration-500 absolute inset-0 m-auto hover:cursor-pointer w-28 h-28 overflow-hidden p-1 rounded-full text-yellow-400 font-bold text-lg shadow-2xl  bg-[url('/assets/vq5.png')] bg-contain bg-no-repeat active:scale-95 disabled:opacity-60"
        >
          <div className=' hover:from-50% bg-radial from-40% to-100% from-red-500 to-yellow-400 w-full h-full rounded-full flex justify-center items-center'>Quay</div>
        </button >
      </div >
      {/* Congratulation */}
      <div
        className={`transition-opacity bg-black/65 duration-1000 absolute inset-0 w-screen h-screen z-999 bg-cover px-8 py-6 ${isOpenResult ? 'opacity-100' : 'opacity-0'}`}
        hidden={!isOpenResult}
        onClick={() => { setResult(null); setIsOpenResult(false) }}
      >
        <div className='flex w-full h-full items-center justify-center'>
          <div className='relative h-1/2 w-full md:w-1/2 m-auto'>
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