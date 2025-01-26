import PropTypes from "prop-types";
import styles from "./StockContainer1.module.css";

const StockContainer1 = ({ className = "" }) => {
  return (
    <div className={[styles.stockContainer, className].join(" ")}>
      <div className={styles.nvidiaStock}>
        <div className={styles.nvidiaInfo}>
          <div className={styles.nvidiaDetails}>
            <div className={styles.nvidiaHeader}>
              <img
                className={styles.nvidia1Icon}
                loading="lazy"
                alt=""
                src="/nvidia-1.svg"
              />
              <a className={styles.nvidia}>Nvidia</a>
            </div>
            <div className={styles.nvidiaSymbol}>
              <a className={styles.nvda}>NVDA</a>
              <div className={styles.nVD}>+5.63</div>
            </div>
          </div>
          <div className={styles.nvidiaValue}>
            <div className={styles.currentValue}>
              <div className={styles.currentValue1}>Current Value</div>
              <a className={styles.value}>$203.65</a>
            </div>
            <img
              className={styles.nvidiaValueChild}
              loading="lazy"
              alt=""
              src="/group-3.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.stockHeader}>
        <div className={styles.nvidiaDetails}>
          <div className={styles.company}>
            <img
              className={styles.nvidia1Icon}
              loading="lazy"
              alt=""
              src="/meta1-1.svg"
            />
            <a className={styles.nvidia}>Meta</a>
          </div>
          <div className={styles.symbol}>
            <a className={styles.nvda}>Meta</a>
            <div className={styles.separator}>-4.44</div>
          </div>
        </div>
        <div className={styles.value1}>
          <div className={styles.currentValue}>
            <div className={styles.currentValue1}>Current Value</div>
            <a className={styles.separator1}>$151.74</a>
          </div>
          <img
            className={styles.nvidiaValueChild}
            loading="lazy"
            alt=""
            src="/group-3-1.svg"
          />
        </div>
      </div>
      <div className={styles.stockHeader1}>
        <div className={styles.nvidiaDetails}>
          <div className={styles.frameGroup}>
            <div className={styles.nvidia1Icon}>
              <img
                className={styles.pxAppleLogoBlack1Icon}
                alt=""
                src="/391pxapple-logo-black-1@2x.png"
              />
              <img
                className={styles.pxAppleLogoBlack2Icon}
                alt=""
                src="/391pxapple-logo-black-2@2x.png"
              />
            </div>
            <a className={styles.appleInc}>Apple Inc</a>
          </div>
          <div className={styles.aaplParent}>
            <a className={styles.aapl}>AAPL</a>
            <div className={styles.div}>+23.41</div>
          </div>
        </div>
        <div className={styles.nvidiaValue}>
          <div className={styles.currentValue}>
            <div className={styles.currentValue1}>Current Value</div>
            <a className={styles.value}>$145.93</a>
          </div>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/group-3-2@2x.png"
          />
        </div>
      </div>
      <div className={styles.amdStock}>
        <div className={styles.amdInfo}>
          <div className={styles.amdDetails}>
            <div className={styles.amdHeader}>
              <img
                className={styles.amdLogo11Icon}
                loading="lazy"
                alt=""
                src="/amdlogo1-1.svg"
              />
              <div className={styles.amdTitle}>
                <div className={styles.advancedMicroDevices}>
                  Advanced Micro Devices, Inc.
                </div>
              </div>
            </div>
            <div className={styles.amdSymbol}>
              <div className={styles.amdTicker}>
                <a className={styles.amd}>AMD</a>
                <div className={styles.aMD}>-2.01</div>
              </div>
            </div>
          </div>
          <div className={styles.amdValue}>
            <div className={styles.currentValue}>
              <div className={styles.currentValue1}>Current Value</div>
              <a className={styles.value2}>$75.40</a>
            </div>
            <div className={styles.valueWrapper}>
              <div className={styles.value3}>
                <img
                  className={styles.nvidiaValueChild}
                  alt=""
                  src="/group-3-3.svg"
                />
                <div className={styles.indicator} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <img className={styles.nvidia1Icon} alt="" src="/arrowright.svg" />
      </div>
    </div>
  );
};

StockContainer1.propTypes = {
  className: PropTypes.string,
};

export default StockContainer1;
