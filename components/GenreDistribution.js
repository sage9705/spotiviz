import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useWindowSize from '../hooks/useWindowSize';

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: Object.keys(genres),
    datasets: [
      {
        data: Object.values(genres),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
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
        text: 'Genre Distribution',
      },
    },
  };

  return (
    <div className="chart-container" style={chartSize}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}