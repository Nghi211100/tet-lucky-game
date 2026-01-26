'use client'

import { useState } from 'react'
import { SpinWheel } from '../components/SpinWheel'
import ValueSelection from '../components/ValueSelection'
import Image from 'next/image'

export type IItemSpin = {
  value: string
  imageUrl: string
}

const LuckySpin = () => {

  const [spinning, setSpinning] = useState(false)
  const [openNote, setOpenNote] = useState(true)
  const [items, setItem] = useState<IItemSpin[]>([]);

  return (
    <div className='w-full md:flex justify-center items-center py-10 relative space-y-6'>
      <div className='md:w-1/2'><SpinWheel items={items} setSpinning={setSpinning} spinning={spinning} /></div>
      <div className='md:w-1/2'><ValueSelection setItems={setItem} spinning={spinning} /></div>
     
      <div className='absolute top-10 right-10 h-6 w-6 bg-[url("/assets/info.png")] bg-cover bg-amber-500 rounded-full cursor-pointer' onClick={()=>setOpenNote(!openNote)}></div>
      
      {openNote && <div className='absolute inset-0 h-screen w-screen flex items-center justify-center shadow-2xl' onClick={() => setOpenNote(false)}>
        <div className='w-[95%] md:w-4/5 h-4/5 relative z-99 rounded-lg overflow-hidden flex items-center justify-center border border-amber-600'>
          <Image alt='banner' src={'/assets/guide-background.png'} fill objectFit='cover' className='z-0' />
          <div className='space-y-4 max-w-[90%] md:max-w-4/5 max-h-4/5 z-10 text-yellow-300 overflow-y-auto text-2xl md:text-3xl'>
            <p className='font-bold text-3xl md:text-4xl pb-1'>Giới thiệu trò chơi:</p>
            <p>- Trò chơi Quay Lì Xì May Mắn, đầu xuân năm mới tất cả đều do vận may ngày tết của bản thân bạn, là lớn nhất hay nhỏ nhất, không ai biết được, mình khuyến nghị mỗi người nên có 2 lượt quay để đỡ tổn thương tinh thần, làm xụi mặt ngày tết</p>
            <p className='font-bold text-lg md:text-xl' style={{fontFamily: 'sans-serif'}}>- Lưu ý: ĐÂY LÀ TRÒ CHƠI MANG TÍNH GIẢI TRÍ, VUI LÒNG KHÔNG SỬ DỤNG DƯỚI BẤT KỲ HÌNH THỨC KHÁC (NHƯ CÁ CƯỢC, ĐÁNH BẠC, ...)</p>
            <p className='font-bold text-3xl md:text-4xl pt-4 pb-1'>Hướng dẫn cách chơi:</p>
            <p>Bước 1: Chọn mệnh giá, ít nhất trên đĩa phải có 3 mệnh giá khác nhau và số lượng ít nhất là 6 tờ, nhiều nhất 30 tờ (khuyến khích nên chọn nhiều hơn 15 tờ tiền để đĩa xếp đều các tờ tiền đẹp mắt nhất)
            </p>
            <p>Bước 2: Nhấn vào vòng quay ở ngay giữa đĩa, đĩa sẽ quay ngẫu nhiên
            </p>
            <p>Bước 3: Cùng chờ kết quả, số tiền lì xì sẽ tương ứng với số tiền được mũi tên trên đĩa quay chỉ trúng
            </p>
          </div>
          <p className='absolute bottom-5 md:bottom-10 text-gray-300 text-xl'>(Nhấn bất kì để tắt hướng dẫn này)</p>
        </div>
      </div>
      }
    </div>
  )
}

export default LuckySpin