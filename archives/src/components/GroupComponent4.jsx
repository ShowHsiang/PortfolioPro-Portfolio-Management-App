import { useCallback } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./GroupComponent4.module.css";

const GroupComponent4 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onHomepageTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onMarketsTextClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  const onNewsTextClick = useCallback(() => {
    navigate("/desktop-4");
  }, [navigate]);

  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.frameChild} />
      <div className={styles.trendingTopicWrapperWrapper}>
        <div className={styles.trendingTopicWrapper}>
          <img
            className={styles.trendingTopic1Icon}
            loading="lazy"
            alt=""
            src="/trendingtopic-1@2x.png"
          />
          <div className={styles.uiFryWrapper}>
            <img
              className={styles.uifryIcon}
              loading="lazy"
              alt=""
              src="/uifry.svg"
            />
            <div className={styles.tmWrapper}>
              <div className={styles.tm}>TM</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homepageContentParent}>
        <div className={styles.homepageContent}>
          <div className={styles.homepageHeader}>
            <div className={styles.homepageTitleWrapper}>
              <div className={styles.homepageFillParent}>
                <div className={styles.homepageFill}>
                  <img className={styles.fillIcon} alt="" src="/fill@2x.png" />
                </div>
                <div className={styles.homepage} onClick={onHomepageTextClick}>
                  Homepage
                </div>
              </div>
            </div>
            <div className={styles.barLineChartParent}>
              <img
                className={styles.barLineChartIcon}
                loading="lazy"
                alt=""
                src="/barlinechart1.svg"
              />
              <a className={styles.markets} onClick={onMarketsTextClick}>
                Markets
              </a>
            </div>
          </div>
        </div>
        <div className={styles.portfolioContentParent}>
          <Button
            className={styles.portfolioContent}
            startIcon={<img width="24px" height="24px" src="/wallet02.svg" />}
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
            Portfolio
          </Button>
          <div className={styles.newsContentWrapper}>
            <div className={styles.newsContent}>
              <div className={styles.newsHeader}>
                <div className={styles.newsTitleWrapper}>
                  <img
                    className={styles.messageIcon}
                    loading="lazy"
                    alt=""
                    src="/message.svg"
                  />
                  <a className={styles.news} onClick={onNewsTextClick}>
                    News
                  </a>
                </div>
              </div>
              <div className={styles.settingsWrapper}>
                <img
                  className={styles.barLineChartIcon}
                  loading="lazy"
                  alt=""
                  src="/settings01.svg"
                />
                <div className={styles.settingsTitle}>
                  <div className={styles.settings}>Settings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lineWrapper}>
        <div className={styles.frameItem} />
      </div>
      <div className={styles.newsContentWrapper}>
        <div className={styles.helpSecurityContent}>
          <div className={styles.settingsWrapper}>
            <img
              className={styles.barLineChartIcon}
              loading="lazy"
              alt=""
              src="/shieldtick.svg"
            />
            <div className={styles.homepageFill}>
              <div className={styles.settings}>Security</div>
            </div>
          </div>
          <div className={styles.helpCenterWrapper}>
            <div className={styles.helpCenterContent}>
              <img
                className={styles.barLineChartIcon}
                loading="lazy"
                alt=""
                src="/helpcircle.svg"
              />
              <div className={styles.homepageFill}>
                <div className={styles.helpCentre}>Help Centre</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logoutContentWrapper}>
        <div className={styles.barLineChartParent}>
          <img
            className={styles.barLineChartIcon}
            loading="lazy"
            alt=""
            src="/logout04.svg"
          />
          <div className={styles.homepageFill}>
            <div className={styles.logout}>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupComponent4.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent4;
