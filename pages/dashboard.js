import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import TopTracks from "../components/TopTracks";
import TopArtists from "../components/TopArtists";
import GenreDistribution from "../components/GenreDistribution";
import ListeningHistory from "../components/ListeningHistory";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-[#903bac] font-bold my-8 text-center">Your Spotify Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="chart-container">
            <TopTracks />
          </div>
          <div className="chart-container">
            <TopArtists />
          </div>
          <div className="chart-container">
            <GenreDistribution />
          </div>
          <div className="chart-container">
            <ListeningHistory />
          </div>
        </div>
      </div>
    </Layout>
  );
}