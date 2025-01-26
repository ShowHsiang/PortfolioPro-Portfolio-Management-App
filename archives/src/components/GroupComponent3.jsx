import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./GroupComponent3.module.css";

const GroupComponent3 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onHomepageTextClick = useCallback(() => {
    navigate("/");
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
      <div className={styles.trending}>
        <div className={styles.frameParent}>
          <div className={styles.trendingTopic1Parent}>
            <img
              className={styles.trendingTopic1Icon}
              loading="lazy"
              alt=""
              src="/trendingtopic-1@2x.png"
            />
            <img
              className={styles.uifryIcon}
              loading="lazy"
              alt=""
              src="/uifry.svg"
            />
          </div>
          <div className={styles.market}>
            <div className={styles.tm}>TM</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.home}>
          <div className={styles.title}>
            <div className={styles.chart}>
              <img className={styles.fillIcon} alt="" src="/fill@2x.png" />
            </div>
            <div className={styles.homepage} onClick={onHomepageTextClick}>
              Homepage
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.marketChart}>
            <img
              className={styles.marketChartChild}
              alt=""
              src="/rectangle-48.svg"
            />
            <img
              className={styles.barLineChartIcon}
              alt=""
              src="/barlinechart.svg"
            />
            <a className={styles.markets}>Markets</a>
          </div>
          <div className={styles.portfolioStats}>
            <div className={styles.wallet}>
              <div className={styles.balance}>
                <img
                  className={styles.wallet02Icon}
                  loading="lazy"
                  alt=""
                  src="/wallet02.svg"
                />
                <div className={styles.chart}>
                  <a
                    className={styles.portfolio}
                    onClick={onPortfolioTextClick}
                  >
                    Portfolio
                  </a>
                </div>
              </div>
              <div className={styles.news}>
                <img
                  className={styles.messageIcon}
                  loading="lazy"
                  alt=""
                  src="/message.svg"
                />
                <a className={styles.news1} onClick={onNewsTextClick}>
                  News
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.settingsButtonWrapper}>
          <div className={styles.settingsButton}>
            <img
              className={styles.wallet02Icon}
              loading="lazy"
              alt=""
              src="/settings01.svg"
            />
            <div className={styles.settingsTitle}>
              <div className={styles.settings}>Settings</div>
            </div>
          </div>
        </div>
        <div className={styles.divider}>
          <div className={styles.dividerChild} />
        </div>
        <div className={styles.securityHelp}>
          <div className={styles.security}>
            <div className={styles.settingsButton}>
              <img
                className={styles.wallet02Icon}
                loading="lazy"
                alt=""
                src="/shieldtick.svg"
              />
              <div className={styles.chart}>
                <a className={styles.security1}>Security</a>
              </div>
            </div>
            <div className={styles.help}>
              <div className={styles.helpButton}>
                <img
                  className={styles.wallet02Icon}
                  loading="lazy"
                  alt=""
                  src="/helpcircle.svg"
                />
                <div className={styles.chart}>
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
            className={styles.wallet02Icon}
            loading="lazy"
            alt=""
            src="/logout04.svg"
          />
          <div className={styles.chart}>
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
