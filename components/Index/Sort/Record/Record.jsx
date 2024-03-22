import styles from "./Record.module.css";

import { useSelector } from "react-redux";
import { selectCik, selectHeaders } from "@/redux/filerSlice";

import Link from "next/link";

import { font } from "@fonts";

import DataIcon from "@/images/data.svg";
import TableIcon from "@/images/csv.svg";

const server = process.env.NEXT_PUBLIC_SERVER;
const Record = (props) => {
  const cik = useSelector(selectCik);
  const headers = useSelector(selectHeaders);
  const variant = props.variant === "csv" ? "csv" : "";

  const headerString = JSON.stringify(headers);
  const url = new URL("/filers/record" + variant, server);
  url.searchParams.append("cik", cik);
  url.searchParams.append("headers", headerString);

  return (
    <Link
      href={url}
      target="_blank"
      className={styles["record-link"]}
      legacyBehavior
    >
      <button className={styles["record-button"]}>
        <span className={[styles["record-text"], font.className].join(" ")}>
          {variant === "csv" ? "Table" : "Data"}
        </span>
        {variant === "csv" ? (
          <TableIcon className={styles["record-icon"]} />
        ) : (
          <DataIcon className={styles["record-icon"]} />
        )}
      </button>
    </Link>
  );
};

export default Record;
