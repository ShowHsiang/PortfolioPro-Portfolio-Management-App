// src/components/NaviBar.js
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/NaviBar.module.css";

const NaviBar = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onHomepageTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const onMarketsTextClick = useCallback(() => {
    navigate("/markets");
  }, [navigate]);

  const onPortfolioTextClick = useCallback(() => {
    navigate("/portfolio");
  }, [navigate]);

  const onNewsTextClick = useCallback(() => {
    navigate("/news");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    navigate("/");
    window.location.reload();
  }, [navigate]);

  const isActive = (path) => location.pathname === path;

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
              src="/app_logo.png"
            />
            <img
              className={styles.uifryIcon}
              loading="lazy"
              alt=""
              src="/app_name.png"
            />
          </div>
          <div className={styles.market}>
            <div className={styles.tm}>TM</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {/* Homepage Button */}
        <div className={`${styles.navButton} ${isActive("/") ? styles.activeBackground : ""}`} onClick={onHomepageTextClick}>
          <img className={`${styles.icon} ${isActive("/") ? styles.activeIcon : ""}`} alt="" src="/fill@2x.png" />
          <div className={`${styles.homepage} ${isActive("/") ? styles.activeText : ""}`}>
            Homepage
          </div>
        </div>
        {/* Markets Button */}
        <div className={`${styles.navButton} ${isActive("/markets") ? styles.activeBackground : ""}`} onClick={onMarketsTextClick}>
          <img className={`${styles.icon} ${isActive("/markets") ? styles.activeIcon : ""}`} alt="" src="/barlinechart2.svg" />
          <div className={`${styles.markets} ${isActive("/markets") ? styles.activeText : ""}`}>
            Markets
          </div>
        </div>
        {/* Portfolio Button */}
        <div className={`${styles.navButton} ${isActive("/portfolio") ? styles.activeBackground : ""}`} onClick={onPortfolioTextClick}>
          <img className={`${styles.icon} ${isActive("/portfolio") ? styles.activeIcon : ""}`} alt="" src="/wallet021.svg" />
          <div className={`${styles.portfolio} ${isActive("/portfolio") ? styles.activeText : ""}`}>
            Portfolio
          </div>
        </div>
        {/* News Button */}
        <div className={`${styles.navButton} ${isActive("/news") ? styles.activeBackground : ""}`} onClick={onNewsTextClick}>
          <img className={`${styles.icon} ${isActive("/news") ? styles.activeIcon : ""}`} alt="" src="/message.svg" />
          <div className={`${styles.news1} ${isActive("/news") ? styles.activeText : ""}`}>
            News
          </div>
        </div>
        <div className={styles.navButton}>
            <img
              className={styles.wallet02Icon}
              loading="lazy"
              alt=""
              src="/settings01.svg"
            />
              <div className={styles.settings}>Settings</div>
          </div>
        </div>
        <div className={styles.navButton}>
              <img
                className={styles.wallet02Icon}
                loading="lazy"
                alt=""
                src="/shieldtick.svg"
              />
                <div className={styles.security1}>Security</div>
            </div>
            <div className={styles.navButton}>
                <img
                  className={styles.wallet02Icon}
                  loading="lazy"
                  alt=""
                  src="/helpcircle.svg"
                />
                  <div className={styles.helpCentre}>Help Centre</div>
              </div>
      {/* <div className={styles.logoutButtonWrapper}> */}
        <div className={styles.navButton} onClick={handleLogout}>
          <img
            className={styles.icon}
            loading="lazy"
            alt=""
            src="/logout04.svg"
          />
          <div className={styles.chart}>
            <div className={styles.logout}>Logout</div>
          </div>
        </div>
      </div>
    // </div>
  );
};

NaviBar.propTypes = {
  className: PropTypes.string,
};

export default NaviBar;
