import GroupComponent3 from "../components/GroupComponent3";
import StockContainer1 from "../components/StockContainer1";
import StockContainer from "../components/StockContainer";
import styles from "./Desktop1.module.css";

const Desktop1 = () => {
  return (
    <div className={styles.desktop2}>
      <GroupComponent3 />
      <main className={styles.stockList}>
        <section className={styles.stocks}>
          <StockContainer1 />
          <div className={styles.marketSnapshot}>
            <div className={styles.snapshotContainer}>
              <div className={styles.topStocks}>
                <div className={styles.topStockContainer}>
                  <div className={styles.stocks1}>
                    <div className={styles.topStock}>Top Stock</div>
                    <StockContainer teslaMotors11="/teslamotors1-1.svg" />
                  </div>
                </div>
                <div className={styles.stockContainer}>
                  <div className={styles.stockDetails}>
                    <StockContainer teslaMotors11="/teslamotors1-1-1.svg" />
                  </div>
                </div>
                <div className={styles.divider} />
                <img
                  className={styles.emptyContainerIcon}
                  loading="lazy"
                  alt=""
                  src="/frame-1215@2x.png"
                />
              </div>
              <div className={styles.snapshotHeader}>
                <div className={styles.snapshotTitleRow}>
                  <div className={styles.snapshotLabel}>
                    <div className={styles.nasdaqLabel}>
                      <div className={styles.nasdaq}>NASDAQ</div>
                    </div>
                    <div className={styles.sSELabel}>
                      <div className={styles.sse}>SSE</div>
                    </div>
                    <div className={styles.euronextLabel}>
                      <div className={styles.nasdaq}>Euronext</div>
                    </div>
                    <div className={styles.euronextLabel}>
                      <div className={styles.nasdaq}>BSE</div>
                    </div>
                  </div>
                  <div className={styles.snapshotDataRow}>
                    <div className={styles.snapshotDataValues}>
                      <div className={styles.d}>1D</div>
                    </div>
                    <div className={styles.snapshotDataRowChild} />
                    <div className={styles.dWrapper}>
                      <div className={styles.d}>5D</div>
                    </div>
                    <div className={styles.snapshotDataRowChild} />
                    <div className={styles.dWrapper}>
                      <div className={styles.d}>1M</div>
                    </div>
                    <div className={styles.snapshotDataRowChild} />
                    <div className={styles.dWrapper}>
                      <div className={styles.d}>6M</div>
                    </div>
                    <div className={styles.snapshotDataRowChild} />
                    <div className={styles.dWrapper}>
                      <div className={styles.d}>1Y</div>
                    </div>
                  </div>
                </div>
                <div className={styles.tradeTimeDivider} />
                <div className={styles.tradeValuesParent}>
                  <div className={styles.tradeValues}>
                    <div className={styles.timeValueSlots}>
                      <div className={styles.div}>11,700</div>
                      <div className={styles.nasdaq}>11,650</div>
                      <div className={styles.div2}>11,600</div>
                      <div className={styles.nasdaq}>11,550</div>
                    </div>
                    <div className={styles.highLowValues}>
                      <div className={styles.highValue}>
                        <div className={styles.high}>High</div>
                        <div className={styles.highData}>11,691.89</div>
                      </div>
                      <div className={styles.highValue}>
                        <div className={styles.high}>Low</div>
                        <div className={styles.lowData}>11,470.47</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameParent}>
                    <img
                      className={styles.frameChild}
                      loading="lazy"
                      alt=""
                      src="/group-1213.svg"
                    />
                    <div className={styles.amParent}>
                      <div className={styles.am}>10 am</div>
                      <div className={styles.frameGroup}>
                        <div className={styles.averageValueParent}>
                          <div className={styles.averageValue}>
                            <div className={styles.am1}>11 am</div>
                          </div>
                          <div className={styles.prevCloseAverage}>
                            <div className={styles.prevCloseAvr}>
                              Prev close (Avr 28 Days)
                            </div>
                            <div className={styles.highData}>11,512.41</div>
                          </div>
                          <div className={styles.openParent}>
                            <div className={styles.high}>Open</div>
                            <div className={styles.highData}>11,690.11</div>
                          </div>
                        </div>
                        <div className={styles.pm}>12 pm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.snapshotHeader1}>
                <div className={styles.snapshotParent}>
                  <div className={styles.snapshot}>Snapshot</div>
                  <div className={styles.frameContainer}>
                    <div className={styles.highValue}>
                      <div className={styles.prevCloseRowParent}>
                        <div className={styles.prevCloseRow}>
                          <div className={styles.prevCloseValue}>
                            <div className={styles.prevCloseAverage}>
                              <div className={styles.prevClose}>Prev Close</div>
                              <div className={styles.prevCloseData}>
                                12,051.48
                              </div>
                            </div>
                          </div>
                          <div className={styles.dayLowRow}>
                            <div className={styles.dayLowValue}>11,999.87</div>
                            <div className={styles.dayLow}>Day Low</div>
                          </div>
                        </div>
                        <div className={styles.openRow}>
                          <div className={styles.openValue}>
                            <div className={styles.openGroup}>
                              <div className={styles.prevClose}>Open</div>
                              <div className={styles.openDataValue}>
                                12.000.21
                              </div>
                            </div>
                          </div>
                          <div className={styles.dayHighRow}>
                            <div className={styles.dayHighValue}>12,248.15</div>
                            <div className={styles.dayHigh}>Day High</div>
                          </div>
                          <div className={styles.dayRangeDivider} />
                          <div className={styles.verticalDivider} />
                        </div>
                      </div>
                      <div className={styles.dataDivider} />
                    </div>
                    <div className={styles.dayDividerLabelWrapper}>
                      <div className={styles.dayDividerLabel}>12.166.60</div>
                    </div>
                  </div>
                  <div className={styles.weeklyDataRow}>
                    <div className={styles.highValue}>
                      <div className={styles.weekValues}>
                        <div className={styles.weekLowRow}>
                          <div className={styles.weekLowValue}>10,440.64</div>
                          <div className={styles.weekLowParent}>
                            <div className={styles.weekLow}>52 Week Low</div>
                            <div className={styles.weekLowMarker} />
                          </div>
                        </div>
                        <div className={styles.weekHighRow}>
                          <div className={styles.weekHighValue}>15,265.42</div>
                          <div className={styles.dayLow}>{`52 Week High `}</div>
                        </div>
                      </div>
                      <div className={styles.dataDivider} />
                    </div>
                    <div className={styles.tradeTimeRow}>
                      <div className={styles.dayDividerLabel}>12.166.60</div>
                    </div>
                  </div>
                </div>
                <div className={styles.timeValuesWrapper}>
                  <div className={styles.timeValues}>
                    <div className={styles.prevCloseAverage}>
                      <div className={styles.prevClose}>Trade Time</div>
                      <div className={styles.openDataValue}>05:16 PM</div>
                    </div>
                    <div className={styles.prevCloseAverage}>
                      <div className={styles.prevClose}>Trade Date</div>
                      <div className={styles.tradeDateValue}>01/27/23</div>
                    </div>
                  </div>
                </div>
                <div className={styles.snapshotHeaderChild} />
              </div>
            </div>
            <div className={styles.watchlistParent}>
              <div className={styles.watchlist}>Watchlist</div>
              <div className={styles.watchlistItems}>
                <div className={styles.watchlistItem}>
                  <div className={styles.companiesParent}>
                    <div className={styles.companies}>
                      <div className={styles.companyInformation}>
                        <img
                          className={styles.bmw1Icon}
                          loading="lazy"
                          alt=""
                          src="/amazonicon1-1.svg"
                        />
                      </div>
                      <div className={styles.companyNames}>
                        <div className={styles.nasdaq}>
                          <p className={styles.amazoncomInc}>
                            Amazon.com, Inc.
                          </p>
                          <p className={styles.amzn}>AMZN</p>
                        </div>
                      </div>
                      <div className={styles.performanceIndicators}>
                        <div className={styles.firstIndicator}>$102.24</div>
                        <div className={styles.indicators}>+3.02</div>
                      </div>
                    </div>
                    <div className={styles.dividers} />
                  </div>
                  <div className={styles.companiesParent}>
                    <div className={styles.companies}>
                      <div className={styles.companyInformation}>
                        <img
                          className={styles.cocaCola61Icon}
                          loading="lazy"
                          alt=""
                          src="/cocacola6-1.svg"
                        />
                      </div>
                      <div className={styles.companyNames}>
                        <div className={styles.nasdaq}>
                          <p className={styles.amazoncomInc}>Coca-Cola Co</p>
                          <p className={styles.amzn}>KO</p>
                        </div>
                      </div>
                      <div className={styles.performanceIndicators}>
                        <div className={styles.div4}>$60.49</div>
                        <div className={styles.div5}>−0.32</div>
                      </div>
                    </div>
                    <div className={styles.dividers} />
                  </div>
                  <div className={styles.companiesParent}>
                    <div className={styles.companies}>
                      <div className={styles.companyInformation}>
                        <img
                          className={styles.bmw1Icon}
                          loading="lazy"
                          alt=""
                          src="/bmw-1.svg"
                        />
                      </div>
                      <div className={styles.companyNames}>
                        <div className={styles.nasdaq}>
                          <p className={styles.amazoncomInc}>
                            Bayerische Motoren Werke AG
                          </p>
                          <p className={styles.amzn}>BMW</p>
                        </div>
                      </div>
                      <div className={styles.performanceIndicators}>
                        <div className={styles.div4}>$92.94</div>
                        <div className={styles.div7}>+0.59</div>
                      </div>
                    </div>
                    <div className={styles.dividers} />
                  </div>
                  <div className={styles.companiesParent}>
                    <div className={styles.companies}>
                      <div className={styles.companyInformation}>
                        <img
                          className={styles.bmw1Icon}
                          loading="lazy"
                          alt=""
                          src="/microsoft-1.svg"
                        />
                      </div>
                      <div className={styles.companyNames}>
                        <div className={styles.nasdaq}>
                          <p className={styles.amazoncomInc}>Microsoft Corp</p>
                          <p className={styles.amzn}>MSFT</p>
                        </div>
                      </div>
                      <div className={styles.performanceIndicators}>
                        <div className={styles.div8}>$248.16</div>
                        <div className={styles.div7}>+0.16</div>
                      </div>
                    </div>
                    <div className={styles.dividers} />
                  </div>
                  <div className={styles.companiesParent}>
                    <div className={styles.companies}>
                      <div className={styles.companyInformation}>
                        <img
                          className={styles.bmw1Icon}
                          loading="lazy"
                          alt=""
                          src="/ups-1.svg"
                        />
                      </div>
                      <div className={styles.companyNames}>
                        <div className={styles.nasdaq}>
                          <p className={styles.amazoncomInc}>
                            United Parcel Service, Inc.
                          </p>
                          <p className={styles.amzn}>UPS</p>
                        </div>
                      </div>
                      <div className={styles.performanceIndicators}>
                        <div className={styles.firstIndicator}>$182.09</div>
                        <div className={styles.div7}>+2.39</div>
                      </div>
                    </div>
                    <div className={styles.dividers} />
                  </div>
                </div>
                <div className={styles.watchlistItem1}>
                  <div className={styles.companyInformation}>
                    <img
                      className={styles.bmw1Icon}
                      loading="lazy"
                      alt=""
                      src="/mastercard2-1.svg"
                    />
                  </div>
                  <div className={styles.companyNames}>
                    <div className={styles.nasdaq}>
                      <p className={styles.amazoncomInc}>Mastercard Inc</p>
                      <p className={styles.amzn}>MA</p>
                    </div>
                  </div>
                  <div className={styles.performanceIndicators}>
                    <div className={styles.div8}>$374.03</div>
                    <div className={styles.div12}>−3.21</div>
                  </div>
                </div>
                <div className={styles.separator} />
                <div className={styles.watchlistItem1}>
                  <div className={styles.companyInformation}>
                    <img
                      className={styles.bmw1Icon}
                      alt=""
                      src="/amazonicon1-1.svg"
                    />
                  </div>
                  <div className={styles.companyNames}>
                    <div className={styles.nasdaq}>
                      <p className={styles.amazoncomInc}>Amazon.com, Inc.</p>
                      <p className={styles.amzn}>AMZN</p>
                    </div>
                  </div>
                  <div className={styles.performanceIndicators}>
                    <div className={styles.firstIndicator}>$102.24</div>
                    <div className={styles.div7}>+3.02</div>
                  </div>
                </div>
                <div className={styles.background} />
              </div>
              <img
                className={styles.emptyContainerIcon1}
                alt=""
                src="/frame-1215-1@2x.png"
              />
              <div className={styles.addButtonContainer}>
                <img
                  className={styles.plusIcon}
                  loading="lazy"
                  alt=""
                  src="/plus.svg"
                />
              </div>
            </div>
          </div>
        </section>
        <a className={styles.myStocks}>My Stocks</a>
      </main>
    </div>
  );
};

export default Desktop1;
