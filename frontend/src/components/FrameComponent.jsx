import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({ className = "", shieldTick, helpCircle }) => {
  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.shieldTickParent}>
        <img
          className={styles.shieldTickIcon}
          loading="lazy"
          alt=""
          src={shieldTick}
        />
        <div className={styles.securityWrapper}>
          <a className={styles.security}>Security</a>
        </div>
      </div>
      <div className={styles.frameWrapper}>
        <div className={styles.helpCircleParent}>
          <img
            className={styles.shieldTickIcon}
            loading="lazy"
            alt=""
            src={helpCircle}
          />
          <div className={styles.securityWrapper}>
            <div className={styles.helpCentre}>Help Centre</div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  shieldTick: PropTypes.string,
  helpCircle: PropTypes.string,
};

export default FrameComponent;
