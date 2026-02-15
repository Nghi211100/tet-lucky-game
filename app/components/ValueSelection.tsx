import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { IItemSpin } from '../features/LuckySpin'
import { toast } from 'react-toastify'

const selectionItems: IItemSpin[] = [
    {
        value: '500',
        imageUrl: '/assets/500k.svg',
    },
    {
        value: '200',
        imageUrl: '/assets/200k.svg',
    },
    {
        value: '100',
        imageUrl: '/assets/100k.svg',
    },
    {
        value: '50',
        imageUrl: '/assets/50k.svg',
    },
    {
        value: '20',
        imageUrl: '/assets/20k.svg',
    },
    {
        value: '10',
        imageUrl: '/assets/10k.svg',
    },
    // {
    //     value: '5',
    //     imageUrl: '/assets/5k.jpg',
    // },
]

const ValueSelection = ({ items,setItems, spinning }: { items: IItemSpin[],setItems: Dispatch<SetStateAction<IItemSpin[]>>, spinning: boolean }) => {
    const handleClick = (item: IItemSpin) => {
        if(items.length<15){
            setItems((pre: IItemSpin[]) => [...pre, item])
        } else{
            toast.info("Tối đa 15 phần thưởng thôi nha")
        }
    }

    return (
        <>
            <div className='bg-[#FFFAEE] border-[#FFBB00] border-4 rounded-[16px] shadow-lg py-6 md:py-8 px-4 md:px-6 relative z-10 w-max max-w-full flex flex-col items-center'>
                <h3 className='text-center text-base md:text-2xl mb-6 md:mb-8 text-[#EBAC00] font-semibold'>Chọn phần thưởng</h3>
                <div className='flex gap-4 md:gap-6 flex-wrap w-max max-w-full px-2 md:px-4'>
                    {selectionItems.map((item, index) => (
                        <button disabled={spinning} className='rounded-lg w-[104px] md:w-[calc(100px*2)] h-[45px] md:h-[calc(45px*2)] relative hover:scale-105 cursor-pointer' key={item.imageUrl + index}
                            onClick={() => handleClick(item)}>
                            <Image
                                alt="money"
                                src={item.imageUrl}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </button>
                    ))}

                </div>
            </div>
            <div className='flex gap-6 mt-6 justify-center'>
                <button disabled={spinning}
                    className='hover:cursor-pointer bg-radial from-[#FFD500] to-[#FFC300] text-white font-bold text-lg px-5 py-2.5 w-max rounded-full shadow-[inset_0_-4px_8px_0_rgba(255,255,255,0.12),inset_0_4px_8px_0_rgba(255,255,255,0.8)]'
                    onClick={() => setItems([])}
                >
                    Chọn lại
                </button>
            </div>
        </>
    )
}

export default ValueSelection