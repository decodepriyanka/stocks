"use client"

import React, { useState } from 'react';
import TopGainers from './TopGainers';
import TopLosers from './TopLosers';
import dynamic from 'next/dynamic';
import "./explore.css";
import Providers from '../providers';



function Explore() {
  const [activeTab, setActiveTab] = useState('gainers');

  return (
    <Providers>
    <div>
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('gainers')}
          className={activeTab === 'gainers' ? 'active' : ''}
        >
          Top Gainers
        </button>
        <button
          onClick={() => setActiveTab('losers')}
          className={activeTab === 'losers' ? 'active' : ''}
        >
          Top Losers
        </button>
      </div>

      {activeTab === 'gainers' && <TopGainers />}
      {activeTab === 'losers' && <TopLosers />}
    </div>
    </Providers>
  );
}

export default Explore;


