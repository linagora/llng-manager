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
import { Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function updateExpAttr(tableID: string) {
  const attrList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const name = cells[0].querySelector("input")?.value;
      const varName = cells[1].querySelector("input")?.value;
      const type = cells[2].querySelector("select")?.value;
      const array = cells[3].querySelector("select")?.value;

      attrList[name ? name : ""] = `${varName};${type};${array}`;
    }
  }

  return attrList;
}

function ExportedAttribute(appName: string, vars: Record<string, string>) {
  let i = 0;
  const dispatch = useAppDispatch();
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        i++;
        const [name, type, table] = vars[key].split(";");
        return (
          <tr key={i}>
            <td>
              <input
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
              <input
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
              <select
                value={String(type)}
                onChange={() =>
                  dispatch(
                    updateOidcRPMetaDataExportedVars({
                      appName,
                      data: updateExpAttr("exportedVars"),
                    })
                  )
                }
              >
                <option value="string">{t("string")}</option>
                <option value="int">{t("int")}</option>
                <option value="bool">{t("bool")}</option>
              </select>
            </td>
            <td>
              <select
                value={String(table)}
                onChange={() =>
                  dispatch(
                    updateOidcRPMetaDataExportedVars({
                      appName,
                      data: updateExpAttr("exportedVars"),
                    })
                  )
                }
              >
                <option value="auto">{t("auto")}</option>
                <option value="always">{t("always")}</option>
                <option value="never">{t("never")}</option>
              </select>
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
                    {t("oidcRPMetaDataOptionsClientID")}{" "}
                    {data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsClientID === ""
                      ? "⚠️"
                      : ""}
                  </th>
                  <td>
                    <input
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
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="oidcRPMetaDataOptionsPublic"
                          value={1}
                          checked={Boolean(
                            data.oidcRPMetaDataOptions[name]
                              ? data.oidcRPMetaDataOptions[name]
                                  .oidcRPMetaDataOptionsPublic
                              : 0
                          )}
                          onChange={() => {
                            dispatch(
                              updateOidcMetaDataOptions({
                                name,
                                option: "oidcRPMetaDataOptionsPublic",
                                value: 1,
                              })
                            );
                          }}
                        />
                        <span>{t("on")}</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="oidcRPMetaDataOptionsPublic"
                          value={0}
                          checked={
                            !Boolean(
                              data.oidcRPMetaDataOptions[name]
                                ? data.oidcRPMetaDataOptions[name]
                                    .oidcRPMetaDataOptionsPublic
                                : 0
                            )
                          }
                          onChange={() => {
                            dispatch(
                              updateOidcMetaDataOptions({
                                name,
                                option: "oidcRPMetaDataOptionsPublic",
                                value: 0,
                              })
                            );
                          }}
                        />
                        <span>{t("off")}</span>
                      </label>
                    </div>
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
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    {" "}
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
                ? ExportedAttribute(name, data.oidcRPMetaDataExportedVars[name])
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
