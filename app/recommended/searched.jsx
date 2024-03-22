import { Metadata } from "next";
import styles from "@/styles/Top.module.css";

import Head from "next/head";
import Link from "next/link";

import axios from "axios";

import { font } from "@fonts";
import { convertTitle } from "components/Filer/Info";
export const metadata: Metadata = {
    title: `Searched Filers`,
};

// TODO: implement this function
async function getFilers() { }

const headers = [
    { display: "Name", accessor: "name" },
    { display: "CIK", accessor: "cik" },
    { display: "Assets Under Management", accessor: "market_value" },
    { display: "Last Updated", accessor: "date" },
];

const Searched = (props) => {
    return (<>
    
    <div className={styles["header"]}>
      <span className={[styles["main-header"], font.className].join(" ")}>
        Searched Filers
      </span>
    </div>
    <div className={styles["description"]}>
      <span className={[styles["description-text"], font.className].join(" ")}>
        The following contains links and information for the most popular 13F
        filers, sorted by market value. All filers may not have info readily
        available, or be sorted correctly.
      </span>
    </div>
    <div className={styles["table-container"]}>
      <table className={styles["table"]}>
        <thead>
          <tr>
            {headers.map((header) => (<th className={[
                styles["column"],
                styles["header-column"],
                font.className,
            ].join(" ")}>
                {header.display}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {props.filers.map((filer) => {
            return ((<tr key={filer.cik}>
                {headers.map((header) => {
                    const accessor = header.accessor;
                    let display = filer[accessor];
                    switch (accessor) {
                        case "name":
                            display = convertTitle(display);
                            display = (<Link href={`/filers/${filer.cik}`} className={styles["column-link"]} legacyBehavior>
                          {display}
                        </Link>);
                            break;
                        case "cik":
                            display = display.padStart(10, "0");
                        case "date":
                        case "market_value":
                        default:
                            break;
                    }
                    return (<td className={[styles["column"], font.className].join(" ")}>
                      {display}
                    </td>);
                })}
              </tr>));
        })}
        </tbody>
      </table>
    </div>
  </>);
};

const server = process.env.NEXT_PUBLIC_SERVER;
export async function getServerSideProps() {
    const data = await axios
        .get(server + "/filers/searched")
        .then((r) => r.data)
        .catch((e) => console.log(e));
    const filers = data?.filers || [];
    return {
        props: {
            filers,
        },
    };
}

export default Searched;

