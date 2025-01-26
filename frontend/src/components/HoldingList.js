import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const HoldingList = ({ data = [] }) => {
  const columns = [
    { field: 'symbol', headerName: 'Symbol', width: 150 },
    { field: 'shares', headerName: 'shares', type: 'number', width: 150 },
    { field: 'cost_basis', headerName: 'Cost Basis', type: 'number', width: 150 },
    { field: 'current_price', headerName: 'Current Price', type: 'number', width: 150 },
    { field: 'market_value', headerName: 'Market Value', type: 'number', width: 150 },
  ];

  const rows = data.map((holding) => ({
    id: holding.id,
    symbol: holding.symbol,
    shares: holding.shares,
    cost_basis: holding.cost_basis,
    current_price: holding.market_value / holding.shares,
    market_value: holding.market_value, 
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default HoldingList;