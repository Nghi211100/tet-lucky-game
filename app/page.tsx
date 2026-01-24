import LuckySpin from './features/LuckySpin';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/assets/background.jpg')] bg-cover">
      <main className="min-h-screen w-full">
        <LuckySpin />
      </main>
    </div>
  );
}
