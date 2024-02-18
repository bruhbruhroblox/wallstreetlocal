import styles from "./Navigation.module.css";

import Link from "next/link";
import { font } from "@fonts";

import Search from "@/components/Search/Button/Search";
import Bar from "@/components/Bar/Bar";

const Item = ({ link, text, tab }) => (
  <li className={styles["item"] + " " + font.className}>
    <Link href={link} target={tab ? "_blank" : null}>
      {text}
    </Link>
  </li>
);

const Navigation = (props) => {
  const variant = props.variant || null;
  return (
    <>
      <Bar />
      <nav className={styles["nav"]}>
        <div className={styles["logo"]}>
          <div className={styles["logo-title"]}>
            <Link href="/">
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
        <div>
          <ul className={styles["about"]}>
            <Item link="/recommended/top" text="Top Filers" />
            <Item link="/recommended/searched" text="Popular Filers" />
            <Item link="/about/resources" text="Resources" />
            <Item
              link="https://github.com/bruhbruhroblox"
              text="Contact"
              tab={true}
            />
            <Item
              link="https://github.com/bruhbruhroblox/wallstreetlocal"
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