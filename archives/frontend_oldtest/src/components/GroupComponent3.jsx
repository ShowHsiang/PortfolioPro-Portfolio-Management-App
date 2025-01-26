import { useCallback } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./GroupComponent3.module.css";

const GroupComponent3 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onMyWalletTextClick = useCallback(() => {
    navigate("/desktop");
  }, [navigate]);

  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.trendingWrapper}>
        <div className={styles.trending}>
          <img
            className={styles.trendingTopic1Icon}
            loading="lazy"
            alt=""
            src="/trendingtopic-1@2x.png"
          />
          <div className={styles.userPanel}>
            <img
              className={styles.uifryIcon}
              loading="lazy"
              alt=""
              src="/uifry.svg"
            />
            <div className={styles.userName}>
              <div className={styles.tm}>TM</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.dashboardArea}>
          <div className={styles.dashboardHeader}>
            <div className={styles.dashboardTitle}>
              <img className={styles.fillIcon} alt="" src="/fill@2x.png" />
            </div>
            <a className={styles.dashboard}>Dashboard</a>
          </div>
        </div>
        <div className={styles.chartAndSettings}>
          <Button
            className={styles.chartArea}
            startIcon={
              <img width="24px" height="24px" src="/barlinechart.svg" />
            }
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "16",
              background: "#00555f",
              borderRadius: "10px",
              "&:hover": { background: "#00555f" },
              height: 57,
            }}
          >
            Analytics
          </Button>
          <div className={styles.settings}>
            <div className={styles.settingsContainer}>
              <div className={styles.settingsItems}>
                <img
                  className={styles.wallet02Icon}
                  loading="lazy"
                  alt=""
                  src="/wallet02.svg"
                />
                <div className={styles.userIcon}>
                  <img
                    className={styles.user03Icon}
                    loading="lazy"
                    alt=""
                    src="/user03.svg"
                  />
                </div>
                <img
                  className={styles.wallet02Icon}
                  loading="lazy"
                  alt=""
                  src="/settings01.svg"
                />
              </div>
              <div className={styles.accountSettings}>
                <div className={styles.myWalletParent}>
                  <div
                    className={styles.myWallet}
                    onClick={onMyWalletTextClick}
                  >
                    My Wallet
                  </div>
                  <a className={styles.accounts}>Accounts</a>
                  <a className={styles.settings1}>Settings</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContentInner}>
          <div className={styles.frameItem} />
        </div>
        <div className={styles.footer}>
          <div className={styles.footerItems}>
            <div className={styles.security}>
              <img
                className={styles.user03Icon}
                loading="lazy"
                alt=""
                src="/shieldtick.svg"
              />
              <div className={styles.dashboardTitle}>
                <a className={styles.settings1}>Security</a>
              </div>
            </div>
            <div className={styles.userIcon}>
              <div className={styles.helpIcon}>
                <img
                  className={styles.user03Icon}
                  loading="lazy"
                  alt=""
                  src="/helpcircle.svg"
                />
                <div className={styles.dashboardTitle}>
                  <div className={styles.helpCentre}>Help Centre</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logoutButtonWrapper}>
        <div className={styles.logoutButton}>
          <img
            className={styles.user03Icon}
            loading="lazy"
            alt=""
            src="/logout04.svg"
          />
          <div className={styles.dashboardTitle}>
            <div className={styles.logout}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupComponent3.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent3;
