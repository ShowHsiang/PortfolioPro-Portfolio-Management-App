import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import ValuePropositionGrid from "./ValuePropositionGrid";
import PropTypes from "prop-types";
import styles from "./InvestmentSummary.module.css";

const InvestmentSummary = ({ className = "" }) => {
  return (
    <header className={[styles.investmentSummary, className].join(" ")}>
      <div className={styles.valuePropositionGrid}>
        <div className={styles.valuePropositionLabels}>
          <img
            className={styles.earning1Icon}
            loading="lazy"
            alt=""
            src="/earning-1.svg"
          />
          <a className={styles.m}>$350M</a>
        </div>
        <div className={styles.investmentDetails}>
          <a className={styles.totalInvestment}>Total Investment</a>
          <img
            className={styles.investmentPlaceholdersIcon}
            loading="lazy"
            alt=""
            src="/frame-1597884198.svg"
          />
        </div>
      </div>
      <div className={styles.valuePropositionGrid1}>
        <div className={styles.valuePropositionLabels}>
          <img
            className={styles.earning1Icon}
            loading="lazy"
            alt=""
            src="/valueproposition-1.svg"
          />
          <a className={styles.b}>13B</a>
        </div>
        <FormControl
          className={styles.parent}
          variant="standard"
          sx={{
            borderTopWidth: "0.8px",
            borderRightWidth: "0.8px",
            borderBottomWidth: "0.8px",
            borderLeftWidth: "0.8px",
            borderRadius: "0px 0px 0px 0px",
            width: "89.02600264433671%",
            height: "14.8px",
            m: 0,
            p: 0,
            "& .MuiInputBase-root": {
              m: 0,
              p: 0,
              minHeight: "14.8px",
              justifyContent: "center",
              display: "inline-flex",
            },
            "& .MuiInputLabel-root": {
              m: 0,
              p: 0,
              minHeight: "14.8px",
              display: "inline-flex",
            },
            "& .MuiMenuItem-root": {
              m: 0,
              p: 0,
              height: "14.8px",
              display: "inline-flex",
            },
            "& .MuiSelect-select": {
              m: 0,
              p: 0,
              height: "14.8px",
              alignItems: "center",
              display: "inline-flex",
            },
            "& .MuiInput-input": { m: 0, p: 0 },
            "& .MuiInputBase-input": {
              color: "#000",
              fontSize: 10.9,
              fontWeight: "SemiBold",
              fontFamily: "Work Sans",
              textAlign: "left",
              p: "0 !important",
            },
          }}
        >
          <InputLabel color="primary" />
          <Select
            color="primary"
            disableUnderline
            displayEmpty
            IconComponent={() => (
              <img
                width="30.3px"
                height="14.8px"
                src="/frame-1597884198-1.svg"
                style={{ marginRight: "0.09999999999963548px" }}
              />
            )}
          >
            <MenuItem>Product Value</MenuItem>
          </Select>
          <FormHelperText />
        </FormControl>
      </div>
      <ValuePropositionGrid
        assetManagement1="/assetmanagement-1.svg"
        prop="520"
        claimedInvestment="Claimed Investment"
        frame1597884198="/frame-1597884198-2.svg"
      />
      <ValuePropositionGrid
        assetManagement1="/evaluation-1.svg"
        prop="2.5M"
        aColor="#2b2b2b"
        aMinWidth="45px"
        claimedInvestment="Total Project"
        claimedInvestmentDisplay="inline-block"
        claimedInvestmentMinWidth="70px"
        frame1597884198="/frame-1597884198-3.svg"
      />
    </header>
  );
};

InvestmentSummary.propTypes = {
  className: PropTypes.string,
};

export default InvestmentSummary;
