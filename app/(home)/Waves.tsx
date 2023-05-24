import styles from './Waves.module.scss';

// https://codepen.io/goodkatz/pen/LYPGxQz
export default function Waves() {
  return (
    <svg className={styles["waves"]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 21 150 31" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        <path id="top-wave" d="M -160 44 C -130 44 -103 29 -76 29 S -38 42 -24 42 S -8 19 17 19 S 50 34 86 43 S 132 25 148 25 S 162 44 192 44 V 88 H -160 Z" />
        <path id="mid-wave" d="M -160 44 C -113 52 -103 29 -75 32 S -45 47 -31 51 S 8 35 34 36 S 62 39 88 47 S 132 27 149 26 S 180 44 192 44 V 88 H -160 Z" />
      </defs>
      <g className={styles["parallax"]}>
        <use xlinkHref="#gentle-wave" x="48" y="0" fill="transparent" />
        <use xlinkHref="#gentle-wave" x="48" y="-3" fill="#0091B3" />
        <use xlinkHref="#gentle-wave" x="48" y="5" fill="#006852" />
        <use xlinkHref="#gentle-wave" x="48" y="8" fill="#002E6D" />
      </g>
    </svg>
  )
}