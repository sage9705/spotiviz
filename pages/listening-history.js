import Layout from "../components/Layout";
import SidePanel from "../components/SidePanel";
import ListeningHistory from "../components/ListeningHistory";

export default function ListeningHistoryPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 flex">
        <div className="w-1/4">
          <SidePanel />
        </div>
        <div className="w-3/4 pl-6">
          <h1 className="text-3xl text-[#903bac] font-bold my-8">Listening History</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ListeningHistory />
          </div>
        </div>
      </div>
    </Layout>
  );
}