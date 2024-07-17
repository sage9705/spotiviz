import DashboardLayout from "../components/DashboardLayout";
import TopTracks from "../components/TopTracks";
import { FaMusic } from 'react-icons/fa';

export default function TrackChartPage() {
  return (
    <DashboardLayout>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8 text-green-400 flex items-center">
          <FaMusic className="mr-4" /> Top Tracks Chart
        </h1>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <TopTracks />
        </div>
      </div>
    </DashboardLayout>
  );
}