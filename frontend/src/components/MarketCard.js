import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const MarketCard = ({ title, data, columns }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{title}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={idx}>
                {columns.map((col, colIdx) => (
                  <TableCell
                    key={colIdx}
                    style={
                      col === 'Change%' && item.change
                        ? { color: item.change >= 0 ? 'green' : 'red' }
                        : {}
                    }
                  >
                    {col === 'Change%'
                      ? item.change > 0
                        ? `+${item.change.toFixed(2)}%`
                        : `${item.change.toFixed(2)}%`
                      : item[col.toLowerCase()] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MarketCard;
