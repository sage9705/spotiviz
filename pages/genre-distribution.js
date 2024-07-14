import Layout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import GenreDistribution from "../components/GenreDistribution";

export default function GenreDistributionPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 flex">
        <div className="w-1/4">
          <SidePanel />
        </div>
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Genre Distribution</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <GenreDistribution />
          </div>
        </div>
      </div>
    </Layout>
  );
}