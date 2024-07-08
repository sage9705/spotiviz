import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import LoginButton from './LoginButton';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Spotiviz</title>
        <meta name="description" content="Visualize your Spotify data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto pr-1 pb-3" src="./spotiviz-logo.png" alt="Spotiviz logo" />
                  <h1 className="text-xl text-[#903bac] mt-1 font-bold">Spotiviz</h1>
                </div>
              </div>
              <div className="flex items-center">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign out
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