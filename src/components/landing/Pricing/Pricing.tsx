import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className={`${styles.content}`}>
        <h2>Pricing</h2>

        <div id="plans" className={styles.plans}>
          <div className={styles.plan}>
            <div className={styles.details}>
              <h3>
                <span className={styles.discounted}>$18</span>{" "}
                <strong className={styles.newPrice}>$9</strong>
                <sub className={styles.sub}>per month</sub>
              </h3>

              <ul className={styles.features}>
                <li>
                  <strong>600</strong> total messages per month
                </li>
                <li>Profile context</li>
                <li>Conversation history context</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
