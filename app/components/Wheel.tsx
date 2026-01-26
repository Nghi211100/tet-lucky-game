import Image from 'next/image'
import { RefObject } from 'react'
import { IItemSpin } from '../features/LuckySpin'

const Wheel = (
    { size, mobile, wheelRef, wheelRefMobile, items }:
    { size: number, mobile?: boolean, wheelRef: RefObject<HTMLDivElement | null>, wheelRefMobile: RefObject<HTMLDivElement | null>, items: IItemSpin[] }) => (
    <div
        className="relative rounded-full p-2 bg-[url('/assets/vq5.png')] bg-contain bg-no-repeat shadow-2xl overflow-hidden"
        style={{ width: size + 16, height: size + 16 }}
    >
        <div
            ref={mobile ? wheelRefMobile : wheelRef}
            className="relative rounded-full overflow-hidden bg-white"
            style={{ width: size, height: size }}
        >
            {items.map((item, i) => {
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

export default Wheel