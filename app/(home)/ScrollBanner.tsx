import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ScrollBanner.module.scss";
import Waves from "./Waves";

const Inabakumori = () => {
  return (
    <div className={styles["banner__text"] + " " + styles["banner__text--inaba"]}>
      <Image src="/img/rain.webp" alt="rain" fill />
    </div>
  )
}

const Inablock = () => {
  return (
    <div className={styles["banner__text"] + " " + styles["banner__text--inaba"]}>
      <Image src="/img/block.webp" alt="block" fill />
    </div>
  )
}

const SoundTransit = () => {
  return (
    <div className={styles["sound__container"] + " " + styles["banner__text"] + " " + styles["banner__text--sound"]}>
      <div className={styles["sound__waves"]}>
        <div className={styles["sound__logo__container"]}>
          <Image src="/img/sound_transit_logo.svg" alt="sound transit logo" fill />
        </div>
        <Waves />
        <div className={styles["sound__waves__bottom"]} />
      </div>
    </div>
  )
}

const bannerElements = [
  <Inabakumori key="inaba" />,
  <Inablock key="block" />,
  <SoundTransit key="sound" />,
  <Image src="/img/site.webp" alt="site" fill key="site" />,
  <Image src="/img/asa_banner.webp" alt="asayake" fill key="asayake" />,
  <Image src="/img/logs.webp" alt="logs" fill key="logs" />,
]

export default function ScrollBanner() {
  const [bannerElement, setBannerElement] = useState<React.ReactNode>(bannerElements[0]);
  const [lastProgress, setLastProgress] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const progress = scrollTop / (documentHeight - windowHeight);
    setScrollProgress(progress);
  };

  const handleBannerChange = () => {
    let currentProgress = 0;
    const bannerElement = document.querySelector(`.${styles["scroll__element"]}`) as HTMLElement;

    if (scrollProgress < 0.15) {
      currentProgress = 0;
    } else if (scrollProgress < 0.3) {
      currentProgress = 1;
    } else if (scrollProgress < 0.5) {
      currentProgress = 2;
    } else if (scrollProgress < 0.7) {
      currentProgress = 3;
    } else if (scrollProgress < 0.9) {
      currentProgress = 4;
    } else {
      currentProgress = 5;
    }

    if (currentProgress !== lastProgress) {
      bannerElement.classList.add(styles["scroll__element--fade"]);
      setTimeout(() => {
        bannerElement.classList.remove(styles["scroll__element--fade"]);
        setBannerElement(bannerElements[currentProgress]);
      }, 200);
    }
    setLastProgress(currentProgress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    handleBannerChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollProgress]);

  return (
    <div className={styles["scroll__element"]}>
      {bannerElement}
    </div>
  );
}

