import styles from "./Select.module.css";
import { useState, useEffect } from "react";

import useSWR from "swr";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  addHeader,
  updateStocks,
  selectCik,
  selectHeaders,
  removeHeader,
  editHeader,
} from "@/redux/filerSlice";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { font } from "@fonts";

import Picker from "./Picker/Picker";
import Loading from "components/Loading/Loading";

// const animateLayoutChanges = (args) => {
//   const { isSorting, wasSorting } = args;

//   if (isSorting || wasSorting) {
//     return defaultAnimateLayoutChanges(args);
//   }

//   return true;
// };

const server = process.env.NEXT_PUBLIC_SERVER;
const getFetcher = (url, cik, time) =>
  axios
    .get(url, { params: { cik: cik, time: time } })
    .then((r) => r.data)
    .catch((e) => console.error(e));

const Select = (props) => {
  const propDate = props.date;
  const accessor = propDate.accessor;
  const index = props.index;
  const dispatch = useDispatch();
  const cik = useSelector(selectCik) || false;
  const headers = useSelector(selectHeaders);

  const date =
    useSelector((state) =>
      state.filer.dates.find((d) => d.accessor == propDate.accessor),
    ) || propDate;
  const open = date.open;
  const time = date.timestamp;
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(
    open || cik === false ? null : [server + "/stocks/timeseries", cik, time],
    ([url, cik, time]) => getFetcher(url, cik, time),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  useEffect(() => {
    if (open) return;

    if (data) {
      const timeseries = {};
      data.stocks.forEach((price) => {
        const close = price.close_str;
        const cusip = price.cusip;
        timeseries[cusip] = close;
      });

      dispatch(
        updateStocks({
          field: accessor,
          values: timeseries,
        }),
      );
      const display = `${date.month}/${date.day}/${date.year}`;
      dispatch(editHeader({ accessor: accessor, display: display }));
    }
  }, [open, data, accessor, dispatch, date]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: accessor });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const active = headers.find((h) => h.accessor == accessor) ? false : true;
  const handleTable = () => {
    const header = headers.find((h) => h.accessor == accessor);

    const display = `${date.month + 1}/${date.day}/${date.year}`;
    const tooltip = `The prices of the stocks at ${date.month + 1}/${
      date.day
    }/${date.year}.`;
    if (header) {
      dispatch(removeHeader(accessor));
    } else {
      dispatch(
        addHeader({
          display,
          sort: accessor,
          tooltip,
          accessor: accessor,
          active: true,
        }),
      );
    }
  };

  const handleDownload = () => {
    window.open(
      server +
        "/filers/record/timeseries/?" +
        new URLSearchParams({ cik, time }),
      "_blank",
    );
  };

  if (error) {
    console.error(e);
  }

  return (
    <div
      className={styles["date"]}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {loading ? <Loading /> : null}
      <Picker date={date} index={index} />
      <button
        className={[
          styles["button"],
          active ? "" : styles["remove-table"],
          font.className,
        ].join(" ")}
        onClick={() => handleTable()}
      >
        <span className={font.className}>Table</span>
      </button>
      <button
        className={[styles["button"], styles["download"], font.className].join(
          " ",
        )}
        onClick={() => handleDownload()}
      >
        <span className={font.className}>Download</span>
      </button>
    </div>
  );
};

export default Select;
