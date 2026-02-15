import Image from 'next/image'
import { RefObject } from 'react'
import { IItemSpin } from '../features/LuckySpin'

const Wheel = ({
  size,
  mobile,
  wheelRef,
  wheelRefMobile,
  items,
  sliceColors,
  spin
}: {
  size: number
  mobile?: boolean
  wheelRef: RefObject<HTMLDivElement | null>
  wheelRefMobile: RefObject<HTMLDivElement | null>
  items: IItemSpin[]
  sliceColors: string[]
  spin: () => void
}) => {
  const sliceAngle = 360 / items.length

  const imageWidth = Math.min(200,Math.max(120, sliceAngle * 2))
  const imageHeight = imageWidth * 0.66
  const starSize = Math.min(40, Math.max(20, sliceAngle * 0.5))

  const background = `conic-gradient(
      ${sliceColors
        .map((color, i) => {
            const start = i * sliceAngle
            const end = (i + 1) * sliceAngle
            return `${color} ${start}deg ${end}deg`
          })
          .join(',')}
      )`      

  // Calculate padding proportional to size
  const paddingHorizontal = size * 0.06 // 8% of size for horizontal padding
  const paddingVertical = size * 0.06 // 19.5% of size for vertical padding (to match height ratio)
  
  return (
    <div
      className="relative rounded-full"
      style={{ 
        width: size + (paddingHorizontal * 2.4), 
        height: size + (paddingVertical * 4.7),
        padding: `${paddingVertical}px ${paddingHorizontal}px`
      }}
    >
      {/* ROTATING WHEEL */}
      <div
        ref={mobile ? wheelRefMobile : wheelRef}
        className="relative rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          background,
        }}
      >
        {/* ITEMS */}
        {items.map((item, i) => {
          const angle = i * sliceAngle + sliceAngle / 2

          return (
            <div
              key={i}
              className="absolute inset-0 flex justify-center"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div
                className="relative mt-8 md:mt-12"
              >
                <div
                    className="relative rotate-90 hidden md:block"
                    style={{
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                    }}
                    >
                    <Image
                        src={item.imageUrl}
                        alt="reward"
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <div
                    className="relative rotate-90 block md:hidden"
                    style={{
                        width: `${imageWidth/2}px`,
                        height: `${imageHeight/2}px`,
                    }}
                    >
                    <Image
                        src={item.imageUrl}
                        alt="reward"
                        fill
                        className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute flex items-center justify-center" style={{
                top: `${size*0.3}px`,
                left: `50%`,
                transform: `translateX(-50%)`,
                width: `${starSize}px`,
                height: `${starSize}px`,
              }}>
                <Image src={"/assets/star.svg"} alt='spin' fill objectFit='contain' unoptimized />
              </div>
            </div>
          )
        })}  
        <div
          className={"absolute inset-0 rounded-full pointer-events-none"}
          style={{
            width: size,
            height: size,
            background: `radial-gradient(transparent 65%, rgb(201 99 12 / 54%) 76%)`,
            padding: `${size * 0.02}px`,
            display: `${items.length < 1 ? 'none' : 'block'}`,
          }}
        >
        </div>
      </div>
      <button
        onClick={() => spin()}
        className="absolute active:scale-95"
        style={{ 
          top: `${paddingVertical + size * 0.3 - size * 0.04}px`, 
          left: `${paddingHorizontal + size * 0.3}px`, 
          width: `${size * 0.4}px`, 
          height: `${size * 0.4}px` 
        }}
      >
        <div className='relative h-full w-full'>
          <Image src={"/assets/spin.svg"} alt='spin' fill objectFit='contain' unoptimized />
        </div>
      </button>
      <div className='h-full bg-[url("/assets/wheel-v1.svg")] bg-contain bg-no-repeat absolute top-0 left-0 right-0 -z-10'>
      </div>
      
    </div>
  )
}

export default Wheel
