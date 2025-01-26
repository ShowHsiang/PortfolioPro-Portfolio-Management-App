import { useCallback } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";
import styles from "./Desktop11.module.css";

const Desktop11 = () => {
  const navigate = useNavigate();

  const onHomepageTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onMarketsTextClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  const onPortfolioTextClick = useCallback(() => {
    navigate("/desktop-3");
  }, [navigate]);

  return (
    <div className={styles.desktop4}>
      <main className={styles.desktop4Inner}>
        <section className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <div className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.frameWrapper}>
                <div className={styles.trendingTopic1Parent}>
                  <img
                    className={styles.trendingTopic1Icon}
                    loading="lazy"
                    alt=""
                    src="/trendingtopic-1@2x.png"
                  />
                  <div className={styles.uifryParent}>
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
              <div className={styles.frameContainer}>
                <div className={styles.frameDiv}>
                  <div className={styles.frameWrapper1}>
                    <div className={styles.frameParent1}>
                      <div className={styles.logoutWrapper}>
                        <div className={styles.fillContainerParent}>
                          <div className={styles.fillContainer}>
                            <img
                              className={styles.fillIcon}
                              loading="lazy"
                              alt=""
                              src="/fill@2x.png"
                            />
                          </div>
                          <div className={styles.chartContainerParent}>
                            <div className={styles.chartContainer}>
                              <img
                                className={styles.barLineChartIcon}
                                loading="lazy"
                                alt=""
                                src="/barlinechart1.svg"
                              />
                            </div>
                            <img
                              className={styles.wallet02Icon}
                              loading="lazy"
                              alt=""
                              src="/wallet02.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.marketsPortfolio}>
                        <div className={styles.homepageWrapper}>
                          <div
                            className={styles.homepage}
                            onClick={onHomepageTextClick}
                          >
                            Homepage
                          </div>
                        </div>
                        <a
                          className={styles.markets}
                          onClick={onMarketsTextClick}
                        >
                          Markets
                        </a>
                        <a
                          className={styles.portfolio}
                          onClick={onPortfolioTextClick}
                        >
                          Portfolio
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.frameItem}
                      alt=""
                      src="/rectangle-48.svg"
                    />
                    <img
                      className={styles.messageIcon}
                      alt=""
                      src="/message1.svg"
                    />
                    <a className={styles.news}>News</a>
                  </div>
                  <div className={styles.settingsContainerWrapper}>
                    <div className={styles.settingsContainer}>
                      <img
                        className={styles.barLineChartIcon}
                        loading="lazy"
                        alt=""
                        src="/settings01.svg"
                      />
                      <div className={styles.settingsWrapper}>
                        <a className={styles.settings}>Settings</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.lineWrapper}>
                  <div className={styles.frameInner} />
                </div>
                <div className={styles.settingsContainerWrapper}>
                  <FrameComponent
                    shieldTick="/shieldtick.svg"
                    helpCircle="/helpcircle.svg"
                  />
                </div>
                <div className={styles.logoutContainer}>
                  <div className={styles.logOut04Parent}>
                    <img
                      className={styles.barLineChartIcon}
                      loading="lazy"
                      alt=""
                      src="/logout04.svg"
                    />
                    <div className={styles.logoutWrapper}>
                      <div className={styles.logout}>Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper4}>
              <div className={styles.trendingContainerParent}>
                <header className={styles.trendingContainer}>
                  <img
                    className={styles.maskGroupIcon}
                    loading="lazy"
                    alt=""
                    src="/mask-group@2x.png"
                  />
                  <div className={styles.content}>
                    <div className={styles.heading}>
                      <div className={styles.titleContainer}>
                        <div className={styles.trending}>Trending</div>
                        <div className={styles.titleContainerInner}>
                          <div className={styles.titleContainer}>
                            <img
                              className={styles.icons}
                              loading="lazy"
                              alt=""
                              src="/vector.svg"
                            />
                            <img
                              className={styles.icons1}
                              alt=""
                              src="/vector-1.svg"
                            />
                            <img
                              className={styles.icons2}
                              alt=""
                              src="/vector-2.svg"
                            />
                          </div>
                        </div>
                      </div>
                      <h1 className={styles.cakeMemeReflects}>
                        Cake meme reflects coronavirus absurdity in a world
                        where nothing is what it seems
                      </h1>
                    </div>
                    <div className={styles.articleExcerpt}>
                      <div className={styles.earlierThisMonth}>
                        Earlier this month, a viral video depicting
                        hyper-realistic cakes as everyday items had folks on
                        social media double-guessing every other post, and
                        sometimes even their own realities, effectively
                        launching the next meme : “Is this real or is this
                        cake?”
                      </div>
                    </div>
                    <div className={styles.articleInfo}>
                      <div className={styles.hoursAgo}>2 hours ago</div>
                      <div className={styles.byLucyHiddleston}>
                        By Lucy Hiddleston | 4min read
                      </div>
                    </div>
                  </div>
                </header>
                <div className={styles.errorContainer}>
                  <div className={styles.errorAlert}>
                    <div className={styles.placeholder} />
                    <div className={styles.placeholderParent}>
                      <div className={styles.placeholder1} />
                      <div className={styles.ohSnapChange}>Breaking News</div>
                    </div>
                    <div className={styles.duplicateMessage}>
                      <div className={styles.ohSnapChange1}>
                        Kanye West says he's running for president in 2020.
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.thinkHealthContainer}>
                  <div className={styles.storyContainer}>
                    <div className={styles.placeholder2} />
                    <div className={styles.thinkHealth}>
                      <div className={styles.latestStories}>
                        <div className={styles.latestStories1}>
                          Latest Stories
                        </div>
                        <div className={styles.fill} />
                      </div>
                      <div className={styles.think}>Think</div>
                      <a className={styles.health}>Health</a>
                    </div>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.imageContainerChild}
                        loading="lazy"
                        alt=""
                        src="/group-273.svg"
                      />
                    </div>
                  </div>
                  <div className={styles.articleContainer}>
                    <div className={styles.articleContent}>
                      <div className={styles.vectorGroup}>
                        <img
                          className={styles.rectangleIcon}
                          alt=""
                          src="/rectangle-37.svg"
                        />
                        <img
                          className={styles.maskGroupIcon1}
                          alt=""
                          src="/mask-group-1@2x.png"
                        />
                        <div className={styles.articleBody}>
                          <div className={styles.articleHeading}>
                            <div className={styles.johnLewisTo}>
                              John Lewis to make final journey across Edmund
                              Pettus Bridge in procession
                            </div>
                          </div>
                          <div className={styles.articleHeading1}>
                            <div className={styles.theBodyOf}>
                              The body of the late US Rep. John Lewis on Sunday
                              will make the final journey across the famous
                              bridge in Selma, Alabama, where he helped lead a
                              march for voting rights in 1965.
                            </div>
                          </div>
                          <div className={styles.articleMeta}>
                            <div className={styles.timeContainer}>
                              <div className={styles.hoursAgo1}>
                                2 hours ago
                              </div>
                              <div className={styles.byLucyHiddleston1}>
                                By Lucy Hiddleston | 4min read
                              </div>
                            </div>
                          </div>
                          <div className={styles.shareIconWrapper}>
                            <img
                              className={styles.shareIcon}
                              loading="lazy"
                              alt=""
                              src="/vector-44.svg"
                            />
                          </div>
                          <div className={styles.imageGrid}>
                            <div className={styles.imageRow}>
                              <div className={styles.imageCells}>
                                <img
                                  className={styles.vectorIcon}
                                  alt=""
                                  src="/vector-3.svg"
                                />
                                <div className={styles.emptyWrapper}>
                                  <div className={styles.empty}>28</div>
                                </div>
                              </div>
                              <div className={styles.imageCells}>
                                <img
                                  className={styles.vectorIcon1}
                                  alt=""
                                  src="/vector-4.svg"
                                />
                                <div className={styles.emptyWrapper}>
                                  <div className={styles.div}>72</div>
                                </div>
                              </div>
                              <img
                                className={styles.storyIcon}
                                alt=""
                                src="/vector-5.svg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.frameParent2}>
                        <div className={styles.liveParent}>
                          <div className={styles.live}>Live</div>
                          <img
                            className={styles.groupIcon}
                            loading="lazy"
                            alt=""
                            src="/group-281.svg"
                          />
                        </div>
                        <div className={styles.coachStoryContainerParent}>
                          <div className={styles.coachStoryContainer}>
                            <img
                              className={styles.maskGroupIcon2}
                              alt=""
                              src="/mask-group-2@2x.png"
                            />
                            <b className={styles.belovedArizonaCoach}>
                              Beloved Arizona coach loses battle with
                              coronavirus
                            </b>
                          </div>
                          <div className={styles.coachStoryButton}>
                            <Button
                              className={styles.bigButton}
                              disableElevation
                              variant="outlined"
                              sx={{
                                color: "#c31815",
                                fontSize: "14",
                                borderColor: "#c31815",
                                borderRadius: "2px",
                                "&:hover": { borderColor: "#c31815" },
                              }}
                            >
                              View More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.editorsPicksParent}>
                      <div className={styles.editorsPicks}>Editor’s Picks</div>
                      <div className={styles.editorPickIconTwo}>
                        <img
                          className={styles.editorPickTwoIconImage}
                          alt=""
                          src="/vector-6.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameParent3}>
                  <div className={styles.maskGroupParent}>
                    <img
                      className={styles.maskGroupIcon3}
                      alt=""
                      src="/mask-group-3@2x.png"
                    />
                    <div className={styles.placeholderGroup}>
                      <img
                        className={styles.placeholderIcon}
                        loading="lazy"
                        alt=""
                        src="/placeholder.svg"
                      />
                      <div className={styles.corona}>Corona</div>
                    </div>
                    <div className={styles.coronaBottomIconsWrapper}>
                      <div className={styles.coronaBottomIcons}>
                        <div className={styles.coronaIconPairOne}>
                          <img
                            className={styles.coronaIconOne}
                            alt=""
                            src="/vector-7.svg"
                          />
                          <div className={styles.coronaIconPairTwo}>
                            <div className={styles.coronaIconDivider}>28</div>
                          </div>
                        </div>
                        <div className={styles.coronaIconPairOne1}>
                          <img
                            className={styles.vectorIcon2}
                            alt=""
                            src="/vector-8.svg"
                          />
                          <div className={styles.coronaIconPairTwo}>
                            <div className={styles.div1}>72</div>
                          </div>
                        </div>
                        <img
                          className={styles.coronaBottomIcon}
                          alt=""
                          src="/vector-9.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.serologicalContainerWrapper}>
                    <div className={styles.serologicalContainer}>
                      <b className={styles.serologicalSurveysAre}>
                        Serological surveys are being conducted to test for
                        coronavirus antibodies. How useful are they?
                      </b>
                      <div className={styles.theAuthoritiesAre}>
                        The authorities are hoping to find that a substantial
                        proportion of the population has already been infected
                        with the virus – and so is immune.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameWrapper5}>
            <img
              className={styles.frameChild1}
              loading="lazy"
              alt=""
              src="/group-284.svg"
            />
          </div>
        </section>
      </main>
      <FrameComponent1 />
    </div>
  );
};

export default Desktop11;
