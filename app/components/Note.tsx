/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const Note = ({openNote, setOpenNote, muteBg}: {openNote: boolean, setOpenNote: Dispatch<SetStateAction<boolean>>, muteBg: ()=> void}) => {

    if (!openNote) return <></>

    return (
        <div className='absolute inset-0 h-screen w-screen overflow-hidden overscroll-none flex items-center justify-center shadow-2xl z-99 over bg-black/50' onClick={() => { setOpenNote(false); muteBg() }}>
            <div className='w-[95%] md:w-4/5 h-4/5 relative z-99 rounded-lg overflow-visible flex items-center justify-center
            bg-[url("/assets/Body.svg")] bg-cover bg-center
                '>
                <div className='absolute transform translate-y-[-50%] top-0 left-0 w-full h-6 sm:h-8 md:h-10 xl:h-14 z-100 rounded-t-lg overflow-hidden
                bg-[url("/assets/Footer.svg")] bg-cover bg-center bg-no-repeat
                    '/>
                <div className='absolute transform translate-y-[50%] bottom-0 left-0 w-full h-6 sm:h-8 md:h-10 xl:h-14 z-100 rounded-b-lg overflow-hidden
                bg-[url("/assets/Footer.svg")] bg-cover bg-center bg-no-repeat
                    '/>
                <div className='space-y-4 max-w-[80%] md:max-w-4/5 h-full z-10 text-[#670000] overflow-y-auto text-sm sm:text-base md:text-lg py-10 sm:py-14 md:py-20 px-1 sm:px-2 md:px-4'>
                    <p className='text-lg sm:text-xl md:text-2xl text-red-500 uppercase text-center font-bold pb-2'>Giới thiệu trò chơi</p>
                    <p>Đầu xuân năm mới, mọi thứ đều bắt đầu bằng một cú quay. Lì xì nhiều hay ít không quan trọng, quan trọng là cảm giác hồi hộp khi mũi tên dừng lại. Mỗi lượt quay là một bất ngờ nhỏ, mang theo không khí vui vẻ và may mắn ngày Tết.</p>
                    <p style={{ fontFamily: 'sans-serif' }} className=' pt-4'> <span className='font-bold'>Lưu ý:</span> Đây là trò chơi mang tính giải trí. Vui lòng <span className='text-red-500 font-bold'>KHÔNG</span> sử dụng (cá cược, đánh bạc,…) dưới bất kỳ hình thức nào khác.</p>
                    <p className='text-lg md:text-2xl pt-4 pb-1 font-bold'>Hướng dẫn cách chơi</p>
                    <p className='font-bold'>Bước 1: Chuẩn bị đĩa quay</p>
                    <ul className='list-disc list-inside ml-4 space-y-1'>
                        <li>Chọn các mệnh giá tiền lì xì.</li>
                        <li>Trên đĩa cần có ít nhất 3 mệnh giá khác nhau.</li>
                        <li>Số lượng tờ tiền: tối thiểu 6, tối đa 15.</li>
                    </ul>
                    <p className='font-bold'>Bước 2: Quay đĩa
                    </p>
                    <p>Nhấn vào nút quay ở trung tâm, đĩa sẽ quay ngẫu nhiên.</p>
                    <p className='font-bold pt-2'>Bước 3: Nhận lì xì
                    </p>
                    <p>
                        Chờ kết quả. Số tiền lì xì chính là mệnh giá mà mũi tên trên đĩa dừng lại 🎁
                    </p>
                    <p className='italic pt-2'>Bạn có thể chọn lại phần thưởng bằng nút “Chọn lại” ở dưới cùng.</p>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenNote(false);
                        muteBg();
                    }}
                    className='absolute cursor-pointer active:scale-95 -bottom-14 md:-bottom-24 left-1/2 transform -translate-x-1/2 w-10 h-10 md:w-14 md:h-14 z-10 hover:scale-105 transition-transform duration-200'
                >
                    <Image 
                        src="/assets/Button.svg" 
                        alt="Close" 
                        fill
                        className="object-contain"
                    />
                </button>
            </div>           
        </div>
    )
}

export default Note