import Image from "next/image";
import "../app/globals.css"


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col">
        <div className="flex flex-col items-center pt-16 text-center sm:items-start sm:text-left">
          <h1 className="google-sans-flex-bold">
            Wrapped Me - Landing Page
          </h1>
        </div>
      </main>
    </div>
  );
}
