import InstallPrompt from './components/installPrompt';
import LuckySpin from './features/LuckySpin';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <div className="flex max-w-[100vw] min-h-screen bg-[url('/assets/background.png')] md:bg-[url('/assets/background.jpg')] bg-cover bg-bottom bg-fixed"> 
        <InstallPrompt />
        <LuckySpin />
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
    </div>
  );
}
