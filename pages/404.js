import { useRouter } from 'next/router';
import { FaSpotify, FaArrowLeft, FaHome } from 'react-icons/fa';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <FaSpotify className="text-green-400 text-6xl mb-8 animate-pulse" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-400 mb-8">Oops! It&apos;s not here, what you&apos;re looking for</p>
      <div className="flex space-x-4">
        <button
          onClick={() => router.back()}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Go Back
        </button>
        <button
          onClick={() => router.push('/')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
        >
          <FaHome className="mr-2" />
          Home
        </button>
      </div>
    </div>
  );
}