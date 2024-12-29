import { useEffect, useState } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import { motion } from "motion/react";
// change colors to gift wrapper colors

const pattern1 = (
  bg: string,
  fg: string
) => `radial-gradient(${fg} 3px, transparent 0.5px),
radial-gradient(${fg} 3px, ${bg} 0.5px)`;

const pattern2 = (
  bg: string,
  fg: string
) => `linear-gradient(135deg,${fg} 25%, transparent 25%),
linear-gradient(225deg,${fg} 25%, transparent 25%),
linear-gradient(45deg,${fg} 25%, transparent 25%),
linear-gradient(315deg,${fg} 25%,${bg} 25%)
`;

const pattern3 = (
  bg: string,
  fg: string
) => `linear-gradient(135deg, ${fg} 25%, transparent 25%),
linear-gradient(225deg, ${fg} 25%, transparent 25%),
linear-gradient(45deg, ${fg} 25%, transparent 25%),
linear-gradient(315deg, ${fg} 25%, ${bg} 25%)
`;

const pattern4 = (bg: string, fg: string) =>
  `repeating-linear-gradient(45deg, ${fg}, ${fg} 7px, ${bg} 7px, ${bg} 17.5px)`;

const list = [
  {
    name: "one",
    backgroundColor: "#FB607F",
    backgroundImage: pattern1("#FB607F", "#FFD700"),
    classNames: [styles.pattern1],
    direction: "translateX",
  },
  {
    name: "two",
    backgroundColor: "#FB607F",
    backgroundImage: pattern2("#1E90FF", "#AFDBF5"),
    classNames: [styles.pattern2],
    direction: "translateY",
  },
  {
    name: "three",
    backgroundImage: pattern4("#E6E6FA", "#CCCCFF"),
    direction: "translateX",
  },
  {
    name: "four",
    backgroundImage: pattern2("#F1DDCF", "#FF91AF"),
    classNames: [styles.pattern2],
    direction: "translateY",
  },
  {
    name: "five",
    backgroundImage: pattern1("#F1DDCF", "#FF91AF"),
    classNames: [styles.pattern1],
    direction: "translateX",
  },
  {
    name: "six",
    backgroundImage: pattern3("#F0F8FF", "#45B1E8"),
    classNames: [styles.pattern3],
    direction: "translateY",
  },
  {
    name: "seven",
    backgroundImage: pattern4("#9F8170", "#EFDECD"),
    direction: "translateX",
  },
  {
    name: "eight",
    backgroundImage: pattern3("#FFDAE9", "#FBAED2"),
    classNames: [styles.pattern3],
    direction: "translateY",
  },
  {
    name: "nine",
    backgroundImage: pattern2("#E9EDF5", "#6082B6"),
    classNames: [styles.pattern2],
    direction: "translateX",
  },
  {
    name: "ten",
    backgroundImage: pattern4("#856088", "#F2C1D1"),
    direction: "translateX",
  },
  {
    name: "eleven",
    backgroundImage: pattern1("#6F00FF", "#FFD700"),
    classNames: [styles.pattern1],
    direction: "translateY",
  },
];

const Gifts = () => {
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const playSound = () => {
    const audio = new Audio("/swipe.mp3");
    audio.play();
  };

  const handleClick = async (idx: number) => {
    if (opened.has(idx)) return;
    playSound();
    setOpened((prev: Set<number>) => {
      const newSet = new Set(prev);
      newSet.add(idx);
      return newSet;
    });
  };

  useEffect(() => {
    const handleSpaceBarClick = async (e: KeyboardEvent) => {
      const arr = Array.from({ length: 11 }, (_, i) => i);
      if (e.key === " " && e.ctrlKey) setOpened(new Set(arr));
      else if (e.key === " ") setOpened(new Set());
    };
    window.addEventListener("keydown", handleSpaceBarClick);
    return () => window.removeEventListener("keydown", handleSpaceBarClick);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.title}>HAPPY NEW YEAR</div>
      <div className={styles.grid}>
        {list.map((item, idx) => (
          <motion.div
            className={cn(styles.item, styles[`b${idx}`])}
            onClick={() => handleClick(idx)}
            key={idx}
            initial={{
              scale: 0.8,
            }}
            animate={{
              scale: 1,
              transition: {
                type: "spring",
                duration: 1,
                bounce: 0.5,
                ease: "easeInOut",
              },
            }}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.5,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 0.95,
            }}
          >
            <div className={styles.back}>{item.name}</div>
            <motion.div
              className={cn(...(item.classNames || []), styles.front)}
              initial={{
                [item.direction]: 0,
              }}
              animate={{
                [item.direction]: `${
                  opened.has(idx) ? "calc(-100% + 10px)" : 0
                }`,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: item.backgroundImage,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
