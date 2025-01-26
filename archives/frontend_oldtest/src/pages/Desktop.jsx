import GroupComponent1 from "../components/GroupComponent1";
import GroupComponent from "../components/GroupComponent";
import GroupComponent2 from "../components/GroupComponent2";
import styles from "./Desktop.module.css";

const Desktop = () => {
  return (
    <div className={styles.desktop1}>
      <GroupComponent1 />
      <section className={styles.balance}>
        <div className={styles.balanceDetails}>
          <div className={styles.transactions}>
            <GroupComponent />
            <GroupComponent />
          </div>
        </div>
        <GroupComponent2 />
      </section>
    </div>
  );
};

export default Desktop;
