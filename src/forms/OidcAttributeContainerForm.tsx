import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch } from "../app/hooks";
import {
  delOidcRPMetaDataExportedVars,
  newOidcRPMetaDataExportedVars,
  updateOidcRPMetaDataExportedVars,
} from "../features/config/configSlice";
import definitions from "../static/definitions.json";

export default function OidcAttributeContainerForm({
  value,
  fieldName,
  appName,
}: {
  value: Record<string, string>;
  fieldName: string;
  appName: string;
}) {
  let i = 0;
  const dispatch = useAppDispatch();
  return (
    <>
      <tr>
        <th className="title2">{t(fieldName)}</th>
      </tr>
      <tr>
        {" "}
        <td>
          <table id="exportedVars">
            <thead>
              <tr>
                <Tooltip
                  title={<Markdown>{definitions.exportedVars}</Markdown>}
                >
                  <th>{t("claimName")}</th>
                </Tooltip>
                <th>{t("variableName")}</th>
                <th>{t("type")}</th>
                <th>{t("array")}</th>
                <th>
                  <IconButton
                    className="plus"
                    onClick={() =>
                      dispatch(newOidcRPMetaDataExportedVars(appName))
                    }
                  >
                    <AddCircleIcon color="success" />
                  </IconButton>
                </th>
              </tr>
            </thead>{" "}
            <tbody>
              {Object.keys(value).map((key) => {
                i++;
                const [name, type, table] = value[key].split(";");
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
                            updateOidcRPMetaDataExportedVars({
                              appName,
                              data: updateExpAttr("exportedVars"),
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
                            updateOidcRPMetaDataExportedVars({
                              appName,
                              data: updateExpAttr("exportedVars"),
                            })
                          )
                        }
                        type="text"
                        value={name}
                      />
                    </td>
                    <td>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>{t("type")}</InputLabel>
                        <Select
                          value={type ? type : "string"}
                          label={t("type")}
                          onChange={(e) =>
                            dispatch(
                              updateOidcRPMetaDataExportedVars({
                                appName,
                                data: updateExpAttr("exportedVars", key, {
                                  type: e.target.value,
                                }),
                              })
                            )
                          }
                        >
                          <MenuItem value="string">{t("string")}</MenuItem>
                          <MenuItem value="int">{t("int")}</MenuItem>
                          <MenuItem value="bool">{t("bool")}</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>{t("array")}</InputLabel>
                        <Select
                          value={table ? table : "auto"}
                          label={t("array")}
                          onChange={(e) =>
                            dispatch(
                              updateOidcRPMetaDataExportedVars({
                                appName,
                                data: updateExpAttr("exportedVars", key, {
                                  array: e.target.value,
                                }),
                              })
                            )
                          }
                        >
                          <MenuItem value="auto">{t("auto")}</MenuItem>
                          <MenuItem value="always">{t("always")}</MenuItem>
                          <MenuItem value="never">{t("never")}</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <IconButton
                        className="minus"
                        onClick={() =>
                          dispatch(
                            delOidcRPMetaDataExportedVars({ appName, key: key })
                          )
                        }
                      >
                        <RemoveCircleIcon color="error" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <IconButton
            className="plus"
            onClick={() => dispatch(newOidcRPMetaDataExportedVars(appName))}
          >
            <AddCircleIcon color="success" />
          </IconButton>
        </td>
      </tr>
    </>
  );
}

function updateExpAttr(
  tableID: string,
  key?: string,
  selectData?: { type?: string; array?: string }
) {
  const attrList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const name = cells[0].querySelector("input")?.value;
      const varName = cells[1].querySelector("input")?.value;
      if (key === name && selectData?.type) {
        const array = cells[3].querySelector("input")?.value;
        attrList[key ? key : ""] = `${varName};${selectData.type};${array}`;
      } else if (key === name && selectData?.array) {
        const type = cells[2].querySelector("input")?.value;
        attrList[key ? key : ""] = `${varName};${type};${selectData.array}`;
      } else {
        const type = cells[2].querySelector("input")?.value;
        const array = cells[3].querySelector("input")?.value;
        attrList[name ? name : ""] = `${varName};${type};${array}`;
      }
    }
  }

  return attrList;
}
