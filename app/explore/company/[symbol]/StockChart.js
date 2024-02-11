"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import "./StockChart.css";

function StockChart({ Symbol, FilteredStockData, ChartType }) {
  if (!FilteredStockData || !Object.keys(FilteredStockData).length) {
    // Render loading state or return early
    return <div>Loading...</div>;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Extract dates and closing prices from FilteredStockData
  const dates = Object.keys(FilteredStockData);
  const closingPrices = dates.map((date) => parseFloat(FilteredStockData[date]['4. close']));

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `Stock Data for ${Symbol}`,
        data: closingPrices,
        borderColor: 'blue',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default StockChart;
