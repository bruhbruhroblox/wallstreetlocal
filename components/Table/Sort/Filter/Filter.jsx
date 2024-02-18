import styles from "./Filter.module.css";
import { useReducer } from "react";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDispatch, useSelector } from "react-redux";
import {
  selectHeaders,
  selectActive,
  selectSold,
  selectNa,
  sortActive,
  sortSold,
  sortNa,
  activateHeader,
  setHeaders,
} from "@/redux/filerSlice";

import Header from "./Header/Header";
import Tip from "@/components/Tip/Tip";

const Filter = () => {
  const headers = useSelector(selectHeaders);
  const sold = useSelector(selectSold);
  const na = useSelector(selectNa);
  const dispatch = useDispatch();

  const [event, setEvent] = useReducer((prev, next) => {
    return { ...prev, ...next };
  }, {});
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    })
  );

  const count = headers.length;
  const handleDragStart = (e) => {
    const header = headers.find((h) => h.accessor === e.active.id);
    setEvent({ ...e, dragging: true, header });
  };
  const handleDragEnd = (e) => {
    const active = e.active;
    const over = e.over;

    setEvent({
      ...e,
      dragging: false,
      header: null,
    });
    if (!over) return;

    const activeIndex = headers.findIndex(
      ({ accessor }) => accessor === active.id
    );
    const overIndex = headers.findIndex(({ accessor }) => accessor === over.id);
    const updatedHeaders = arrayMove(headers, activeIndex, overIndex);
    dispatch(setHeaders(updatedHeaders));
  };

  console.log(count);

  return (
    <div className={styles["filter-body"]}>
      <DndContext
        sensors={sensors}
        autoScroll={false}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles["filter-headers"]}>
          <SortableContext
            items={headers.map((header) => header.accessor)}
            strategy={horizontalListSortingStrategy}
          >
            {headers.map((h, index) => (
              <Header
                key={h.accessor}
                id={h.accessor}
                header={h}
                index={index}
                count={count}
                activate={() => dispatch(activateHeader(h.accessor))}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {event.header ? (
              <Header id={event.header.accessor} header={event.header} />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
      <div className={styles["filter-buttons"]}>
        {/* <Header
          header={{ display: "Updated", active }}
          activate={() => dispatch(sortActive())}
          fixed={true}
        /> */}
        <Header
          header={{ display: "Sold", active: sold }}
          activate={() => dispatch(sortSold())}
          count={2}
          fixed={true}
        />
        <Header
          header={{ display: "Unavailable", active: na }}
          activate={() => dispatch(sortNa())}
          count={2}
          fixed={true}
        />
      </div>
      <Tip text="Click any of the buttons above to show/hide headers on the table below. You can also drag the top headers to rearrange the columns." />
    </div>
  );
};

export default Filter;