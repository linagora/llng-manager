import { useAppDispatch } from "../../app/hooks";

export function TableVars(
  appName: string,
  vars: Record<string, string>,
  tableID: string,
  delFunction: Function,
  updateFunction: Function
) {
  const dispatch = useAppDispatch();
  let i = 0;
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        i++;
        return (
          <tr key={i}>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateFunction({
                      name: appName,
                      data: updateHeaders(tableID),
                    })
                  )
                }
                type="text"
                value={key}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateFunction({
                      name: appName,
                      data: updateHeaders(tableID),
                    })
                  )
                }
                type="text"
                value={vars[key]}
              />
            </td>

            <td>
              <button
                onClick={() => {
                  dispatch(
                    delFunction({
                      name: appName,
                      key,
                    })
                  );
                }}
                className="minus"
              >
                -
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
export function updateHeaders(tableID: string) {
  const headerList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const values = cells[1].querySelector("input")?.value;
      if (key) {
        headerList[key] = values ? values : "";
      }
    }
  }
  return headerList;
}
