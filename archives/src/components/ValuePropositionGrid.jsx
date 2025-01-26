import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./ValuePropositionGrid.module.css";

const ValuePropositionGrid = ({
  className = "",
  assetManagement1,
  prop,
  aColor,
  aMinWidth,
  claimedInvestment,
  claimedInvestmentDisplay,
  claimedInvestmentMinWidth,
  frame1597884198,
}) => {
  const aStyle = useMemo(() => {
    return {
      color: aColor,
      minWidth: aMinWidth,
    };
  }, [aColor, aMinWidth]);

  const claimedInvestmentStyle = useMemo(() => {
    return {
      display: claimedInvestmentDisplay,
      minWidth: claimedInvestmentMinWidth,
    };
  }, [claimedInvestmentDisplay, claimedInvestmentMinWidth]);

  return (
    <div className={[styles.valuePropositionGrid, className].join(" ")}>
      <div className={styles.assetManagement1Parent}>
        <img
          className={styles.assetManagement1Icon}
          loading="lazy"
          alt=""
          src={assetManagement1}
        />
        <a className={styles.a} style={aStyle}>
          {prop}
        </a>
      </div>
      <div className={styles.claimedInvestmentParent}>
        <div
          className={styles.claimedInvestment}
          style={claimedInvestmentStyle}
        >
          {claimedInvestment}
        </div>
        <img className={styles.frameChild} alt="" src={frame1597884198} />
      </div>
    </div>
  );
};

ValuePropositionGrid.propTypes = {
  className: PropTypes.string,
  assetManagement1: PropTypes.string,
  prop: PropTypes.string,
  claimedInvestment: PropTypes.string,
  frame1597884198: PropTypes.string,

  /** Style props */
  aColor: PropTypes.string,
  aMinWidth: PropTypes.string,
  claimedInvestmentDisplay: PropTypes.string,
  claimedInvestmentMinWidth: PropTypes.string,
};

export default ValuePropositionGrid;
