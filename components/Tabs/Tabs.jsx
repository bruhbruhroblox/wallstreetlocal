import { useRouter } from "next/navigation";
import { router } from 'next/navigation';

import { useSearchParams } from "next/navigation";
import styles from "./Tabs.module.css";


import { useDispatch, useSelector } from "react-redux";
import { selectTab, setTab } from "@/redux/filerSlice";

import { font, fontLight } from "@fonts";

const Tab = (props) => {
    const id = props.id;
    const tab = props.tab;
    const index = props.index + 1;
    const handleTab = props.handleTab;

    const length = props.length;
    const hint = props.hint || null;
    return (<div className={styles["tab-container"]}>
      <div className={[
            styles["tab"],
            index === 1 ? styles["first-tab"] : "",
            index === length ? styles["last-tab"] : "",
            tab === id ? styles["tab-clicked"] : "",
            font.className,
        ].join(" ")} onClick={() => handleTab(id)}>
        {props.title}
      </div>
      {hint ? (<span className={[styles["tab-tip"], fontLight.className].join(" ")}>
          ({hint})
        </span>) : null}
    </div>);
};

const tabs = [
    { title: "Stocks", hint: "Table", id: "stocks" },
    { title: "Charts", hint: "Graphs", id: "charts" },
    { title: "Filings", hint: "Comparisons", id: "filings" },
];

const Tabs = () => {
    const searchParams = useSearchParams();
    const tab = useSelector(selectTab);
    const dispatch = useDispatch();

    const router = useRouter();
    const handleTab = (value) => {
        const router = useRouter();
 searchParams?.get("tab") = value;
        router.push(router);
        dispatch(setTab(value));
    };

    return (<div className={styles["tabs"]}>
      {tabs.map((t, index) => (<Tab id={t.id} tab={tab} handleTab={handleTab} length={tabs.length} key={t.id} hint={t.hint} index={index} title={t.title}/>))}
    </div>);
};

export default Tabs;

