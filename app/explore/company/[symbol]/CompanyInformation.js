import React, { useState, useEffect } from 'react';
import './CompanyInformation.css'; // Import the CSS
import axios from 'axios';

const CompanyInformation = ({ TickerValue }) => {
  const [error, setError] = useState(false);

  const CompanyInfo = {
    Name: 'Company Name',
    Symbol: 'COMP',
    Exchange: 'NYSE',
    Currency: 'USD',
    Sector: 'Technology',
    Industry: 'Software',
    Description: 'Company description goes here...',
    '50DayMovingAverage': 100,
    '200DayMovingAverage': 90,
    MarketCapitalization: 1000000000,
    EBITDA: 500000000,
    PERatio: 15,
    Beta: 1.2,
    ProfitMargin: 10.5,
    DividendYield: 2.5,
    AnalystTargetPrice: 110,
    '52WeekHigh': 120,
    '52WeekLow': 80,
  };

  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const functionParam = 'OVERVIEW';
    const symbolParam = TickerValue;
    const apiKey = 'SH8PXH2XXLCUGMMM';
    console.log('TickerValue', symbolParam);

    // Construct the API URL
    const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbolParam}&apikey=${apiKey}`;

    // const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`;


    axios
  .get(apiUrl)
  .then((response) => {
    console.log("Response Status:", response.status);
    console.log("response", response.data);

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle non-200 status codes
      throw new Error('Network response was not ok');
    }
  })
  .then((data) => {
    // Check the response data
    console.log("API Response:", data);

    if (data && Object.keys(data).length > 0) {
      // Data received successfully
      setCompanyInfo(data);
    } else {
      // Handle the case where the response is empty
      console.log("Empty response data");
      setError(true);
    }
  })
  .catch((error) => {
    // Handle errors, for example, by setting the error state
    setError(true);
    console.error("Error fetching company information:", error);
  });

}, [TickerValue]);


  const tickerPrice = 105.5;
  const tickerChangePercentage = '+5.5%';
  const growthValue = 'gainer';

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="company-information-container">
      <div className="company-information-content">
        <div className="company-information-header">
          <span className="company-name">{companyInfo?.Name}</span>
          <span className="ticker-price">${tickerPrice}</span>
        </div>
        <div className="company-information-row">
          <span className="ticker-symbol">{companyInfo?.Symbol}</span>
          <div
            className={`growth-indicator ${
              growthValue === 'gainer' ? 'positive' : 'negative'
            }`}
          >
            <span className="percentage">{tickerChangePercentage}</span>
            {growthValue === 'gainer' ? (
              <span>&uarr;</span>
            ) : (
              <span>&darr;</span>
            )}
          </div>
        </div>
        <div className="company-information-row">
          <span className="exchange">{companyInfo?.Exchange}</span>
          <span className="currency">{companyInfo?.Currency}</span>
        </div>
        <div className="company-description">
          <div className="company-details">
            <div className="sector-industry">
              <span className="sector">SECTOR: {companyInfo?.Sector}</span>
              <span className="industry">INDUSTRY: {companyInfo?.Industry}</span>
            </div>
            <span className="about-company">
              About {companyInfo?.Name}
            </span>
            <p className="description-text">{companyInfo?.Description}</p>
            <div className="moving-averages">
              <div className="moving-average">
                <div className="title">50 Day Moving Average</div>
                <div className="value">${companyInfo?.['50DayMovingAverage']}</div>
              </div>
              <div className="moving-average">
                <div className="title">200 Day Moving Average</div>
                <div className="value">${companyInfo?.['200DayMovingAverage']}</div>
              </div>

            </div>
          </div>
          <div className="hidden-lg">
            <div className="company-details">
              <div className="metric">
                <div className="title">Market Cap</div>
                <div className="value">
                  {Number(companyInfo?.MarketCapitalization)}
                </div>
              </div>
              <div className="metric">
                <div className="title">EBITDA</div>
                <div className="value">{Number(companyInfo?.EBITDA)}</div>
              </div>
              <div className="metric">
                <div className="title">P/E Ratio</div>
                <div className="value">{companyInfo?.PERatio}</div>
              </div>
              <div className="metric">
                <div className="title">Beta</div>
                <div className="value">{companyInfo?.Beta}</div>
              </div>
              <div className="metric">
                <div className="title">Profit Margin</div>
                <div className="value">{companyInfo?.ProfitMargin}</div>
              </div>
              <div className="metric">
                <div className="title">Dividend Yield</div>
                <div className="value">{companyInfo?.DividendYield}%</div>
              </div>
              <div className="metric">
                <div className="title">52 Week High</div>
                <div className="value">${companyInfo?.['52WeekHigh']}</div>
              </div>
              <div className="metric">
                <div className="title">52 Week Low</div>
                <div className="value">${companyInfo?.['52WeekLow']}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
