import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('spotify')}
      className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105 flex items-center justify-center"
    >
      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 11-.453-1.492c3.631-1.102 8.147-.568 11.234 1.329a.778.778 0 01.256 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 11-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 11-.955 1.608z"/>
      </svg>
      Sign in with Spotify
    </button>
  );
}