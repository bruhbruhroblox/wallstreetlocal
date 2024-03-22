import styles from "./Filter.module.css";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectHeaders,
  selectSold,
  selectNa,
  sortSold,
  sortNa,
  activateHeader,
  setHeaders,
} from "@/redux/filerSlice";

import { font, fontLight } from "@fonts";

import Tip from "components/Tip/Tip";
import Headers from "components/Headers/Headers";

const Filter = () => {
  const headers = useSelector(selectHeaders);
  const sold = useSelector(selectSold);
  const na = useSelector(selectNa);
  const dispatch = useDispatch();

  const initialHeader = headers[0];
  const [description, setDescription] = useState({
    title: initialHeader.display,
    text: initialHeader.tooltip,
  });
  const updateDescription = (d) => setDescription(d);
  const updateHeaders = (h) => dispatch(setHeaders(h));
  const updateActivation = (a) => dispatch(activateHeader(a));
  const updateSold = () => dispatch(sortSold());
  const updateNa = () => dispatch(sortNa());

  return (
    <div className={styles["filter-body"]}>
      <div className={styles["filter-description"]}>
        <span className={[styles["filter-display"], font.className].join(" ")}>
          {description.title}
        </span>
        <span
          className={[styles["filter-text"], fontLight.className].join(" ")}
        >
          {description.text}
        </span>
      </div>
      <Headers
        headers={headers}
        sold={sold}
        na={na}
        updateDescription={updateDescription}
        updateActivation={updateActivation}
        updateHeaders={updateHeaders}
        updateSold={updateSold}
        updateNa={updateNa}
      />
      <Tip
        text="Click any of the buttons above to show/hide headers on the table below. You can also drag the top headers to rearrange the columns."
        top={20}
      />
    </div>
  );
};

export default Filter;
