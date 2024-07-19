import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { TableVars } from "../components/applicationsComponents/TableVars";
import {
  delCombOverParam,
  delCombParam,
  newCombOverParam,
  newCombParam,
  updateCombOverParam,
  updateCombParam,
} from "../features/config/configSlice";
import attributes from "../static/attributes.json";
function updateComb(
  tableID: string,
  data: Record<string, Record<string, string | Record<string, string>>>,
  selectData: { name: string; type?: string; use?: string },
  newkey?: string
) {
  const headerList: Record<
    string,
    Record<string, string | Record<string, string | number>>
  > = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const type = cells[1].querySelector("input")?.value;
      const use = cells[2].querySelector("input")?.value;
      if (key) {
        if (key === selectData?.name) {
          headerList[key] = {
            for: selectData?.use ? selectData.use : use ? use : "",
            over: data[key].over,
            type: selectData?.type ? selectData.type : type ? type : "",
          };
        } else if (newkey && key === newkey) {
          headerList[newkey] = {
            for: use ? use : "",
            over: data[selectData.name].over,
            type: type ? type : "",
          };
        } else {
          headerList[key] = {
            for: use ? use : "",
            over: data[key] ? data[key].over : {},
            type: type ? type : "",
          };
        }
      }
    }
  }
  return headerList;
}

export default function CmbModuleContainerForm({
  data,
  dispatch,
}: {
  data: Record<string, Record<string, string | Record<string, string>>>;
  dispatch: Function;
}) {
  let i = 0;
  return (
    <>
      <table id="combTable">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("type")}</th>
            <th>{t("use")}</th>
            <th>
              <Button className="plus" onClick={() => dispatch(newCombParam())}>
                <AddCircleIcon color="success" />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            i++;
            return (
              <tr key={i}>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    placeholder={t(key)}
                    value={key || ""}
                    onChange={(e) =>
                      dispatch(
                        updateCombParam(
                          updateComb(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          )
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      value={data[key].type || "LDAP"}
                      onChange={(e) =>
                        dispatch(
                          updateCombParam(
                            updateComb("combTable", data, {
                              name: key,
                              type: String(e.target.value),
                            })
                          )
                        )
                      }
                    >
                      {attributes.combModules.select.map((e) => {
                        return (
                          <MenuItem key={e.v} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("use")}</InputLabel>
                    <Select
                      label={t("use")}
                      value={String(data[key].for) || "0"}
                      onChange={(e) =>
                        dispatch(
                          updateCombParam(
                            updateComb("combTable", data, {
                              name: key,
                              use: String(e.target.value),
                            })
                          )
                        )
                      }
                    >
                      <MenuItem value={"0"}>{t("authAndUserdb")}</MenuItem>
                      <MenuItem value={"1"}>{t("authOnly")}</MenuItem>
                      <MenuItem value={"2"}>{t("userdbOnly")}</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <IconButton
                    className="minus"
                    onClick={() => dispatch(delCombParam(key))}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {Object.keys(data).map((key) => {
          i++;
          return (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("overPrm") + " " + key}
              </AccordionSummary>

              <table id={`overParam${key}`}>
                <thead>
                  <tr>
                    <th>{t("overPrm")}</th>
                    <th>{t("value")}</th>
                    <th>
                      <IconButton
                        className="plus"
                        onClick={() => dispatch(newCombOverParam(key))}
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                <TableVars
                  appName={key}
                  vars={
                    (data[key].over ? data[key].over : {}) as Record<
                      string,
                      string
                    >
                  }
                  tableID={`overParam${key}`}
                  dispatch={dispatch}
                  delFunction={delCombOverParam}
                  updateFunction={updateCombOverParam}
                />
              </table>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}
