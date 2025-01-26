import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import "../styles/Homepage.module.css"; 

const TopAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      const token = localStorage.getItem("accessToken");
      const baseURL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.get(`${baseURL}/portfolios/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const holdings = response.data[0]?.holdings || [];

        // calculate return rate and extract display data
        const assetData = holdings.map((holding) => {
          const currentPrice = holding.market_value / holding.shares;
          const returnRate =
            ((currentPrice - holding.cost_basis) / holding.cost_basis) * 100;

          return {
            name: holding.symbol, // use symbol or expand to asset name
            price: currentPrice.toFixed(2),
            change: returnRate, // save as number, for dynamic color setting
          };
        });

        // sort by return rate
        const sortedAssets = assetData.sort((a, b) => b.change - a.change);

        setAssets(sortedAssets);
      } catch (error) {
        console.error(
          "Error fetching holdings:",
          error.response?.data || error.message
        );
      }
    };

    fetchHoldings();
  }, []);

  return (
    <div className="topAssetsContainer"> 
      <h4 className="topAssetsTitle">Top Assets</h4>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index}>
                <TableCell>{asset.name}</TableCell>
                <TableCell>${asset.price}</TableCell>
                <TableCell
                  style={{ color: asset.change >= 0 ? "green" : "red" }}
                >
                  {asset.change >= 0
                    ? `+${asset.change.toFixed(2)}%`
                    : `${asset.change.toFixed(2)}%`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TopAssets;
