import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./GroupComponent2.module.css";

const GroupComponent2 = ({ className = "" }) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <a className={styles.myCard}>My Card</a>
      <div className={styles.cardDetails}>
        <a className={styles.cardBalance}>Card Balance</a>
        <a className={styles.balanceValue}>$15,595.015</a>
      </div>
      <div className={styles.cardVisual}>
        <div className={styles.cardContainer}>
          <div className={styles.cardWrapper}>
            <div className={styles.cardBackground}>
              <div className={styles.card1bg} />
              <img className={styles.card1Mask} alt="" src="/card-1-mask.svg" />
              <div className={styles.balanceInfo}>
                <div className={styles.availableBalance}>
                  <div className={styles.balanceLabel}>
                    <div className={styles.currentBalance}>Current Balance</div>
                  </div>
                  <div className={styles.currentBalance1}>$5,750,20</div>
                </div>
                <div className={styles.pendingBalance}>
                  <div className={styles.pendingAmount}>
                    5282 3456 7890 1289
                  </div>
                </div>
              </div>
              <div className={styles.cardProvider}>
                <img
                  className={styles.mastercardLogoIcon}
                  loading="lazy"
                  alt=""
                  src="/mastercard-logo1.svg"
                />
                <div className={styles.providerName}>09/25</div>
              </div>
            </div>
          </div>
          <div className={styles.cardActions}>
            <div className={styles.actionButtons}>
              <div className={styles.manageCardButton}>
                <div className={styles.buttonBackground}>
                  <div className={styles.buttonBackgroundChild} />
                  <div className={styles.cardBalanceCircle} />
                </div>
                <div className={styles.cardBalanceIndicator} />
              </div>
            </div>
            <div className={styles.cardActions1}>
              <Button
                className={styles.cardActionsLabels}
                disableElevation
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "14",
                  background: "#6359e9",
                  borderRadius: "10px",
                  "&:hover": { background: "#6359e9" },
                  height: 48,
                }}
              >
                Manage Cards
              </Button>
              <Button
                className={styles.cardActionsLabels}
                disableElevation
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "14",
                  borderColor: "#fff",
                  borderRadius: "10px",
                  "&:hover": { borderColor: "#fff" },
                  height: 48,
                }}
              >
                Transfer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupComponent2.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent2;
