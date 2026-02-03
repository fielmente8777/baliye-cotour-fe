"use client";
import dynamic from "next/dynamic";

import Button from "@/components/Button/Button";
import * as animationData from "../../json/success.json";
// import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./page.module.css";

export default function Page({}) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
    { ssr: false },
  );

  return (
    <div className={styles.success}>
      <Player
        autoplay
        loop
        keepLastFrame={false}
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      />
      <div className={styles.title}>Your order was placed successfully</div>
      <div className={styles.ordernum}>Order #1233454252552</div>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div className={styles.hr} />
        <div className={styles.greenTag}>Your Orders</div>
        <div className={styles.hr} />
      </div>

      <div className={styles.orderList}>
        <div className={styles.card}>
          <img src="/png/product2.png" className={styles.cardImg} />
          <div className={styles.cardTitle}>Banarsi Saree</div>
          <div className={styles.cardSub}>
            Tailored and delivered in 3 weeks
          </div>
        </div>

        <div className={styles.card}>
          <img src="/png/product2.png" className={styles.cardImg} />
          <div className={styles.cardTitle}>Banarsi Saree</div>
          <div className={styles.cardSub}>
            Tailored and delivered in 3 weeks
          </div>
        </div>

        <div className={styles.card}>
          <img src="/png/product2.png" className={styles.cardImg} />
          <div className={styles.cardTitle}>Banarsi Saree</div>
          <div className={styles.cardSub}>
            Tailored and delivered in 3 weeks
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "80px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <Button type="secondary">Continue Shopping</Button>
        <Button>View Order Status</Button>
      </div>
    </div>
  );
}
