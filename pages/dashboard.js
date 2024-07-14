import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import UserProfile from "../components/UserProfile";
import TopArtistsList from "../components/TopArtistsList";
import TopTracksList from "../components/TopTracksList";
import SidePanel from "../components/SidePanel";
import GenreDistribution from "../components/GenreDistribution";
import ListeningHistory from "../components/ListeningHistory";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [view, setView] = useState("profile"); 

  if (status === "loading") {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 flex">
        <div className="w-3/4 pr-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Your Spotify Insights</h1>
          
          <div className="mb-6">
            <button
              onClick={() => setView("profile")}
              className={`mr-4 px-4 py-2 rounded ${view === "profile" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Profile View
            </button>
            <button
              onClick={() => setView("charts")}
              className={`px-4 py-2 rounded ${view === "charts" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Visualized Data
            </button>
          </div>

          {view === "profile" ? (
            <>
              <UserProfile />
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Top Artists of All Time</h2>
                <TopArtistsList limit={10} />
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  View All Top Artists
                </button>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Top Tracks of All Time</h2>
                <TopTracksList limit={10} />
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  View All Top Tracks
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="chart-wrapper">
                <h2 className="text-2xl font-bold mb-4">Genre Distribution</h2>
                <GenreDistribution />
              </div>
              <div className="chart-wrapper">
                <h2 className="text-2xl font-bold mb-4">Listening History</h2>
                <ListeningHistory />
              </div>
              <div className="chart-wrapper">
                <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
                <TopArtists />
              </div>
              <div className="chart-wrapper">
                <h2 className="text-2xl font-bold mb-4">Top Tracks</h2>
                <TopTracks />
              </div>
            </div>
          )}
        </div>
        <div className="w-1/4">
          <SidePanel />
        </div>
      </div>
    </Layout>
  );
}