export function AndroidInstallPrompt({
    onInstall,
    onClose
  }: {
    onInstall: () => void
    onClose: () => void
  }) {
    return (
      <div className="fixed inset-0 bg-black/60 z-[9999] flex items-end justify-center"  style={{fontFamily: 'sans-serif'}}>
        <div className="bg-white w-full rounded-t-3xl p-5 text-center animate-slideUp">
  
          <h2 className="font-bold text-lg">📲 Cài đặt ứng dụng</h2>
  
          <p className="text-sm mt-3 leading-relaxed">
            Cài ứng dụng để có trải nghiệm tốt hơn:
          </p>
  
          <ul className="text-sm mt-3 text-left space-y-2">
            <li>⚡ Chạy nhanh hơn</li>
            <li>📴 Không cần mở trình duyệt</li>
            <li>🎮 Trải nghiệm như app thật</li>
          </ul>
  
          <div className="flex gap-3 mt-5 justify-center">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600"
            >
              Để sau
            </button>
  
            <button
              onClick={onInstall}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              Cài đặt
            </button>
          </div>
        </div>
      </div>
    )
  }
  