import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delGetParam,
  delGetParamOption,
  newGetParam,
  newGetParamOption,
  updateConfigParams,
  updateGetParamHostname,
  updateGetParamOption,
} from "../../features/config/configSlice";
import definitions from "../../static/definitions.json";
import { TableVars } from "../applicationsComponents/TableVars";

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

export function GetIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  let i = 0;

  return (
    <div>
      <strong className="title">{t("issuerDBGetParameters")}</strong>

      <div className="appDesc">
        <div className="box">
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions ? definitions.issuerDBGetActivation : "") +
                        ""}
                    </Markdown>
                  }
                >
                  <th>{t("issuerDBGetActivation")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={config.issuerDBGetActivation}
                      onChange={() =>
                        dispatch(
                          updateConfigParams({
                            param: "issuerDBGetActivation",
                            value: 1 - Number(config.issuerDBGetActivation),
                          })
                        )
                      }
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={t("on")}
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label={t("off")}
                      />
                    </RadioGroup>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
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
              {Object.keys(
                config.issuerDBGetParameters ? config.issuerDBGetParameters : {}
              ).map((key: string) => {
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
                                  onClick={() =>
                                    dispatch(newGetParamOption(key))
                                  }
                                >
                                  <AddCircleIcon color="success" />
                                </IconButton>
                              </th>
                            </tr>
                          </thead>
                          <TableVars
                            tableID={`getParams${i}`}
                            vars={
                              config.issuerDBGetParameters
                                ? config.issuerDBGetParameters[key]
                                : {}
                            }
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
        </div>
      </div>
    </div>
  );
}
