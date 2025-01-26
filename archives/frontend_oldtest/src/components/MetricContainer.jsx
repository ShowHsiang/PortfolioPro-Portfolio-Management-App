import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./MetricContainer.module.css";

const MetricContainer = ({
  className = "",
  propGap,
  propGap1,
  element3,
  propOverflow,
  dashboard,
  propMinWidth,
  barLineChart,
  analytics,
  propTextDecoration,
  propMinWidth1,
}) => {
  const metricWrapperStyle = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const elementDetailsStyle = useMemo(() => {
    return {
      gap: propGap1,
    };
  }, [propGap1]);

  const element3IconStyle = useMemo(() => {
    return {
      overflow: propOverflow,
    };
  }, [propOverflow]);

  const dashboardStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const analyticsStyle = useMemo(() => {
    return {
      textDecoration: propTextDecoration,
      minWidth: propMinWidth1,
    };
  }, [propTextDecoration, propMinWidth1]);

  return (
    <div className={[styles.metricContainer, className].join(" ")}>
      <div className={styles.metricWrapper} style={metricWrapperStyle}>
        <div className={styles.elementContainer}>
          <div className={styles.elementDetails} style={elementDetailsStyle}>
            <img
              className={styles.element3Icon}
              loading="lazy"
              alt=""
              src={element3}
              style={element3IconStyle}
            />
            <a className={styles.dashboard} style={dashboardStyle}>
              {dashboard}
            </a>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <img
              className={styles.barLineChartIcon}
              loading="lazy"
              alt=""
              src={barLineChart}
            />
          </div>
          <a className={styles.analytics} style={analyticsStyle}>
            {analytics}
          </a>
        </div>
      </div>
    </div>
  );
};

MetricContainer.propTypes = {
  className: PropTypes.string,
  element3: PropTypes.string,
  dashboard: PropTypes.string,
  barLineChart: PropTypes.string,
  analytics: PropTypes.string,

  /** Style props */
  propGap: PropTypes.any,
  propGap1: PropTypes.any,
  propOverflow: PropTypes.any,
  propMinWidth: PropTypes.any,
  propTextDecoration: PropTypes.any,
  propMinWidth1: PropTypes.any,
};

export default MetricContainer;
