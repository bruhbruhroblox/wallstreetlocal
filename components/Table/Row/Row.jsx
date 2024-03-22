import tableStyles from "../Table.module.css";

import { font } from "@fonts";

const Row = (props) => {
  const item = props.item;
  const headers = props.headers;
  return (
    <tr>
      {headers
        .filter((h) => h.active)
        .map((h) => {
          const display = item[h.accessor];
          return (
            <td
              key={`${item.cusip} (${h.display})`}
              className={[
                tableStyles["column"],
                tableStyles["body-column"],
                // sortHeader === h.sort
                //   ? tableStyles["column-highlighted"]
                //   : tableStyles["column-dehighlighted"],
                font.className,
              ].join(" ")}
            >
              {display}
            </td>
          );
        })}
    </tr>
  );
};

export default Row;
