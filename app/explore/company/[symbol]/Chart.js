
"use client"

import React, { useEffect, useMemo, useState } from 'react';
import StockChart from './StockChart';
import { ChartData } from '../../mockData/ChartInfo';
import './Chart.css';
import axios from 'axios';

function Select({ value, options, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Chart({ Symbol }) {
  const [isMounted, setIsMounted] = useState(false);
  const [day, setDay] = useState('1year');
  const [chartType, setChartType] = useState('LineChart');
  const [chartData, setChartData] = useState(null);
  const [seriesData, setSeriesData] = useState({});


  const apiKey = 'SH8PXH2XXLCUGMMM';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
         `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${Symbol}&apikey=${apiKey}`
        //  `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=TSCO.LON&apikey=demo`
      );

      const weeklyData = response.data['Weekly Adjusted Time Series'];

      setSeriesData(weeklyData);
      setChartData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    if (Symbol) {
      fetchChartData();
    }
  }, [Symbol, day]);

  if (!isMounted) {
    return null;
  }

  
  let FilteredStockData = {};
  if (Object.keys(seriesData).length > 0) {
    const currentDate = new Date();
    const selectedData = {};

    for (const date in seriesData) {
      const dateObj = new Date(date);
      const timeDiff = currentDate - dateObj;

      if (
        (day === '7days' && timeDiff <= 7 * 24 * 60 * 60 * 1000) ||
        (day === '1month' && timeDiff <= 30 * 24 * 60 * 60 * 1000) ||
        (day === '1year' && timeDiff <= 365 * 24 * 60 * 60 * 1000) ||
        (day === '10years' && timeDiff <= 10 * 365 * 24 * 60 * 60 * 1000) ||
        (day === '20years' && timeDiff <= 20 * 365 * 24 * 60 * 60 * 1000)
      ) {
        selectedData[date] = seriesData[date];
      }
    }
    FilteredStockData = selectedData;
  }
  console.log("FilteredStockData", FilteredStockData);


  return (
    <>
      <div className="chart-container">
        <div className="chart-header">
          <div className="accent-background"></div>
          <h1 className="chart-title">{Symbol} Chart</h1>
          <h1 className="chart-title">{chartType} (Past {day})</h1>
        </div>
        <StockChart Symbol={Symbol} FilteredStockData={FilteredStockData} ChartType={chartType} />
        <div className="chart-controls">
          <div className="chart-buttons">
            <button
              className={`chart-button ${
                day === '1month' ? 'active-button' : 'inactive-button'
              }`}
              onClick={() => setDay('1month')}
            >
              1m
            </button>
            <button
              className={`chart-button ${
                day === '1year' ? 'active-button' : 'inactive-button'
              }`}
              onClick={() => setDay('1year')}
            >
              1y
            </button>
            <button
              className={`chart-button ${
                day === '10years' ? 'active-button' : 'inactive-button'
              }`}
              onClick={() => setDay('10years')}
            >
              10y
            </button>
            <button
              className={`chart-button rounded-right-button ${
                day === '20years' ? 'active-button' : 'inactive-button'
              }`}
              onClick={() => setDay('20years')}
            >
              20y
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chart;
