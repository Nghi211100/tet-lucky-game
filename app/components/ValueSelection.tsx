import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { IItemSpin } from '../features/LuckySpin'

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
]

const ValueSelection = ({ setItems, spinning }: { setItems: Dispatch<SetStateAction<IItemSpin[]>>, spinning: boolean }) => {
    const handleClick = (item: IItemSpin) => {
        setItems((pre: IItemSpin[]) => [...pre, item])
    }

    return (
        <div>
            <div className='flex gap-6 flex-wrap justify-evenly'>
                {selectionItems.map((item, index) => (
                    <button disabled={spinning} className='shadow-2xl rounded-lg w-[calc(524px/3)] h-[calc(244px/3)] relative hover:scale-105 border-2 border-white cursor-pointer' key={item.imageUrl + index}
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
            <div className='flex gap-6 mt-6 justify-center'>
                <button disabled={spinning}
                    className='hover:cursor-pointer hover:from-30% bg-radial from-red-500 to-yellow-400 text-yellow-400 font-bold text-lg border-2 border-white hover:bg-red-600 shadow-2xl px-4 py-2 w-max rounded-lg'
                    onClick={() => setItems([])}
                >
                    Chọn lại
                </button>
                <button disabled={spinning}
                    className='hover:cursor-pointer hover:from-30% bg-radial from-red-500 to-yellow-400 text-yellow-400 font-bold text-lg border-2 border-white hover:bg-red-600 shadow-2xl px-4 py-2 w-max rounded-lg'
                    onClick={() => setItems((pre: IItemSpin[]) => pre.slice(0, -1))}
                >
                    Xóa bớt
                </button>
            </div>
        </div>
    )
}

export default ValueSelection