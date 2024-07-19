import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
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
  delChoiceOverParam,
  delChoiceParam,
  newChoiceOverParam,
  newChoiceParam,
  updateChoiceOverParam,
  updateChoiceParam,
} from "../features/config/configSlice";
import attributes from "../static/attributes.json";
function updateChoice(
  tableID: string,
  data: Record<string, string>,
  selectData: { name: string; auth?: string; user?: string; pass?: string },
  newkey?: string
) {
  const headerList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const authMod = cells[1].querySelector("input")?.value;
      const userMod = cells[2].querySelector("input")?.value;
      const passMod = cells[3].querySelector("input")?.value;
      const url = cells[4].querySelector("input")?.value;
      const cond = cells[5].querySelector("input")?.value;

      if (key) {
        if (key === selectData.name) {
          headerList[selectData.name] = [
            selectData?.auth ? selectData?.auth : authMod ? authMod : "",
            selectData?.user ? selectData?.user : userMod ? userMod : "",
            selectData?.pass ? selectData?.pass : passMod ? passMod : "",
            url ? url : "",
            cond ? cond : "",
            data[selectData.name].split(";")[5],
          ].join(";");
        } else if (newkey && key === newkey) {
          headerList[key ? key : ""] = [
            authMod ? authMod : selectData?.auth ? selectData?.auth : "",
            userMod ? userMod : selectData?.user ? selectData?.user : "",
            passMod ? passMod : selectData?.pass ? selectData?.pass : "",
            url ? url : "",
            cond ? cond : "",
            data[selectData.name].split(";")[5],
          ].join(";");
        } else {
          headerList[key ? key : ""] = [
            authMod ? authMod : selectData?.auth ? selectData?.auth : "",
            userMod ? userMod : selectData?.user ? selectData?.user : "",
            passMod ? passMod : selectData?.pass ? selectData?.pass : "",
            url ? url : "",
            cond ? cond : "",
            data[key].split(";")[5],
          ].join(";");
        }
      }
    }
  }
  return headerList;
}

export default function AuthChoiceContainerForm({
  data,
  dispatch,
}: {
  data: Record<string, string>;
  dispatch: Function;
}) {
  let i = 0;
  return (
    <>
      <table id="choiceParam">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("authentication")}</th>
            <th>{t("userDB")}</th>
            <th>{t("passwordDB")}</th>
            <th>{t("url")}</th>
            <th>{t("condition")}</th>
            <th>
              <IconButton
                className="plus"
                onClick={() => dispatch(newChoiceParam())}
              >
                <AddCircleIcon color="success" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data || {}).map((key) => {
            i++;
            const [authMod, userMod, passMod, url, cond] = data[key].split(";");
            return (
              <tr key={i}>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={key}
                    onChange={(e) =>
                      dispatch(
                        updateChoiceParam(
                          updateChoice(
                            "choiceParam",
                            data,
                            { name: key },
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
                      value={authMod || "LDAP"}
                      onChange={(e) =>
                        dispatch(
                          updateChoiceParam(
                            updateChoice("choiceParam", data, {
                              name: key,
                              auth: e.target.value,
                            })
                          )
                        )
                      }
                    >
                      {attributes.authChoiceModules.select[0].map((e) => {
                        return (
                          <MenuItem key={e.v + "auth"} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      value={userMod || "LDAP"}
                      onChange={(e) =>
                        dispatch(
                          updateChoiceParam(
                            updateChoice("choiceParam", data, {
                              name: key,
                              user: e.target.value,
                            })
                          )
                        )
                      }
                    >
                      {attributes.authChoiceModules.select[1].map((e) => {
                        return (
                          <MenuItem key={e.v + "auth"} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      value={passMod || "LDAP"}
                      onChange={(e) =>
                        dispatch(
                          updateChoiceParam(
                            updateChoice("choiceParam", data, {
                              name: key,
                              pass: e.target.value,
                            })
                          )
                        )
                      }
                    >
                      {attributes.authChoiceModules.select[2].map((e) => {
                        return (
                          <MenuItem key={e.v + "choice"} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <TextField
                    size="small"
                    type="url"
                    value={url}
                    onChange={() =>
                      dispatch(
                        updateChoiceParam(
                          updateChoice("choiceParam", data, {
                            name: key,
                          })
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={cond}
                    onChange={() =>
                      dispatch(
                        updateChoiceParam(
                          updateChoice("choiceParam", data, {
                            name: key,
                          })
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <IconButton
                    className="minus"
                    onClick={() => dispatch(delChoiceParam(key))}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Object.keys(data).map((key) => {
        i++;
        const over = data[key].split(";")[5];
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
                      onClick={() => dispatch(newChoiceOverParam(key))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={key}
                vars={(over ? JSON.parse(over) : {}) as Record<string, string>}
                tableID={`overParam${key}`}
                dispatch={dispatch}
                delFunction={delChoiceOverParam}
                updateFunction={updateChoiceOverParam}
              />
            </table>
          </Accordion>
        );
      })}
    </>
  );
}
