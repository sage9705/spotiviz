import DashboardLayout from "../components/DashboardLayout";
import GenreDistribution from "../components/GenreDistribution";
import { FaChartPie } from 'react-icons/fa';

export default function GenreDistributionPage() {
  return (
    <DashboardLayout>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8 text-green-400 flex items-center">
          <FaChartPie className="mr-4" /> Genre Distribution
        </h1>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <GenreDistribution />
        </div>
      </div>
    </DashboardLayout>
  );
}