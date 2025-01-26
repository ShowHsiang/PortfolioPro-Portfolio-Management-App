import PropTypes from "prop-types";
import styles from "./GroupComponent.module.css";

const GroupComponent = ({ className = "" }) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.outcomeHeader}>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameItem} />
          <img
            className={styles.frameInner}
            loading="lazy"
            alt=""
            src="/arrow-15.svg"
          />
        </div>
      </div>
      <div className={styles.outcomeLabel}>
        <a className={styles.totalOutcome}>Total Outcome</a>
        <div className={styles.outcomeAmount}>
          <a className={styles.amountSeparator}>$632.000</a>
          <div className={styles.outcomeCurrency}>
            <div className={styles.currencySymbol}>
              <div className={styles.currencySymbolChild} />
              <div className={styles.currencyCode}>+1.29%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;
