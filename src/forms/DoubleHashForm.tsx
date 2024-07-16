import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
  IconButton,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { TableVars } from "../components/applicationsComponents/TableVars";
import {
  delGetParam,
  delGetParamOption,
  newGetParam,
  newGetParamOption,
  updateGetParamHostname,
  updateGetParamOption,
} from "../features/config/configSlice";

function updatedGetParam(tableID: string, key?: string) {
  const attrList: Record<string, Record<string, string>> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByClassName("getParamRow");

  if (rows) {
    for (let i = 0; i < rows.length; i++) {
      const hostname = rows[i]
        .getElementsByTagName("td")[0]
        .querySelector("input")?.value;
      const headerList: Record<string, string> = {};
      const paramTable = document.getElementById(`getParams${i + 1}`);
      const paramRows = paramTable?.getElementsByTagName("tr");
      if (paramRows) {
        for (let j = 1; j < paramRows.length; j++) {
          const cells = paramRows[j].getElementsByTagName("td");
          const key = cells[0].querySelector("input")?.value;
          const values = cells[1].querySelector("input")?.value;
          if (key) {
            headerList[key] = values ? values : "";
          }
        }
      }
      attrList[hostname ? hostname : ""] = headerList;
    }
  }
  return attrList;
}

export default function DoubleHashForm({
  value,
  fieldName,
  dispatch,
}: {
  value: Record<string, Record<string, string>>;
  fieldName: string;
  dispatch: Function;
}) {
  let i = 0;
  return (
    <table id="getParams">
      <thead>
        <tr>
          <th colSpan={2}>{t("hostname")}</th>
          <th>
            <IconButton
              className="plus"
              onClick={() => dispatch(newGetParam())}
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(value ? value : {}).map((key: string) => {
          i++;
          return (
            <tr key={i} className="getParamRow">
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  onChange={() =>
                    dispatch(
                      updateGetParamHostname(updatedGetParam("getParams"))
                    )
                  }
                  type="text"
                  value={key}
                />
              </td>

              <td>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {t("params")}
                  </AccordionSummary>
                  <table id={`getParams${i}`}>
                    <thead>
                      <tr>
                        <th>{t("keys")}</th>
                        <th>{t("values")}</th>
                        <th>
                          <IconButton
                            className="plus"
                            onClick={() => dispatch(newGetParamOption(key))}
                          >
                            <AddCircleIcon color="success" />
                          </IconButton>
                        </th>
                      </tr>
                    </thead>
                    <TableVars
                      tableID={`getParams${i}`}
                      vars={value ? value[key] : {}}
                      delFunction={delGetParamOption}
                      appName={key}
                      updateFunction={updateGetParamOption}
                      dispatch={dispatch}
                    />
                  </table>
                </Accordion>
              </td>
              <td>
                <IconButton
                  onClick={() => {
                    dispatch(delGetParam(key));
                  }}
                  className="minus"
                >
                  <RemoveCircleIcon color="error" />
                </IconButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
