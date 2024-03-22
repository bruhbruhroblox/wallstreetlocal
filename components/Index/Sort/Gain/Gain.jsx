import styles from "./Gain.module.css";
import { useReducer } from "react";

import {
  selectDates,
  updateDates,
  newDate,
  openDate,
  removeDate,
} from "@/redux/filerSlice";
import { useDispatch, useSelector } from "react-redux";

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
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import Select from "./Select/Select";
import Plus from "./Droppable/Plus";
import Trash from "./Droppable/Trash";
import Tip from "components/Tip/Tip";

const Gain = () => {
  const dates = useSelector(selectDates);
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
    }),
  );

  const handleDragStart = (e) => {
    const date = dates.find((date) => date.id === e.active.id);

    setEvent({ ...e, dragging: true, date: date });
    dispatch(openDate({ accessor: e.active.id, open: false }));
  };
  const handleDragEnd = (e) => {
    const active = e.active;
    const over = e.over;

    setEvent({
      ...e,
      dragging: false,
      date: null,
    });

    if (!over) return;

    switch (over.id) {
      case "plus":
        dispatch(newDate());
        return;
      case "trash":
        dispatch(removeDate(active.id));
        return;
    }

    const activeIndex = dates.findIndex(({ id }) => id === active.id);
    const overIndex = dates.findIndex(({ id }) => id === over.id);
    const updatedDates = arrayMove(dates, activeIndex, overIndex);
    dispatch(updateDates(updatedDates));
  };

  return (
    <div className={styles["gains"]}>
      <div className={styles["gains-container"]}>
        <DndContext
          sensors={sensors}
          autoScroll={false}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className={styles["dates-container"]}>
            <SortableContext
              items={dates.map((date) => date.accessor)}
              strategy={horizontalListSortingStrategy}
            >
              {dates.map((date, index) => (
                <Select
                  key={date.accessor}
                  id={date.accessor}
                  index={index}
                  date={date}
                />
              ))}
            </SortableContext>

            <DragOverlay>
              {event.date ? (
                <Select id={event.date.accessor} date={event.date} />
              ) : null}
            </DragOverlay>
          </div>

          <div className={styles["drop-buttons"]}>
            <Plus onClick={() => dispatch(newDate())} event={event} />
            <Trash event={event} />
          </div>
        </DndContext>
      </div>
      <Tip
        text="The blocks above are timeseries, you can change the date which they specify by clicking the calendar icon, and choosing the month/year."
        top={20}
      />
      <Tip text="Add stock prices for a specific date to the table by clicking the table button, or download the prices directly with the download button." />
      <Tip text="Add timeseries by clicking the plus button on the right, and remove them by dragging to the trash button." />
    </div>
  );
};
export default Gain;
