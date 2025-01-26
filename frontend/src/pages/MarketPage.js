import React, { useState, useEffect, useCallback } from "react";
import NaviBar from "../components/NaviBar";
import styles from "../styles/MarketPage.module.css";
import MarketOverview from "../containers/MarketOverview";
import MarketCard from "../components/MarketCard";
import Watchlist from "../containers/Watchlist";
import { Grid, Box } from "@mui/material";
import axios from "axios";
import CandleChart from "../containers/CandleChart";

const MarketPage = () => {
  const [worldIndices, setWorldIndices] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const base_url = process.env.REACT_APP_API_URL;

  // Fetch market data (worldIndices, topGainers, topLosers)
  const fetchMarketData = useCallback(async () => {
    try {
      const response = await axios.get(`${base_url}/market/overview/`);
      const { world_indices, top_gainers, top_losers } = response.data;
      // Clean data
      setWorldIndices(
        world_indices.map((index) => ({
          ...index,
          change: parseFloat(index.change.replace(/[()]/g, "")),
        }))
      );
      setTopGainers(
        top_gainers.map((gainer) => ({
          symbol: gainer.symbol,
          price: parseFloat(gainer.price),
          change: parseFloat(gainer.change_percent.replace(/[()]/g, "")),
        }))
      );
      setTopLosers(
        top_losers.map((loser) => ({
          symbol: loser.symbol,
          price: parseFloat(loser.price),
          change: parseFloat(loser.change_percent.replace(/[()]/g, "")),
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  }, [base_url]);

  // Check for updates
  const checkAndUpdate = useCallback(async () => {
    try {
      const res = await axios.get(`${base_url}/market/check-update/`);
      setLastUpdated(res.data.last_updated);

      if (res.data.status === "updated") {
        console.log("Data updated. Fetching latest market data...");
        await fetchMarketData();
      } else {
        console.log("Data is up-to-date.");
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }, [base_url, fetchMarketData]);

  useEffect(() => {
    fetchMarketData(); // Initial fetch
    checkAndUpdate();  // Check for updates
  }, [fetchMarketData, checkAndUpdate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.desktop2}>
      <div style={{ width: "20%", float: "left" }}>
        <NaviBar />
      </div>

      <div style={{ marginLeft: "0%", padding: "1rem" }}>
        <h1 style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Market Overview
        </h1>

        <Grid container spacing={2}>
          {/* World Indices */}
          <Grid item xs={12} md={9}>
            <MarketOverview worldIndices={worldIndices} />
          </Grid>

          {/* Top Gainers + Top Losers */}
          <Grid item xs={12} md={2.5}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <MarketCard
                title="Top Gainers"
                data={topGainers}
                columns={["Symbol", "Price", "Change%"]}
              />
              <MarketCard
                title="Top Losers"
                data={topLosers}
                columns={["Symbol", "Price", "Change%"]}
              />
            </div>
          </Grid>
        </Grid>

        <Box style={{}}>
          {/* Watchlist */}
          <Box style={{ flex: 2 }}>
            <Watchlist />
          </Box>

          {/* Candle Chart */}
          <Box style={{ flex: 2 }}>
            <CandleChart />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default MarketPage;
