import { Metadata } from "next";
import styles from "@/styles/Contact.module.css";

import Head from "next/head";
import { font } from "@fonts";

import MailSVG from "@/images/envelope.svg";
import DiscordSVG from "@/images/discord.svg";
import LinkedInSVG from "@/images/linkedin.svg";
export const metadata: Metadata = {
    title: `wallstreetlocal | Contact`,
};

export default function Contact() {
    return (<>
      
      <div className={[styles["contact"], font.className].join(" ")}>
        <h1 className={styles["contact-header"]}>Donation and Links</h1>
        <div className={styles["contact-info"]}>
          <div className={styles["contact-items"]}>
            {/* <span className={styles["info-header"]}>Info</span> */}
            <div className={styles["contact-item"]}>
              <MailSVG className={styles["contact-icon"]}/>
              <span className={styles["contact-text"]}>
                100anonyo@gmail.com
              </span>
            </div>
            <div className={styles["contact-item"]}>
              <DiscordSVG className={styles["contact-icon"]}/>
              <span className={styles["contact-text"]}>zipped1</span>
            </div>
            <div className={styles["contact-item"]}>
              <LinkedInSVG className={styles["contact-icon"]}/>
              <span className={styles["contact-text"]}>
                anonyo-noor-272540249
              </span>
            </div>
          </div>
          <iframe id="kofiframe" src="https://ko-fi.com/wallstreetlocal/?hidefeed=true&widget=true&embed=true&preview=true" className={styles["contact-kofi"]} height="712" title="wallstreetlocal"></iframe>
        </div>
      </div>
    </>);
}

