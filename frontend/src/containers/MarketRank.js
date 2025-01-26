import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";

const categories = ["stock", "crypto"]; // Example categories

const MarketRank = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ranking data based on selected category
  useEffect(() => {
    const fetchRankData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Placeholder API call simulation
        const response = await fakeApiCall(selectedCategory); // Replace with actual API call
        setRankData(response.data);
      } catch (err) {
        setError("Failed to fetch rank data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRankData();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Market Rankings
      </Typography>
      <FormControl fullWidth style={{ marginBottom: "20px" }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Asset</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>24h Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankData.map((item, index) => (
                <TableRow key={item.symbol}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.asset}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell
                    style={{ color: item.change_24h >= 0 ? "green" : "red" }}
                  >
                    {item.change_24h}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

// Placeholder for API call simulation
const fakeApiCall = async (category) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: [
          { asset: "AAPL", price: 150, change_24h: 1.2 },
          { asset: "TSLA", price: 620, change_24h: -0.5 },
          { asset: "BTC", price: 34000, change_24h: 3.1 },
        ],
      });
    }, 1000)
  );
};

export default MarketRank;
