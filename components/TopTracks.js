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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowSize();
  const chartSize = width < 768 ? { height: 300 } : { height: 400 };

  useEffect(() => {
    fetch('/api/spotify/top-tracks')
      .then(res => res.json())
      .then(data => {
        setTracks(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: tracks.map(track => track.name),
    datasets: [
      {
        label: 'Popularity',
        data: tracks.map(track => track.popularity),
        backgroundColor: 'rgba(29, 185, 84, 0.6)',
        borderColor: 'rgba(29, 185, 84, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Tracks',
      },
    },
  };

  return (
    <div className="chart-container" style={chartSize}>
      <Bar data={chartData} options={options} />
    </div>
  );
}