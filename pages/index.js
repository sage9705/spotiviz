import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import LoginButton from '../components/LoginButton';
import Head from 'next/head';
import { FaSpotify, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Spotiviz - Visualize Your Spotify Data</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-black overflow-hidden px-4 py-8 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/path-to-your-music-background-image.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 bg-gray-800 bg-opacity-80 p-8 sm:p-12 rounded-3xl shadow-2xl text-center w-full max-w-md mx-auto backdrop-filter backdrop-blur-lg border border-gray-700">
          <div className="mb-8 sm:mb-10">
            <div className="relative inline-block">
              {/* <FaSpotify className="text-green-400 text-6xl sm:text-7xl mx-auto mb-4 animate-pulse" /> */}
              <div className="absolute inset-0 bg-green-400 rounded-full filter blur-xl opacity-50 animate-ping"></div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-3 font-poppins">Spotiviz</h1>
            <p className="text-gray-300 text-lg sm:text-xl">Visualize Your Spotify Journey</p>
          </div>
          {session ? (
            <div className="space-y-4 sm:space-y-6">
              <p className="text-green-400 font-semibold text-base sm:text-lg">Welcome back, {session.user.name || session.user.email}!</p>
              <Link href="/dashboard" className="group flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                <FaChartBar className="mr-2 sm:mr-3 text-lg sm:text-xl group-hover:animate-bounce" /> 
                <span>Explore Your Dashboard</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">Unlock insights into your musical taste</p>
              <LoginButton />
            </div>
          )}
        </div>
        <div className="mt-8 text-white text-xs sm:text-sm text-center z-20">
          <div className="flex items-center justify-center mb-2">
            <FaSpotify className="mr-2 text-green-400" /> Powered by Spotify API
          </div>
          <div>
            Developed by <a href="https://www.linkedin.com/in/edem-kumahor-1995aa141" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition duration-300">Edem Godwin Kumahor</a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  );
}