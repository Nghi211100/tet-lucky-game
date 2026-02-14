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

  const background = `conic-gradient(
      ${sliceColors
        .map((color, i) => {
            const start = i * sliceAngle
            const end = (i + 1) * sliceAngle
            return `${color} ${start}deg ${end}deg`
          })
          .join(',')}
      )`      

  return (
    <div
      className="relative rounded-full p-10"
      style={{ width: size + 80, height: size + size*0.39 }}
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
              <div className="absolute md:top-[calc(50%-120px)] top-[calc(50%-70px)] md:left-[calc(50%-15px)] left-[calc(50%-10px)]" style={{
                width: `${size * 0.05}px`,
                height: `${size * 0.05}px`,
              }}>
                <Image src={"/assets/star.svg"} alt='spin' fill objectFit='contain' />
              </div>
            </div>
          )
        })}       
      </div>
      <button
        onClick={() => spin()}
        className="absolute active:scale-95"
        style={{ top: `calc(50% - 80px - ${size * 0.4 / 6}px)`, left: `calc(50% - ${size * 0.4 / 2}px)`, width: `${size * 0.4}px`, height: `${size * 0.4}px` }}
      >
        <div className='relative h-full w-full -mt-8'>
          <Image src={"/assets/spin.svg"} alt='spin' fill objectFit='contain' />
        </div>
      </button>
      <div className='h-full bg-[url("/assets/wheel-v1.svg")] bg-contain bg-no-repeat absolute top-0 left-0 right-0 -z-10'>
      </div>
    </div>
  )
}

export default Wheel
