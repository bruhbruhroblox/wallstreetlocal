import styles from "./Header.module.css";

import { font } from "@fonts";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Header = (props) => {
  const header = props.header;
  const activate = props.activate;
  const fixed = props.fixed || false;

  const count = props.count;
  const onMouseEnter = props.onMouseEnter;
  const onMouseLeave = props.onMouseLeave;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: header.accessor });
  const style = fixed
    ? {}
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <button
      key={header.display}
      className={[
        styles["header-item"],
        header.active ? styles["header-clicked"] : "",
        fixed ? styles["header-fixed"] : "",
        !fixed && isDragging ? styles["header-dragging"] : "",
      ].join(" ")}
      onClick={() => activate()}
      onMouseEnter={onMouseEnter ? () => onMouseEnter() : () => {}}
      onMouseLeave={onMouseLeave ? () => onMouseLeave() : () => {}}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <span className={[font.className, styles["header-text"]].join(" ")}>
        {header.display}
      </span>
    </button>
  );
};

export default Header;
