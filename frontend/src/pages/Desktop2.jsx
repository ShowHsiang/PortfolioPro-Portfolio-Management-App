import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import NaviBar from "../components/NaviBar";
import styles from "./Desktop2.module.css";
const Desktop = ({portfolio}) => {
  const placeholderStocks = [
    { symbol: 'AAPL', price: 150.12, change: +1.2 },
    { symbol: 'TSLA', price: 620.34, change: -0.5 },
  ];
  const stocks = portfolio?.holdings || placeholderStocks;

  return (
    <div className={styles.desktop1}>
      <main className={styles.frameParent}>
        <section className={styles.frameGroup}>
          <NaviBar />
          <div className={styles.frameContainer}>
            <header className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.frameDiv}>
                <div className={styles.frameParent1}>
                  <div className={styles.welcomeBackAliWrapper}>
                    <a className={styles.welcomeBackAli}>Welcome Back, Ali</a>
                  </div>
                  <img
                    className={styles.wavingHandEmoji}
                    loading="lazy"
                    alt=""
                    src="/waving-hand-emoji@2x.png"
                  />
                </div>
                <div className={styles.heresWhatsHappeningWithYWrapper}>
                  <div className={styles.heresWhatsHappening}>
                    Here’s what’s happening with your store today.
                  </div>
                </div>
              </div>
              <div className={styles.frameWrapper}>
                <div className={styles.frameParent2}>
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="/group-1000002312@2x.png"
                  />
                  <div className={styles.aliRazaParent}>
                    <a className={styles.aliRaza}>Ali Raza</a>
                    <img
                      className={styles.profileIcon}
                      alt=""
                      src="/profile-icon.svg"
                    />
                    <FormControl
                      className={styles.webDeveloper}
                      variant="standard"
                      sx={{
                        borderTopWidth: "0px",
                        borderRightWidth: "0px",
                        borderBottomWidth: "0px",
                        borderLeftWidth: "0px",
                        borderRadius: "0px 0px 0px 0px",
                        width: "66.2216288384514%",
                        height: "16px",
                        m: 0,
                        p: 0,
                        "& .MuiInputBase-root": {
                          m: 0,
                          p: 0,
                          minHeight: "16px",
                          justifyContent: "center",
                          display: "inline-flex",
                        },
                        "& .MuiInputLabel-root": {
                          m: 0,
                          p: 0,
                          minHeight: "16px",
                          display: "inline-flex",
                        },
                        "& .MuiMenuItem-root": {
                          m: 0,
                          p: 0,
                          height: "16px",
                          display: "inline-flex",
                        },
                        "& .MuiSelect-select": {
                          m: 0,
                          p: 0,
                          height: "16px",
                          alignItems: "center",
                          display: "inline-flex",
                        },
                        "& .MuiInput-input": { m: 0, p: 0 },
                        "& .MuiInputBase-input": {
                          color: "#808080",
                          fontSize: 14,
                          fontWeight: "Regular",
                          fontFamily: "Arial",
                          textAlign: "left",
                          p: "0 !important",
                        },
                      }}
                    >
                      <InputLabel color="secondary">Web Developer</InputLabel>
                      <Select
                        color="secondary"
                        size="small"
                        label="Web Developer"
                        disableUnderline
                        displayEmpty
                        // IconComponent="null"
                      >
                        <MenuItem>Web Developer</MenuItem>
                      </Select>
                      <FormHelperText />
                    </FormControl>
                  </div>
                </div>
              </div>
            </header>
            <div className={styles.frameParent3}>
              <div className={styles.rectangleGroup}>
                <div className={styles.frameInner} />
                <div className={styles.quickOverviewParent}>
                  <h3 className={styles.quickOverview}>Quick Overview</h3>
                  <div className={styles.frameParent4}>
                    <div className={styles.frameParent5}>
                      <div className={styles.balanceParent}>
                        <a className={styles.balance}>Balance</a>
                        <div className={styles.frameWrapper1}>
                          <div className={styles.balanceAmountWrapper}>
                            <div className={styles.balanceAmount}>
                              $14,032.56
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.frameWrapper2}>
                        <div className={styles.investedAmountWrapper}>
                          <div className={styles.investedAmount}>+5.63%</div>
                        </div>
                      </div>
                    </div>
                    <a className={styles.invested}>Invested</a>
                  </div>
                  <TextField
                    className={styles.frameTextfield}
                    placeholder="$7,532.21"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <img width="24px" height="24px" src="/arrowright.svg" />
                      ),
                    }}
                    sx={{
                      "& fieldset": { border: "none" },
                      "& .MuiInputBase-root": {
                        height: "57px",
                        backgroundColor: "#2c2c2c",
                        paddingRight: "16px",
                        borderRadius: "8px",
                        fontSize: "20px",
                      },
                      "& .MuiInputBase-input": { color: "#fff" },
                      width: "316px",
                    }}
                  />
                </div>
                <div className={styles.smallWidgetWrapper}>
                  <div className={styles.smallWidget}>
                    <div className={styles.yearlyInvestmentParent}>
                      <div className={styles.yearlyInvestment}>Top assets</div>
                      <img
                        className={styles.widgetGraphIcon}
                        loading="lazy"
                        alt=""
                        src="/frame.svg"
                      />
                    </div>
                    <img
                      className={styles.separatorIcon}
                      loading="lazy"
                      alt=""
                      src="/separator.svg"
                    />
                    <div className={styles.frameParent6}>
                      <div className={styles.yearlyInvestmentGroup}>
                        <div className={styles.yearlyInvestment1}>Name</div>
                        <div className={styles.yearlyInvestment2}>Price</div>
                        <div className={styles.yearlyInvestment3}>Change</div>
                      </div>
                      <div className={styles.yearlyInvestmentContainer}>
                        <div className={styles.yearlyInvestment1}>Apple</div>
                        <div className={styles.yearlyInvestment2}>168,71</div>
                        <div className={styles.yearlyInvestment6}>+ 14,34%</div>
                      </div>
                      <div className={styles.yearlyInvestmentContainer}>
                        <div className={styles.yearlyInvestment1}>SpaceX</div>
                        <div className={styles.yearlyInvestment2}>233,99</div>
                        <div className={styles.yearlyInvestment9}>+ 11,24%</div>
                      </div>
                      <div className={styles.yearlyInvestmentContainer}>
                        <div className={styles.yearlyInvestment1}>Google</div>
                        <div className={styles.yearlyInvestment11}>
                          2,545,06
                        </div>
                        <div className={styles.yearlyInvestment12}>
                          - 10,21%
                        </div>
                      </div>
                      <div className={styles.yearlyInvestmentContainer}>
                        <div className={styles.yearlyInvestment1}>Yahoo</div>
                        <div className={styles.yearlyInvestment2}>261,11</div>
                        <div className={styles.yearlyInvestment9}>+ 10,11%</div>
                      </div>
                      <div className={styles.yearlyInvestmentParent4}>
                        <div className={styles.yearlyInvestment16}>
                          Microsoft
                        </div>
                        <div className={styles.yearlyInvestment16}>279,87</div>
                        <div className={styles.yearlyInvestment18}>+ 9,77%</div>
                      </div>
                      <div className={styles.yearlyInvestmentParent4}>
                        <div className={styles.yearlyInvestment16}>PayPal</div>
                        <div className={styles.yearlyInvestment16}>438,99</div>
                        <div className={styles.yearlyInvestment18}>+ 8,56%</div>
                      </div>
                      <div className={styles.yearlyInvestmentParent4}>
                        <div className={styles.yearlyInvestment16}>Netflix</div>
                        <div className={styles.yearlyInvestment16}>887,99</div>
                        <div className={styles.yearlyInvestment24}>- 4,22%</div>
                      </div>
                      <div className={styles.yearlyInvestmentParent4}>
                        <div className={styles.yearlyInvestment16}>Spotify</div>
                        <div className={styles.yearlyInvestment16}>99,18</div>
                        <div className={styles.yearlyInvestment18}>+ 3,09%</div>
                      </div>
                      <div className={styles.yearlyInvestmentParent4}>
                        <div className={styles.yearlyInvestment16}>Twitter</div>
                        <div className={styles.yearlyInvestment16}>991,21</div>
                        <div className={styles.yearlyInvestment18}>+ 2,18%</div>
                      </div>
                      <div className={styles.yearlyInvestmentParent4}>
                        <div className={styles.yearlyInvestment16}>
                          McDonald's
                        </div>
                        <div className={styles.yearlyInvestment16}>124.33</div>
                        <div className={styles.yearlyInvestment24}>- 1.00%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.rectangleContainer}>
                <div className={styles.rectangleDiv} />
                <div className={styles.wrapper}>
                  <b className={styles.b}>75%</b>
                </div>
                <div className={styles.rectangleParent1}>
                  <div className={styles.frameChild1} />
                  <div className={styles.checkYourDailyNewsParent}>
                    <b
                      className={styles.checkYourDaily}
                    >{`Check Your Daily News! `}</b>
                    <div
                      className={styles.ametMinimMollit}
                    >{`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. `}</div>
                  </div>
                  <Button
                    className={styles.frameButton}
                    disableElevation
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      fontSize: "14",
                      background: "#30757d",
                      borderRadius: "10px",
                      "&:hover": { background: "#30757d" },
                      height: 42,
                    }}
                  >
                    Quick Overview
                  </Button>
                </div>
                <div className={styles.frameWrapper3}>
                  <div className={styles.ellipseParent}>
                    <div className={styles.ellipseDiv} />
                    <img
                      className={styles.ellipseIcon}
                      alt=""
                      src="/ellipse-8.svg"
                    />
                  </div>
                </div>
                <img
                  className={styles.yellowRocketFlyingUp}
                  alt=""
                  src="/yellow-rocket-flying-up@2x.png"
                />
              </div>
            </div>
          </div>
        </section>
        <div className={styles.frameWrapper4}>
          <img
            className={styles.groupIcon}
            loading="lazy"
            alt=""
            src="/group-2@2x.png"
          />
        </div>
      </main>
      <div className={styles.quickOverviewWrapper}>
        <div className={styles.quickOverview1}>Quick Overview</div>
      </div>
    </div>
  );
};

export default Desktop;
