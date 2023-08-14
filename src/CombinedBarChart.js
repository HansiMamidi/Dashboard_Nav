import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './CombinedBarChart.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import { saveAs } from 'file-saver';
Chart.register(...registerables);

const CombinedBarChart = ({ datasets }) => {
  const dates = datasets[0].data.map(entry => entry.date).reverse();

  const organizedData = datasets.map(dataset => ({
    label: dataset.label,
    backgroundColor: dataset.backgroundColor,
    data: dates.map(date => {
      const matchingEntry = dataset.data.find(entry => entry.date === date);
      return matchingEntry ? matchingEntry.totalInvocations : 0;
    }),
  }));

  const chartData = {
    labels: dates,
    datasets: organizedData,
  };

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        align: 'start',
        padding: {
          top: 10,
          left: 20,
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          autoSkip: false,
        },
        type: 'category',
        labels: dates,
      },
      x: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'REMEDIATION',
        },
      },
    },
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDownload = format => {
    const chartCanvas = document.querySelector('.combined-bar-chart canvas');
    if (chartCanvas) {
      chartCanvas.toBlob(blob => {
        saveAs(blob, `chart.${format}`);
      });
      setShowMenu(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Invocations</h5>
        <div className="combined-bar-chart">
        <div className="chart-container">
               <Bar data={chartData} options={options} />
        </div>

          <div className={`menu-container ${showMenu ? 'show' : ''}`}>
            <button className="menu-button" onClick={handleToggleMenu}>
              &#9776;
            </button>
            {showMenu && (
              <div className="download-menu">
                <button onClick={() => handleDownload('svg')}>Download SVG</button>
                <button onClick={() => handleDownload('png')}>Download PNG</button>
                <button onClick={() => handleDownload('csv')}>Download CSV</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedBarChart;
