import { useState } from "react";
import styles from "./Expand.module.css";

import ExpandSVG from "@/images/expand.svg";

const Expand = ({ onClick, expandState }) => {
  const [clickState, setClick] = useState(false);
  const click = expandState ? expandState : clickState;

  return (
    <button
      className={[styles.expand, click ? styles.clicked : ""].join(" ")}
      onClick={() => {
        setClick(!click);
        onClick();
      }}
    >
      <ExpandSVG />
    </button>
  );
};

export default Expand;
