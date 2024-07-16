import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import LoginButton from './LoginButton';
import Link from 'next/link';
import { FaSpotify, FaSignOutAlt } from 'react-icons/fa';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Spotiviz</title>
        <meta name="description" content="Visualize your Spotify data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <FaSpotify className="h-8 w-auto text-green-400 mr-2" />
                  <h1 className="text-xl text-green-400 font-bold">Spotiviz</h1>
                </Link>
              </div>
              <div className="flex items-center">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300"
                  >
                    <FaSignOutAlt className="mr-2" /> Sign out
                  </button>
                ) : (
                  <LoginButton />
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}