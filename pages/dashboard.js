import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import UserProfile from "../components/UserProfile";
import TopArtistsList from "../components/TopArtistsList";
import TopTracksList from "../components/TopTracksList";
import GenreDistribution from "../components/GenreDistribution";
import ListeningHistory from "../components/ListeningHistory";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import AllTopArtists from "../components/AllTopArtists";
import AllTopTracks from "../components/AllTopTracks";
import { FaUser, FaChartBar } from 'react-icons/fa';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [view, setView] = useState("profile");
  const [detailView, setDetailView] = useState(null);

  if (status === "loading") {
    return <DashboardLayout><div className="flex justify-center items-center h-screen"><div className="loader"></div></div></DashboardLayout>;
  }

  if (!session) {
    router.push("/");
    return null;
  }
  
  return (
    <DashboardLayout>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8 text-green-400">Your Spotify Insights</h1>
        
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => setView("profile")}
            className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
              view === "profile" 
                ? "bg-green-500 text-white shadow-lg transform scale-105" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FaUser className="mr-2" /> Profile View
          </button>
          <button
            onClick={() => setView("charts")}
            className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
              view === "charts" 
                ? "bg-green-500 text-white shadow-lg transform scale-105" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <FaChartBar className="mr-2" /> Visualized Data
          </button>
        </div>

        {detailView === "allTopArtists" ? (
          <AllTopArtists onBack={() => setDetailView(null)} />
        ) : detailView === "allTopTracks" ? (
          <AllTopTracks onBack={() => setDetailView(null)} />
        ) : view === "profile" ? (
          <div className="space-y-12">
            <UserProfile />
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Top Artists of All Time</h2>
              <TopArtistsList limit={10} />
              <button 
                onClick={() => setDetailView("allTopArtists")}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                View All Top Artists
              </button>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Top Tracks of All Time</h2>
              <TopTracksList limit={10} />
              <button 
                onClick={() => setDetailView("allTopTracks")}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                View All Top Tracks
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Genre Distribution</h2>
              <GenreDistribution />
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Listening History</h2>
              <ListeningHistory />
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Top Artists</h2>
              <TopArtists />
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-green-400">Top Tracks</h2>
              <TopTracks />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}