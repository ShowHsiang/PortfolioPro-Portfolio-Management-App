import PropTypes from "prop-types";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.bigButtonWrapper}>
        <div className={styles.bigButton}>
          <div className={styles.button} />
          <div className={styles.playNow}>View More</div>
        </div>
      </div>
      <div className={styles.editorPickContainer}>
        <div className={styles.editorPickContainerInner}>
          <div className={styles.frameGroup}>
            <div className={styles.editorsPicksParent}>
              <div className={styles.editorsPicks}>Editor’s Picks</div>
              <div className={styles.editorPickIconThree}>
                <img
                  className={styles.editorPickThreeIconImage}
                  alt=""
                  src="/vector-10.svg"
                />
              </div>
            </div>
            <div className={styles.maskGroupParent}>
              <img
                className={styles.maskGroupIcon}
                alt=""
                src="/mask-group-4@2x.png"
              />
              <div className={styles.bottomIconPairOne}>
                <img
                  className={styles.bottomIconOne}
                  alt=""
                  src="/vector-11.svg"
                />
                <div className={styles.bottomIconPairTwo}>
                  <div className={styles.bottomIconDivider}>28</div>
                </div>
              </div>
              <div className={styles.bottomIconPairOne1}>
                <img
                  className={styles.vectorIcon}
                  alt=""
                  src="/vector-12.svg"
                />
                <div className={styles.bottomIconPairTwo}>
                  <div className={styles.div}>72</div>
                </div>
              </div>
              <div className={styles.placeholderContainerParent}>
                <div className={styles.placeholderContainer}>
                  <img
                    className={styles.placeholderIcon}
                    alt=""
                    src="/placeholder-1.svg"
                  />
                  <div className={styles.corona}>Corona</div>
                </div>
                <div className={styles.bottomPlaceholder}>
                  <img
                    className={styles.bottomPlaceholderIcon}
                    alt=""
                    src="/vector-13.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.serologicalContainerTwoParent}>
          <div className={styles.serologicalContainerTwo}>
            <div className={styles.serologicalContent}>
              <div className={styles.serologicalSurveysAreBeingParent}>
                <b className={styles.serologicalSurveysAre}>
                  Serological surveys are being conducted to test for
                  coronavirus antibodies. How useful are they?
                </b>
                <div className={styles.theAuthoritiesAre}>
                  The authorities are hoping to find that a substantial
                  proportion of the population has already been infected with
                  the virus – and so is immune.
                </div>
              </div>
            </div>
            <img
              className={styles.maskGroupIcon1}
              alt=""
              src="/mask-group-5@2x.png"
            />
          </div>
          <div className={styles.serologicalIcon}>
            <img
              className={styles.serologicalIconChild}
              alt=""
              src="/group-284-1.svg"
            />
          </div>
        </div>
        <div className={styles.markContainerWrapper}>
          <div className={styles.markContainer}>
            <b className={styles.serologicalSurveysAre}>
              Making a mark in Asia: East Bengal’s 2003 Asean Cup win – a
              defining moment for Indian club football
            </b>
            <div className={styles.beatingSomeOf}>
              Beating some of the finest teams from South Asia, East Bengal
              became the first Indian club to win an officially recognised Asian
              football tournament.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
