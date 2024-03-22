import styles from "./Navigation.module.css";

import Link from "next/link";
import { font } from "@fonts";

import Search from "components/Search/Button/Search";
import Bar from "components/Bar/Bar";

const Item = ({ link, text, tab }) => (
  <li className={styles["item"] + " " + font.className}>
    <Link href={link} target={tab ? "_blank" : null} legacyBehavior>
      {text}
    </Link>
  </li>
);

const server = process.env.NEXT_PUBLIC_SERVER;
const Navigation = (props) => {
  const variant = props.variant || null;
  return (
    <>
      <Bar />
      <nav className={styles["nav"]}>
        <div className={styles["logo"]}>
          <div className={styles["logo-title"]}>
            <Link href="/" legacyBehavior>
              <span
                className={styles["logo-text"] + " " + font.className}
                id={styles["whale"]}
              >
                <i>wallstreet</i>
              </span>
              <span
                className={styles["logo-text"] + " " + font.className}
                id={styles["market"]}
              >
                {" "}
                local
              </span>
            </Link>
          </div>
          {variant === "home" ? null : <Search />}
        </div>
        <div className={styles["links"]}>
          <ul className={styles["links-list"]}>
            <Item link="/recommended/top" text="Top Filers" />
            <Item link="/recommended/searched" text="Popular Filers" />
            <Item link="/about/resources" text="Resources" />
            <Item link={server + "/docs"} text="API" tab={true} />
            <Item
              link="https://github.com/leftmove"
              text="Contact"
              tab={true}
            />
            <Item
              link="https://ko-fi.com/wallstreetlocal"
              text="Donate"
              tab={true}
            />
            <Item
              link="https://github.com/leftmove/wallstreetlocal"
              text="Source"
              tab={true}
            />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
