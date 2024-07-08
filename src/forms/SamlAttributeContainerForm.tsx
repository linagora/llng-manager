import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch } from "../app/hooks";
import {
  delSamlMetadataExportedAttribute,
  newSamlMetadataExportedAttribute,
  updateSamlMetadataExportedAttribute,
} from "../features/config/configSlice";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function SamlAttributeContainerForm({
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
      <th className="title2">{t(fieldName)}</th>
      <td>
        <table id="exportedAttribute">
          <thead>
            <tr>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("variableName")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("attributeName")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("friendlyName")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("mandatory")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("format")}</th>
              </Tooltip>
              <th>
                <Button
                  onClick={() =>
                    dispatch(
                      newSamlMetadataExportedAttribute({ appName, fieldName })
                    )
                  }
                  color="success"
                  startIcon={<AddCircleIcon />}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(value).map((key) => {
              const [mandatory, name, format, friendlyName] =
                value[key].split(";");
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
                          updateSamlMetadataExportedAttribute({
                            appName,
                            data: updateExpAttr("exportedAttribute"),
                            fieldName,
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
                          updateSamlMetadataExportedAttribute({
                            appName,
                            data: updateExpAttr("exportedAttribute"),
                            fieldName,
                          })
                        )
                      }
                      type="text"
                      value={name}
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
                          updateSamlMetadataExportedAttribute({
                            appName,
                            data: updateExpAttr("exportedAttribute"),
                            fieldName,
                          })
                        )
                      }
                      type="text"
                      value={friendlyName}
                    />
                  </td>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={mandatory}
                        onChange={() =>
                          dispatch(
                            updateSamlMetadataExportedAttribute({
                              appName,
                              data: updateExpAttr("exportedAttribute"),
                              fieldName,
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
                  <td>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel shrink>{t("format")}</InputLabel>
                      <Select
                        value={format}
                        label={t("format")}
                        displayEmpty
                        onChange={(e) =>
                          dispatch(
                            updateSamlMetadataExportedAttribute({
                              appName,
                              data: updateExpAttr(
                                "exportedAttribute",
                                key,
                                e.target.value
                              ),
                              fieldName,
                            })
                          )
                        }
                      >
                        {attributes.samlSPMetaDataExportedAttributes.select.map(
                          (el) => {
                            return (
                              <MenuItem key={el.k} value={el.k}>
                                {t(el.v)}
                              </MenuItem>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>
                  </td>

                  <td>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          delSamlMetadataExportedAttribute({
                            appName,
                            key,
                            fieldName,
                          })
                        );
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
        </table>{" "}
        <IconButton
          className="plus"
          onClick={() =>
            dispatch(newSamlMetadataExportedAttribute({ appName, fieldName }))
          }
        >
          <AddCircleIcon color="success" />
        </IconButton>
      </td>
    </>
  );
}

function updateExpAttr(tableID: string, key?: string, updatedFormat?: string) {
  const attrList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const name = cells[0].querySelector("input")?.value;
      const attName = cells[1].querySelector("input")?.value;
      const friendlyName = cells[2].querySelector("input")?.value;
      let format = cells[4].querySelector("input")?.value;
      if (key === name && updatedFormat) {
        format = updatedFormat;
      }
      let mandatory: number = 0;
      cells[3].querySelectorAll("label").forEach((e) => {
        if (e.innerText === t("on")) {
          if (e.querySelector("input")?.checked) {
            mandatory = 1;
          }
        }
        if (e.innerText === t("off")) {
          if (e.querySelector("input")?.checked) {
            mandatory = 0;
          }
        }
      });
      attrList[
        name ? name : ""
      ] = `${mandatory};${attName};${format};${friendlyName}`;
    }
  }

  return attrList;
}
