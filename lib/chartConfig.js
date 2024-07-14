export const chartColors = [
    '#1DB954',
    '#1ED760',
    '#2EBD59',
    '#57B560',
    '#7ED957',
    '#A4C639',
    '#CFDF63',
    '#ECE81A',
    '#FFC154',
    '#FF9D00',
  ];
  
  export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Circular Std', 'Helvetica', 'Arial', sans-serif",
            size: 12
          },
          color: '#FFFFFF'
        }
      },
      title: {
        display: true,
        font: {
          family: "'Circular Std', 'Helvetica', 'Arial', sans-serif",
          size: 18,
          weight: 'bold'
        },
        color: '#FFFFFF'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: "'Circular Std', 'Helvetica', 'Arial', sans-serif",
          size: 14
        },
        bodyFont: {
          family: "'Circular Std', 'Helvetica', 'Arial', sans-serif",
          size: 12
        },
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          font: {
            family: "'Circular Std', 'Helvetica', 'Arial', sans-serif",
            size: 12
          },
          color: '#FFFFFF'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          font: {
            family: "'Circular Std', 'Helvetica', 'Arial', sans-serif",
            size: 12
          },
          color: '#FFFFFF'
        }
      }
    }
  };