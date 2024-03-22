import { Metadata } from "next";
import styles from "@/styles/Resources.module.css";

import Head from "next/head";
import Link from "next/link";
import { font } from "@fonts";
export const metadata: Metadata = {
    title: `wallstreetlocal | Resources`,
};

export default function Resources() {
    return (<>
    {" "}
    <div className={styles["resources"]}>
      <div className={styles["resources-head"]}>
        <h1 className={[styles["resources-header"], font.className].join(" ")}>
          Resources
        </h1>
        <span className={[styles["resources-description"], font.className].join(" ")}>
          All data used is publicly available via the SEC. The following
          contains useful links and information about SEC registered
          companies.
        </span>
      </div>
      <div className={styles["resources-body"]}>
        <div className={styles["resources-item"]}>
          <Link href="https://www.sec.gov/edgar/search/" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              SEC EDGAR Search
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Add 13F to the filing category field to find companies that have
            filed 13F filings)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="https://www.sec.gov/files/company_tickers.json" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Ticker Archive
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Bulk data via the SEC)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="https://www.sec.gov/Archives/edgar/daily-index/bulkdata/submissions.zip" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Submissions Archive
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Bulk data via the SEC)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="http://www.sec.gov/Archives/edgar/daily-index/xbrl/companyfacts.zip" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Company Facts Archive
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Bulk data via the SEC)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="https://www.sec.gov/forms" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Form Data
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Explanations for different form types)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="https://drive.google.com/file/d/1LT4xiFJkh6YlAPQDcov8YIKqcvevFlEE/view" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Company Database
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Search database for companies, created by wallstreetlocal,
            formatted in BSON)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="https://gist.github.com/leftmove/daca5d470c869e9d6f14c298af809f9f" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Popular Filers
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Gist listing popular filers, taken from various sources. This is
            where the popular filers page gets its list from.)
          </span>
        </div>
        <div className={styles["resources-item"]}>
          <Link href="https://gist.github.com/leftmove/1e96a95bad8e590a440e37f07d305d2a" target="_blank" legacyBehavior>
            <button className={[styles["resources-button"], font.className].join(" ")}>
              Top Filers
            </button>
          </Link>
          <span className={[styles["button-tooltip"], font.className].join(" ")}>
            (Gist listing top filers, taken from various sources. This is
            where the top filers page gets its list from.)
          </span>
        </div>
      </div>
      <span className={[styles["resources-description"], font.className].join(" ")}>
        While not all data collected and formatted by wallstreetlocal is
        available by bulk because of data costs, you can download resources
        for individual filers by visiting their respective pages.
      </span>
    </div>
  </>);
}

