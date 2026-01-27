import InstallPrompt from './components/installPrompt';
import LuckySpin from './features/LuckySpin';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/assets/background.jpg')] bg-cover bg-bottom">
      <main className="min-h-screen w-full flex items-center justify-center">
        <InstallPrompt />
        <LuckySpin />
      </main>
    </div>
  );
}
