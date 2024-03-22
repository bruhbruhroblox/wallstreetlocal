import { Metadata } from "next";
import styles from "@/styles/Home.module.css";

import Head from "next/head";

import LegacyImage from "next/legacy/image";

import { font, fontLight, fontBold } from "@fonts";

import Layout from "components/Layouts/Home";

import Search from "components/Search/Homepage/Search";
import Recommended from "components/Recommended/Recommended";

import Hero from "@/images/hero.jpg";
import FolderIcon from "@/images/folder.svg";
import FileIcon from "@/images/file.svg";
import BookIcon from "@/images/book.svg";
export const metadata: Metadata = {
    title: `
          wallstreetlocal | Advice from the world&apos;s biggest investors
        `,
    description: "Thousands of filings from the world's biggest investors. Wall Street's stock portfolio, for free.",
    viewport: "width=device-width, initial-scale=1",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function Home() {
    return (<>
      
      <div className={styles["landing"]}>
        <div className={styles["landing-hero"]}>
          <LegacyImage className={styles["hero-image"]} src={Hero} alt="landing skyscraper" sizes="100%"/>
        </div>
        <div className={styles["search-header"]}>
          <Search />
          <div className={styles["header"]}>
            <span className={[styles["search-hint"], font.className].join(" ")}>
              Nothing to search? See filers sorted by popularity and value in
              the top right corner.
            </span>
            <span className={[styles["main-header"], fontBold.className].join(" ")}>
              Thousands of filings from the world&apos;s biggest investors.
            </span>
            <span className={[styles["sub-header"], font.className].join(" ")}>
              Wall Street&apos;s stock portfolio, for free.
            </span>
          </div>
        </div>
        <Recommended className={styles["recommended-header"]} variant="homepage"/>
      </div>
      <main className={styles["explore"]}>
        <span className={[styles["explore-header"], fontBold.className].join(" ")}>
          Explore historical stock data, directly from the SEC.
        </span>
        <p className={[styles["explore-explanation"], fontLight.className].join(" ")}>
          The Securities and Exchange Commission (SEC) keeps record of every
          company in the United States. Companies whose holdings surpass $100
          million though, are required to file a special type of form: the 13F
          form. This form, filed quarterly, discloses the filer's holdings,
          providing transparency into their investment activities and allowing
          the public and other market participants to monitor them.
        </p>
        <p className={[styles["explore-explanation"], fontLight.className].join(" ")}>
          The problem though, is that these holdings are often cumbersome to
          access, and valuable analysis is often hidden behind a paywall.
          Through wallstreetlocal, the SEC's 13F filers become more accessible
          and open.
        </p>
        {/* <div className={styles["selling-points"]}>
          <div className={styles["selling-point"]}>
            <FolderIcon className={styles["selling-svg"]} />
            <div className={styles["selling-text"]}>
              <span
                className={[styles["selling-header"], font.className].join(" ")}
              >
                Stock Data
              </span>
              <span
                className={[
                  styles["selling-description"],
                  fontLight.className,
                ].join(" ")}
              >
                Stocks from over 20 years, matched with external data to create
                accurate, consistent, and useful analysis.
              </span>
            </div>
          </div>
          <div className={styles["selling-point"]}>
            <FileIcon className={styles["selling-svg"]} />
            <div className={styles["selling-text"]}>
              <span
                className={[styles["selling-header"], font.className].join(" ")}
              >
                SEC Filings
              </span>
              <span
                className={[
                  styles["selling-description"],
                  fontLight.className,
                ].join(" ")}
              >
                Filings directly from the SEC, served in an accessible format.
                Over 20 years of coverage.
              </span>
            </div>
          </div>
          <div className={styles["selling-point"]}>
            <BookIcon className={styles["selling-svg"]} />
            <div className={styles["selling-text"]}>
              <span
                className={[styles["selling-header"], font.className].join(" ")}
              >
                Free Forever
              </span>
              <span
                className={[
                  styles["selling-description"],
                  fontLight.className,
                ].join(" ")}
              >
                The entire backlog of the SEC, free and without quotas.
              </span>
            </div>
          </div>
        </div> */}
      </main>
    </>);
}

Home.getLayout = ({ Component, pageProps }) => (<Layout>
    <Component {...pageProps}/>
  </Layout>);

