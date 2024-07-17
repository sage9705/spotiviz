import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import LoginButton from '../components/LoginButton';
import Head from 'next/head';
import { FaSpotify, FaChartBar } from 'react-icons/fa';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Spotiviz - Visualize Your Spotify Data</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-black">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 bg-gray-800 p-10 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
          <div className="mb-8">
            <FaSpotify className="text-green-400 text-6xl mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-green-400 mb-2 font-poppins">Spotiviz</h1>
            <p className="text-gray-300 text-lg">Visualize Your Spotify Journey</p>
          </div>
          {session ? (
            <div className="space-y-6">
              <p className="text-green-400 font-semibold">Welcome back, {session.user.name || session.user.email}!</p>
              <Link href="/dashboard" className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105 items-center justify-center">
                <FaChartBar className="mr-2" /> Explore Your Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-6 text-lg">Unlock insights into your musical taste</p>
              <LoginButton />
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4 text-white text-sm flex items-center">
          <FaSpotify className="mr-2" /> Powered by Spotify API
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