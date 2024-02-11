 "use client"

import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import CompanyInformation from './CompanyInformation';

function ProductPage() {
  const router = useRouter() || {};
  const params = useParams();
  const symbol = params.symbol;
  console.log("symbol", symbol);

  return (
    <div>
      
      <Chart Symbol={symbol} />
      <CompanyInformation TickerValue={symbol} />
      
    </div>
  );
}

export default ProductPage;




