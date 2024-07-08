import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import LoginButton from '../components/LoginButton';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Spotiviz</h1>
        {session ? (
          <div className="space-y-4">
            <p className="text-green-400">Signed in as {session.user.email}</p>
            <Link href="/dashboard" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Go to Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 mb-4">Sign in to visualize your Spotify data</p>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}