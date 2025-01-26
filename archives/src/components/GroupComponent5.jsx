import { useCallback } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";
import styles from "./GroupComponent5.module.css";

const GroupComponent5 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onMarketsTextClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  const onPortfolioTextClick = useCallback(() => {
    navigate("/desktop-3");
  }, [navigate]);

  const onNewsTextClick = useCallback(() => {
    navigate("/desktop-4");
  }, [navigate]);

  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.frameWrapper}>
        <div className={styles.trendingTopic1Parent}>
          <img
            className={styles.trendingTopic1Icon}
            loading="lazy"
            alt=""
            src="/trendingtopic-12@2x.png"
          />
          <div className={styles.uifryParent}>
            <img
              className={styles.uifryIcon}
              loading="lazy"
              alt=""
              src="/uifry2.svg"
            />
            <div className={styles.tmWrapper}>
              <a className={styles.tm}>TM</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameContainer}>
          <Button
            className={styles.frameItem}
            startIcon={<img width="20.4px" height="20px" src="/fill.png" />}
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "16",
              background: "#00555f",
              borderRadius: "10px",
              "&:hover": { background: "#00555f" },
            }}
          >
            Homepage
          </Button>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.frameDiv}>
            <div className={styles.logOut04Parent}>
              <div className={styles.frameParent2}>
                <div className={styles.frameParent3}>
                  <div className={styles.barLineChartWrapper}>
                    <img
                      className={styles.barLineChartIcon}
                      loading="lazy"
                      alt=""
                      src="/barlinechart2.svg"
                    />
                  </div>
                  <img
                    className={styles.wallet02Icon}
                    loading="lazy"
                    alt=""
                    src="/wallet021.svg"
                  />
                </div>
                <img
                  className={styles.messageIcon}
                  loading="lazy"
                  alt=""
                  src="/message.svg"
                />
              </div>
              <div className={styles.marketsParent}>
                <a className={styles.markets} onClick={onMarketsTextClick}>
                  Markets
                </a>
                <a className={styles.portfolio} onClick={onPortfolioTextClick}>
                  Portfolio
                </a>
                <a className={styles.news} onClick={onNewsTextClick}>
                  News
                </a>
              </div>
            </div>
          </div>
          <div className={styles.frameParent4}>
            <div className={styles.settings01Parent}>
              <img
                className={styles.barLineChartIcon}
                loading="lazy"
                alt=""
                src="/settings012.svg"
              />
              <div className={styles.settingsWrapper}>
                <a className={styles.settings}>Settings</a>
              </div>
            </div>
            <div className={styles.navigationSeparator} />
            <FrameComponent
              shieldTick="/shieldtick2.svg"
              helpCircle="/helpcircle2.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.frameWrapper1}>
        <div className={styles.logOut04Parent}>
          <img
            className={styles.barLineChartIcon}
            loading="lazy"
            alt=""
            src="/logout041.svg"
          />
          <div className={styles.logoutWrapper}>
            <div className={styles.logout}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupComponent5.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent5;
