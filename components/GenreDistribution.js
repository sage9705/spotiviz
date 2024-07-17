import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useWindowSize from '../hooks/useWindowSize';
import { FaSpinner } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenreDistribution() {
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowSize();
  const chartSize = width < 768 ? { height: 300 } : { height: 400 };

  useEffect(() => {
    fetch('/api/spotify/genre-distribution')
      .then(res => res.json())
      .then(data => {
        setGenres(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="flex justify-center items-center h-64"><FaSpinner className="animate-spin text-4xl text-green-400" /></div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  const chartData = {
    labels: Object.keys(genres),
    datasets: [
      {
        data: Object.values(genres),
        backgroundColor: [
          '#1DB954', '#1ED760', '#2EBD59', '#57B660', '#7C3AED', '#A78BFA',
          '#F59E0B', '#FBBF24', '#34D399', '#6EE7B7', '#3B82F6', '#93C5FD',
        ],
        borderColor: '#121212',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFFFFF',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#1DB954',
        bodyColor: '#FFFFFF',
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-400"></h2>
      <div className="chart-container" style={chartSize}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}