import styles from "../Gain.module.css";

import { useDroppable } from "@dnd-kit/core";

import { useDispatch } from "react-redux";
import { removeDate } from "@/redux/filerSlice";

import TrashSVG from "./trash.svg";

const Trash = (props) => {
  const event = props.event;
  const dispatch = useDispatch();

  const id = "trash";
  const { setNodeRef } = useDroppable({ id: id });

  return (
    <div ref={setNodeRef}>
      <button
        className={[
          styles["drop-button"],
          event.dragging ? styles["drop-button-drag"] : "",
          // event.dragging && event.over.id === id
          //   ? styles["drop-button-over"]
          //   : "",
        ].join(" ")}
      >
        <TrashSVG className={styles["drop-svg"]} />
      </button>
    </div>
  );
};

export default Trash;
