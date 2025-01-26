import GroupComponent4 from "../components/GroupComponent4";
import InvestmentSummary from "../components/InvestmentSummary";
import styles from "./Desktop3.module.css";

const Desktop3 = () => {
  return (
    <div className={styles.desktop3}>
      <GroupComponent4 />
      <section className={styles.overviewContentWrapper}>
        <div className={styles.overviewContent}>
          <InvestmentSummary />
          <div className={styles.analyticsChart}>
            <div className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.overviewTitle}>
                <h1 className={styles.quickOverview}>Quick Overview</h1>
              </div>
              <div className={styles.chartWrapper}>
                <div className={styles.chartContent}>
                  <div className={styles.chartHeader}>
                    <div className={styles.chartTitleWrapper}>
                      <div className={styles.chartTitle}>
                        <div className={styles.portfolioAnalytics}>
                          Portfolio Analytics
                        </div>
                      </div>
                      <div className={styles.frameParent}>
                        <div className={styles.dWrapper}>
                          <div className={styles.d}>1D</div>
                        </div>
                        <div className={styles.frameItem} />
                        <div className={styles.dContainer}>
                          <div className={styles.d}>5D</div>
                        </div>
                        <div className={styles.frameItem} />
                        <div className={styles.dContainer}>
                          <div className={styles.d}>1M</div>
                        </div>
                        <div className={styles.frameItem} />
                        <div className={styles.dContainer}>
                          <div className={styles.d}>6M</div>
                        </div>
                        <div className={styles.frameItem} />
                        <div className={styles.dContainer}>
                          <div className={styles.d}>1Y</div>
                        </div>
                        <div className={styles.frameItem} />
                        <div className={styles.dContainer}>
                          <div className={styles.d}>5Y</div>
                        </div>
                        <div className={styles.frameItem} />
                        <div className={styles.dContainer}>
                          <div className={styles.d}>Max</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.chartContentChild} />
                  <div className={styles.chartContentItem} />
                  <div className={styles.chartLegend}>$15000</div>
                  <div className={styles.chartArea}>
                    <div className={styles.chartPoints}>
                      <div className={styles.chartColumns}>
                        <div className={styles.chartColumn}>
                          <img
                            className={styles.chartColumnChild}
                            alt=""
                            src="/group-1221.svg"
                          />
                          <img
                            className={styles.chartColumnItem}
                            loading="lazy"
                            alt=""
                            src="/group-1220.svg"
                          />
                          <div className={styles.pointLabel}>
                            <div className={styles.pm}>Jan 30, 01:12:16 AM</div>
                            <div className={styles.day}>$14,032.56</div>
                          </div>
                          <div className={styles.dataPoint} />
                        </div>
                        <div className={styles.valueBars}>
                          <div className={styles.values}>$12000</div>
                          <div className={styles.values1}>$9000</div>
                          <div className={styles.values1}>$6000</div>
                          <div className={styles.values1}>$3000</div>
                          <div className={styles.values4}>$0</div>
                        </div>
                      </div>
                      <div className={styles.timeLabels}>
                        <div className={styles.am}>10 am</div>
                        <div className={styles.am}>11 am</div>
                        <div className={styles.pm}>12 pm</div>
                        <div className={styles.pm}>12 pm</div>
                        <div className={styles.pm}>12 pm</div>
                        <div className={styles.pm}>12 pm</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.backgroundShape}>
                  <img
                    className={styles.backgroundShapeChild}
                    loading="lazy"
                    alt=""
                    src="/rectangle-67.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Desktop3;
