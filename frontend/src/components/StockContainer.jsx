import PropTypes from "prop-types";
import styles from "./StockContainer.module.css";

const StockContainer = ({ className = "", teslaMotors11 }) => {
  return (
    <div className={[styles.stockContainer, className].join(" ")}>
      <div className={styles.stockDetails}>
        <div className={styles.stockInfo}>
          <img
            className={styles.teslaMotors11Icon}
            loading="lazy"
            alt=""
            src={teslaMotors11}
          />
          <div className={styles.teslaInc}>Tesla Inc</div>
        </div>
        <div className={styles.teslaSymbol}>
          <div className={styles.tsla}>TSLA</div>
          <div className={styles.ticker}>+17.63</div>
        </div>
      </div>
      <div className={styles.valueContainer}>
        <div className={styles.valueLabels}>
          <div className={styles.investedValue}>Invested Value</div>
          <div className={styles.separator}>$29.34</div>
        </div>
        <div className={styles.valueLabels}>
          <div className={styles.investedValue}>Current Value</div>
          <div className={styles.separator}>$177.90</div>
        </div>
        <img
          className={styles.valueContainerChild}
          loading="lazy"
          alt=""
          src="/group-3-4@2x.png"
        />
      </div>
    </div>
  );
};

StockContainer.propTypes = {
  className: PropTypes.string,
  teslaMotors11: PropTypes.string,
};

export default StockContainer;
