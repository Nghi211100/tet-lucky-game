export default function IOSInstallHint({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 bg-black/70 z-[9999] flex items-end justify-center" style={{fontFamily: 'sans-serif'}}>
        <div className="bg-white w-full rounded-t-3xl p-5 text-center animate-slideUp">
  
          <h2 className="font-bold text-lg">📲 Cài đặt ứng dụng</h2>
  
          <p className="text-sm mt-3 leading-relaxed">
            Để cài ứng dụng này vào màn hình chính:
          </p>
  
          <ol className="text-sm mt-3 text-left space-y-2">
            <li>1️⃣ Nhấn nút <b>Chia sẻ ⬆️</b> ở thanh công cụ</li>
            <li>2️⃣ Chọn <b>Thêm vào Màn hình chính</b></li>
            <li>3️⃣ Nhấn <b>Thêm</b></li>
          </ol>
  
          <button
            onClick={onClose}
            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Để sau
          </button>
        </div>
      </div>
    )
  }
  