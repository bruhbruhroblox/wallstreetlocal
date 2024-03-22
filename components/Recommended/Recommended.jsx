import styles from "./Recommended.module.css";
import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";

import { font } from "@fonts";

import { convertTitle } from "components/Filer/Info";

const server = process.env.NEXT_PUBLIC_SERVER;
const Recommended = (props) => {
  const variant = props.variant || "default";
  const [show, setShow] = useState(false);
  const [topFilers, setTopFilers] = useState([]);
  const [searchedFilers, setSearchedFilers] = useState([]);
  useEffect(() => {
    topFilers == []
      ? null
      : axios
          .get(server + "/filers/top")
          .then((r) => r.data)
          .then((data) => setTopFilers(data.filers || null));
    searchedFilers == []
      ? null
      : axios
          .get(server + "/filers/searched")
          .then((r) => r.data)
          .then((data) => setSearchedFilers(data.filers || null));

    window.addEventListener(
      "scroll",
      () => {
        setShow(true);
      },
      true,
    );
    return () => window.removeEventListener("scroll", () => {}, true);
  }, []);

  return (
    <div
      className={[
        styles["recommended"],
        variant === "homepage"
          ? show
            ? styles["recommended-slide-up"]
            : ""
          : "",
        variant === "homepage" ? styles["recommended-homepage"] : "",
        props.className || "",
      ].join(" ")}
    >
      <span className={[styles["recommended-title"], font.className].join(" ")}>
        Recommended Filers
      </span>
      <div className={[styles["recommended-lists"], font.className].join(" ")}>
        <div className={styles["recommended-list"]}>
          <Link href="/recommended/top" legacyBehavior>
            <span className={styles["list-title"]}>Most Assets</span>
          </Link>
          <ul>
            {topFilers
              .slice(0, 5)
              .map((f) => {
                return { ...f, title: convertTitle(f.name) };
              })
              .map((filer) => (
                <li className={styles["recommended-item"]}>
                  <Link href={`/filers/${filer.cik}`} legacyBehavior>
                    <span>{convertTitle(filer.title)}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles["recommended-list"]}>
          <Link href="/recommended/searched" legacyBehavior>
            <span className={styles["list-title"]}>Most Searched</span>
          </Link>
          <ul>
            {searchedFilers
              .slice(0, 5)
              .map((f) => {
                return { ...f, title: convertTitle(f.name) };
              })
              .map((filer) => (
                <li className={styles["recommended-item"]} key={filer.cik}>
                  <Link href={`/filers/${filer.cik}`} legacyBehavior>
                    <span>{filer.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Recommended;
