import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, TextField } from "@mui/material";

export function TableVars(
  appName: string,
  vars: Record<string, string>,
  tableID: string,
  dispatch: Function,
  delFunction: Function,
  updateFunction: Function
) {
  let i = 0;
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        i++;
        return (
          <tr key={i}>
            <td>
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <Button
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
                <RemoveCircleIcon color="error" />
              </Button>
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
