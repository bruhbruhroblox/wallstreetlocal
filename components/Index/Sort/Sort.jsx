import { useState } from "react";
import styles from "./Sort.module.css";

import Filter from "./Filter/Filter";
import Gain from "./Gain/Gain";
import Record from "./Record/Record";
import Tip from "components/Tip/Tip";

const Sort = () => {
  return (
    <>
      <Filter />
      <Gain />
      <div className={styles["sort-records"]}>
        <div className={styles["sort-downloads"]}>
          <Record variant="json" />
          <Record variant="csv" />
        </div>
        <Tip text="Downloads for bulk data." />
      </div>
    </>
  );
};

export default Sort;
