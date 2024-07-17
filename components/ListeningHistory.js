import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import useWindowSize from '../hooks/useWindowSize';
import { FaSpinner } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ListeningHistory() {
  const [history, setHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('1month');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowSize();
  const chartSize = width < 768 ? { height: 300 } : { height: 400 };

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/spotify/listening-history?timeRange=${timeRange}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          throw new Error('Data is not an array');
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [timeRange]);

  if (isLoading) return <div className="flex justify-center items-center h-64"><FaSpinner className="animate-spin text-4xl text-green-400" /></div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
  if (history.length === 0) return <div className="text-center">No listening history available</div>;

  const chartData = {
    labels: history.map(item => new Date(item.played_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Tracks Played',
        data: history.map((_, index) => index + 1),
        fill: true,
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        borderColor: 'rgb(29, 185, 84)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#1DB954',
        bodyColor: '#FFFFFF',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#FFFFFF',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative Tracks Played',
          color: '#FFFFFF',
        },
        beginAtZero: true,
        ticks: {
          color: '#FFFFFF',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-400"></h2>
      <div className="mb-4">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-700 text-white rounded-md p-2"
        >
          <option value="1month">Last Month</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>
      <div className="chart-container" style={chartSize}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}