import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppPage.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { OptionOidc } from "./OptionOidc";
import { TableVars } from "./TableVars";
import {
  delOIDCRPMetaDataMacros,
  delOidcRPMetaDataExportedVars,
  newOIDCRPMetaDataMacros,
  newOidcRPMetaDataExportedVars,
  updateOIDCRPMetaDataMacros,
  updateOidcMetaDataOptions,
  updateOidcRPMetaDataExportedVars,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
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

function ExportedAttribute(
  appName: string,
  vars: Record<string, string>,
  dispatch: Function
) {
  let i = 0;
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        i++;
        const [name, type, table] = vars[key].split(";");
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
              <Button
                className="minus"
                onClick={() =>
                  dispatch(delOidcRPMetaDataExportedVars({ appName, key: key }))
                }
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

export function OIDCApp({ name }: { name: string }) {
  const data = useAppSelector((state) => state.config.data.config);
  const [optionSelected, setOptionSelected] = useState("basic");
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="optionNavbar">
        <label onClick={() => setOptionSelected("basic")}>
          {t("Basic Option")}
        </label>
        <label onClick={() => setOptionSelected("oidcRPMetaDataOptionsBasic")}>
          {t("oidcRPMetaDataOptionsBasic")}
        </label>
        <label onClick={() => setOptionSelected("oidcRPMetaDataExportedVars")}>
          {t("oidcRPMetaDataExportedVars")}
        </label>
        <label onClick={() => setOptionSelected("oidcRPMetaDataMacros")}>
          {t("oidcRPMetaDataMacros")}
        </label>
        <label onClick={() => setOptionSelected("oidcRPMetaDataOptions")}>
          {t("oidcRPMetaDataOptions")}
        </label>
      </div>
      <div className="appDesc">
        {optionSelected === "oidcRPMetaDataOptionsBasic" && (
          <div className="box">
            <strong className="title2">
              {t("oidcRPMetaDataOptionsBasic")}
            </strong>
            <table>
              <tbody>
                <tr>
                  <th>
                    {t("oidcRPMetaDataOptionsClientID")}
                    {data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsClientID === ""
                      ? "⚠️"
                      : ""}
                  </th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={String(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientID
                      )}
                      onChange={(e) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsClientID",
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    {t("oidcRPMetaDataOptionsPublic")}
                    {data.oidcRPMetaDataOptions[name]
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsPublic ||
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientSecret !== ""
                        ? ""
                        : "⚠️"
                      : "⚠️"}
                  </th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsPublic
                        }
                        onChange={(e) => {
                          dispatch(
                            updateOidcMetaDataOptions({
                              name,
                              option: "oidcRPMetaDataOptionsPublic",
                              value: Number(e.target.value),
                            })
                          );
                        }}
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

                <tr>
                  <th>
                    {t("oidcRPMetaDataOptionsClientSecret")}
                    {data.oidcRPMetaDataOptions[name]
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsPublic ||
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientSecret !== ""
                        ? ""
                        : "⚠️"
                      : "⚠️"}
                  </th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type={attributes.oidcRPMetaDataOptionsClientSecret.type}
                      value={String(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientSecret
                      )}
                      onChange={(e) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsClientSecret",
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("oidcRPMetaDataOptionsRedirectUris")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type={attributes.oidcRPMetaDataOptionsRedirectUris.type}
                      name="oidcRPMetaDataOptionsRedirectUris"
                      value={String(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRedirectUris
                      )}
                      onChange={(e) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsRedirectUris",
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("oidcRPMetaDataOptionsAuthMethod")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type={attributes.oidcRPMetaDataOptionsAuthMethod.type}
                      name="oidcRPMetaDataOptionsAuthMethod"
                      value={String(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthMethod
                      )}
                      onChange={(e) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAuthMethod",
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("oidcRPMetaDataOptionsDisplay")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type="text"
                      value={String(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsDisplay
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsDisplay
                          : ""
                      )}
                      onChange={(e) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsDisplay",
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("oidcRPMetaDataOptionsIcon")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type={attributes.oidcRPMetaDataOptionsIcon.type}
                      value={String(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsIcon
                      )}
                      onChange={(e) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsIcon",
                            value: e.target.value,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {optionSelected === "oidcRPMetaDataExportedVars" && (
          <div className="box">
            <strong className="title2">
              {t("oidcRPMetaDataExportedVars")}
            </strong>

            <table id="exportedVars">
              <thead>
                <tr>
                  <th>{t("claimName")}</th>
                  <th>{t("variableName")}</th>
                  <th>{t("type")}</th>
                  <th>{t("array")}</th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() =>
                        dispatch(newOidcRPMetaDataExportedVars(name))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              {data.oidcRPMetaDataExportedVars
                ? ExportedAttribute(
                    name,
                    data.oidcRPMetaDataExportedVars[name],
                    dispatch
                  )
                : ""}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newOidcRPMetaDataExportedVars(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "oidcRPMetaDataMacros" && (
          <div className="box">
            <strong className="title2">{t("oidcRPMetaDataMacros")}</strong>

            <table id="oidcRPMetaDataMacros">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() => dispatch(newOIDCRPMetaDataMacros(name))}
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              {data.oidcRPMetaDataMacros
                ? TableVars(
                    name,
                    data.oidcRPMetaDataMacros[name],
                    "oidcRPMetaDataMacros",
                    delOIDCRPMetaDataMacros,
                    updateOIDCRPMetaDataMacros
                  )
                : ""}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newOIDCRPMetaDataMacros(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "oidcRPMetaDataOptions" && (
          <div className="box">
            <strong className="title2">{t("oidcRPMetaDataOptions")}</strong>
            <OptionOidc name={name} />
          </div>
        )}
      </div>
    </div>
  );
}
