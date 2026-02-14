import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { IItemSpin } from '../features/LuckySpin'
import { toast } from 'react-toastify'

const selectionItems: IItemSpin[] = [
    {
        value: '500',
        imageUrl: '/assets/500k.jpg',
    },
    {
        value: '200',
        imageUrl: '/assets/200k.jpg',
    },
    {
        value: '100',
        imageUrl: '/assets/100k.jpg',
    },
    {
        value: '50',
        imageUrl: '/assets/50k.jpg',
    },
    {
        value: '20',
        imageUrl: '/assets/20k.jpg',
    },
    {
        value: '10',
        imageUrl: '/assets/10k.jpg',
    },
    // {
    //     value: '5',
    //     imageUrl: '/assets/5k.jpg',
    // },
]

const ValueSelection = ({ items,setItems, spinning }: { items: IItemSpin[],setItems: Dispatch<SetStateAction<IItemSpin[]>>, spinning: boolean }) => {
    const handleClick = (item: IItemSpin) => {
        if(items.length<15){
            setItems((pre: IItemSpin[]) => [...pre, item, item])
        } else{
            toast.info("Tối đa 15 phần thưởng thôi nha")
        }
    }

    return (
        <>
            <div className='bg-[#FFFAEE] border-[#FFBB00] border-4 rounded-[16px] shadow-lg py-6 px-2 relative z-10 w-max max-w-full flex flex-col items-center'>
                <h3 className='text-center text-2xl md:text-4xl mb-6 text-[#EBAC00] font-bold'>Chọn phần thưởng</h3>
                <div className='flex gap-6 flex-wrap justify-center w-max max-w-full'>
                    {selectionItems.map((item, index) => (
                        <button disabled={spinning} className='rounded-lg w-[calc(524px/3.5)] md:w-[calc(524px/2.5)] h-[calc(244px/3.5)] md:h-[calc(244px/2.5)] relative hover:scale-105 border-2 border-white cursor-pointer' key={item.imageUrl + index}
                            onClick={() => handleClick(item)}>
                            <Image
                                alt="money"
                                src={item.imageUrl}
                                fill
                                className="object-cover"
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