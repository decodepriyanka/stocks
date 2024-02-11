import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./grid.css";
import Providers from "../providers";

function TopGainers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const apiKey = "5ORU5T7T068N34RM";

  const loadData = () => {
    setIsLoading(true);

    //const endpoint = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;
    const endpoint = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`;

    axios
      .get(endpoint)
      .then((response) => {
        console.log("Top Gainers API Response:", response.data);

        const transformedData = response.data["top_gainers"] || [];

        setData(transformedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Top Gainers data:", error);
        setIsLoading(false);
      });
  };

  const handleCardClick = (symbol) => {
    router.push(`/explore/company/${symbol}`);
    //router.push(`/explore/company/abc`);
    console.log("symbol in TopGainers", symbol);
  };

  return (
    <Providers>
      <div>
        {isLoading && <p>Loading Top Gainers...</p>}
        {!isLoading && data && data.length > 0 && (
          <div className="card-grid">
            {data.slice(0, cardsPerPage).map((item, index) => (
              <div
                key={index}
                className="card"
                onClick={() => handleCardClick(item.ticker)}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    marginBottom: "8px",
                    color: "#333",
                  }}
                >
                  {item.ticker}
                </h3>
                <p>${item.price}</p>
                <p>Change Amount: +{item.change_amount}</p>
                <p>Change Percentage: +{item.change_percentage}</p>
                <p>Volume: {item.volume}</p>
              </div>
            ))}
          </div>
        )}
        {data.length > cardsPerPage && (
          <button onClick={() => setCardsPerPage(cardsPerPage + 20)}>
            Load More
          </button>
        )}
      </div>
    </Providers>
  );
}

export default TopGainers;
