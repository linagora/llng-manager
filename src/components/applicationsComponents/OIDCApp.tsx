import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
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
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delOIDCRPMetaDataMacros,
  newOIDCRPMetaDataMacros,
  updateOIDCRPMetaDataMacros,
  updateOidcMetaDataOptions,
} from "../../features/config/configSlice";
import OidcAttributeContainerForm from "../../forms/OidcAttributeContainerForm";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import "./AppPage.css";
import { OptionOidc } from "./OptionOidc";
import { TableVars } from "./TableVars";

export function OIDCApp({ name }: { name: string }) {
  const data = useAppSelector((state) => state.config.data.config);
  const [optionSelected, setOptionSelected] = useState(
    "oidcRPMetaDataOptionsBasic"
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="optionNavbar">
        <label
          className={`option ${
            optionSelected === "oidcRPMetaDataOptionsBasic" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("oidcRPMetaDataOptionsBasic")}
        >
          {t("oidcRPMetaDataOptionsBasic")}
        </label>
        <label
          className={`option ${
            optionSelected === "oidcRPMetaDataExportedVars" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("oidcRPMetaDataExportedVars")}
        >
          {t("oidcRPMetaDataExportedVars")}
        </label>
        <label
          className={`option ${
            optionSelected === "oidcRPMetaDataMacros" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("oidcRPMetaDataMacros")}
        >
          {t("oidcRPMetaDataMacros")}
        </label>
        <label
          className={`option ${
            optionSelected === "oidcRPMetaDataOptions" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("oidcRPMetaDataOptions")}
        >
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
                    {data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientID === ""
                        ? "⚠️"
                        : ""
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
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientID
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsClientID
                            : ""
                          : ""
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
                    {data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsPublic ||
                          (data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsClientSecret &&
                            data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientSecret !== "")
                          ? ""
                          : "⚠️"
                        : "⚠️"
                      : "⚠️"}
                  </th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          data.oidcRPMetaDataOptions
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsPublic
                            : 0
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
                    {data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsPublic ||
                          (data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsClientSecret &&
                            data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientSecret !== "")
                          ? ""
                          : "⚠️"
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
                      value={
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientSecret
                            ? String(
                                data.oidcRPMetaDataOptions[name]
                                  .oidcRPMetaDataOptionsClientSecret
                              )
                            : ""
                          : ""
                      }
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
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcRPMetaDataOptionsRedirectUris
                          ? definitions.oidcRPMetaDataOptionsRedirectUris
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("oidcRPMetaDataOptionsRedirectUris")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type={attributes.oidcRPMetaDataOptionsRedirectUris.type}
                      name="oidcRPMetaDataOptionsRedirectUris"
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsRedirectUris
                          : ""
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
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcRPMetaDataOptionsAuthMethod
                          ? definitions.oidcRPMetaDataOptionsAuthMethod
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("oidcRPMetaDataOptionsAuthMethod")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type={attributes.oidcRPMetaDataOptionsAuthMethod.type}
                      name="oidcRPMetaDataOptionsAuthMethod"
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsAuthMethod
                          : ""
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
                  <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                    <th>{t("oidcRPMetaDataOptionsDisplay")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type="text"
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsDisplay
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsDisplay
                            : attributes.oidcOPMetaDataOptionsDisplay.default
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
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcRPMetaDataOptionsIcon
                          ? definitions.oidcRPMetaDataOptionsIcon
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("oidcRPMetaDataOptionsIcon")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type={attributes.oidcRPMetaDataOptionsIcon.type}
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsIcon
                          : ""
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
            <OidcAttributeContainerForm
              appName={name}
              value={
                data.oidcRPMetaDataExportedVars
                  ? data.oidcRPMetaDataExportedVars[name]
                  : {}
              }
              fieldName="oidcRPMetaDataExportedVars"
            />
          </div>
        )}
        {optionSelected === "oidcRPMetaDataMacros" && (
          <div className="box">
            <strong className="title2">{t("oidcRPMetaDataMacros")}</strong>

            <table id="oidcRPMetaDataMacros">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <Tooltip
                    title={
                      <Markdown>{definitions.oidcRPMetaDataMacros}</Markdown>
                    }
                  >
                    <th>{t("values")}</th>
                  </Tooltip>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newOIDCRPMetaDataMacros(name))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              {data.oidcRPMetaDataMacros ? (
                <TableVars
                  appName={name}
                  vars={data.oidcRPMetaDataMacros[name]}
                  tableID={"oidcRPMetaDataMacros"}
                  dispatch={dispatch}
                  delFunction={delOIDCRPMetaDataMacros}
                  updateFunction={updateOIDCRPMetaDataMacros}
                />
              ) : (
                ""
              )}
            </table>
            <IconButton
              className="plus"
              onClick={() => dispatch(newOIDCRPMetaDataMacros(name))}
            >
              <AddCircleIcon color="success" />
            </IconButton>
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
