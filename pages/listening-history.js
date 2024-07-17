import DashboardLayout from "../components/DashboardLayout";
import ListeningHistory from "../components/ListeningHistory";
import { FaHistory } from 'react-icons/fa';

export default function ListeningHistoryPage() {
  return (
    <DashboardLayout>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8 text-green-400 flex items-center">
          <FaHistory className="mr-4" /> Listening History
        </h1>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <ListeningHistory />
        </div>
      </div>
    </DashboardLayout>
  );
}