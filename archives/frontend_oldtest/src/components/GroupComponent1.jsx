import { Button } from "@mui/material";
import MetricContainer from "./MetricContainer";
import PropTypes from "prop-types";
import styles from "./GroupComponent1.module.css";

const GroupComponent1 = ({ className = "" }) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.trendingTopicContainer}>
        <div className={styles.trendingTopicWrapper}>
          <img
            className={styles.trendingTopic1Icon}
            loading="lazy"
            alt=""
            src="/trendingtopic-11@2x.png"
          />
          <div className={styles.userActions}>
            <img
              className={styles.uifryIcon}
              loading="lazy"
              alt=""
              src="/uifry1.svg"
            />
            <div className={styles.messages}>
              <div className={styles.tm}>TM</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.dashboardContentParent}>
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardMetrics}>
            <MetricContainer
              element3="/element3.svg"
              dashboard="Dashboard"
              barLineChart="/barlinechart.svg"
              analytics="Analytics"
            />
            <div className={styles.walletContentParent}>
              <Button
                className={styles.walletContent}
                startIcon={
                  <img width="24px" height="24px" src="/wallet02.svg" />
                }
                disableElevation
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "16",
                  background: "#6359e9",
                  borderRadius: "10px",
                  "&:hover": { background: "#6359e9" },
                  height: 57,
                }}
              >
                My Wallet
              </Button>
              <MetricContainer
                propGap="35px"
                propGap1="18px"
                element3="/user031.svg"
                propOverflow="hidden"
                dashboard="Accounts"
                propMinWidth="67px"
                barLineChart="/settings011.svg"
                analytics="Settings"
                propTextDecoration="unset"
                propMinWidth1="59px"
              />
            </div>
          </div>
        </div>
        <div className={styles.frameItem} />
        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.shieldTickParent}>
              <img
                className={styles.shieldTickIcon}
                loading="lazy"
                alt=""
                src="/shieldtick1.svg"
              />
              <div className={styles.helpIcons}>
                <img
                  className={styles.helpCircleIcon}
                  loading="lazy"
                  alt=""
                  src="/helpcircle1.svg"
                />
              </div>
              <div className={styles.helpIcons1}>
                <img
                  className={styles.helpCircleIcon}
                  loading="lazy"
                  alt=""
                  src="/moon01.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.securityCenter}>
            <div className={styles.securityCenterDetails}>
              <div className={styles.centerLabel}>
                <div className={styles.security}>Security</div>
                <div className={styles.helpCentre}>Help Centre</div>
                <div className={styles.darkMode}>Dark Mode</div>
              </div>
            </div>
            <div className={styles.notificationBadge}>
              <div className={styles.notificationBadgeChild} />
              <div className={styles.badgeIndicator} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <div className={styles.profileContent}>
          <div className={styles.profilePicture}>
            <div className={styles.avatarBackground} />
            <img
              className={styles.maskGroupIcon}
              alt=""
              src="/mask-group1@2x.png"
            />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.userDetails}>
              <b className={styles.security}>Ali Riaz</b>
              <div className={styles.webDeveloper} />
            </div>
          </div>
        </div>
        <div className={styles.dropdown}>
          <img
            className={styles.dropdownIcon}
            alt=""
            src="/dropdown-icon.svg"
          />
        </div>
      </div>
    </div>
  );
};

GroupComponent1.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent1;
