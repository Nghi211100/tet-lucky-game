import Image from 'next/image'
import { RefObject } from 'react'
import { IItemSpin } from '../features/LuckySpin'

const Wheel = ({
  size,
  mobile,
  wheelRef,
  wheelRefMobile,
  items,
  sliceColors
}: {
  size: number
  mobile?: boolean
  wheelRef: RefObject<HTMLDivElement | null>
  wheelRefMobile: RefObject<HTMLDivElement | null>
  items: IItemSpin[]
  sliceColors: string[]
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
      className="relative rounded-full p-2 bg-[url('/assets/vq5.png')] bg-contain bg-no-repeat shadow-2xl"
      style={{ width: size + 16, height: size + 16 }}
    >
      {/* ROTATING WHEEL */}
      <div
        ref={mobile ? wheelRefMobile : wheelRef}
        className="relative rounded-full overflow-hidden bg-[#FFF5CD]"
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
            </div>
          )
        })}

        {/* CENTER */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white font-bold shadow-xl"> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wheel
