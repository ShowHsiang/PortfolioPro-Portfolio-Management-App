import React from "react";
import { Grid } from "@mui/material";
import MarketCard from "../components/MarketCard";

const MarketOverview = ({ worldIndices }) => {
  const regions = ["Americas", "Asia", "Europe"];

  return (
    <div>
      <Grid container spacing={2}>
        {regions.map((region) => (
          <Grid item xs={12} sm={6} md={4} key={region}>
            <MarketCard
              title={region}
              data={worldIndices.filter((index) => index.region === region)}
              columns={["Symbol", "Price", "Change%"]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MarketOverview;
