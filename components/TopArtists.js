import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useWindowSize from '../hooks/useWindowSize';
import { FaSpinner } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopArtists() {
  const [artists, setArtists] = useState([]);
  const [timeRange, setTimeRange] = useState('short_term');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowSize();
  const chartSize = width < 768 ? { height: 300 } : { height: 400 };

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/spotify/top-artists?timeRange=${timeRange}`)
      .then(res => res.json())
      .then(data => {
        setArtists(data.slice(0, 20)); 
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [timeRange]);

  if (isLoading) return <div className="flex justify-center items-center h-64"><FaSpinner className="animate-spin text-4xl text-green-400" /></div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  const chartData = {
    labels: artists.map(artist => artist.name),
    datasets: [
      {
        label: 'Popularity',
        data: artists.map(artist => artist.popularity),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
        borderColor: 'rgba(29, 185, 84, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
          text: 'Popularity',
          color: '#FFFFFF',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
      y: {
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
          <option value="short_term">Last 4 Weeks</option>
          <option value="medium_term">Last 6 Months</option>
          <option value="long_term">All Time</option>
        </select>
      </div>
      <div className="chart-container" style={chartSize}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}