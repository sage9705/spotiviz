import Layout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import TopArtists from "../components/TopArtists";

export default function ArtistChartPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 flex">
        <div className="w-1/4">
          <SidePanel />
        </div>
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Top Artists Chart</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <TopArtists />
          </div>
        </div>
      </div>
    </Layout>
  );
}