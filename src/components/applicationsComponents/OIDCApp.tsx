import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Collapse, Divider, IconButton, List, Tooltip } from "@mui/material";
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
import definitions from "../../static/definitions.json";
import "./AppPage.css";
import { OidcOptionSelection, OptionOidc } from "./OptionOidc";
import { TableVars } from "./TableVars";
import BoolForm from "../../forms/BoolForm";
import PasswordForm from "../../forms/PasswordForm";
import TextForm from "../../forms/TextForm";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export function OIDCApp({ name }: { name: string }) {
  const data = useAppSelector((state) => state.config.data.config);
  const [optionSelected, setOptionSelected] = useState(
    "oidcRPMetaDataOptionsBasic"
  );
  const [secondOptionSelect, setSecondOptionSelected] = useState("advanced");
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="top">
        <strong className="title">{name}</strong>
      </div>
      <div className="app">
        <List className="optionNavbar" component="nav">
          <label
            className={`option ${
              optionSelected === "oidcRPMetaDataOptionsBasic" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("oidcRPMetaDataOptionsBasic");
              setOpen(false);
            }}
          >
            {t("oidcRPMetaDataOptionsBasic")}
          </label>
          <label
            className={`option ${
              optionSelected === "oidcRPMetaDataExportedVars" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("oidcRPMetaDataExportedVars");
              setOpen(false);
            }}
          >
            {t("oidcRPMetaDataExportedVars")}
          </label>
          <label
            className={`option ${
              optionSelected === "oidcRPMetaDataMacros" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("oidcRPMetaDataMacros");
              setOpen(false);
            }}
          >
            {t("oidcRPMetaDataMacros")}
          </label>
          <label
            className={`option ${
              optionSelected === "oidcRPMetaDataOptions" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("oidcRPMetaDataOptions");
              setOpen(!open);
            }}
            data-testid="oidcOptions"
          >
            <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
            <span>{t("oidcRPMetaDataOptions")}</span>
          </label>
          <Collapse
            className={`option ${
              optionSelected === "oidcRPMetaDataOptions" ? "selected" : ""
            }`}
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <OidcOptionSelection
              optionSelect={secondOptionSelect}
              setOptionSelected={(e: string) => {
                setOptionSelected("oidcRPMetaDataOptions");
                setSecondOptionSelected(e);
              }}
            />
          </Collapse>
        </List>
        <Divider className="divider" orientation="vertical" variant="middle" />
        <div className="appDesc">
          {optionSelected === "oidcRPMetaDataOptionsBasic" && (
            <div className="box">
              <strong className="title">
                {t("oidcRPMetaDataOptionsBasic")}
              </strong>
              <table>
                <tbody>
                  <tr>
                    <TextForm
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientID
                          : ""
                      )}
                      fieldName="oidcRPMetaDataOptionsClientID"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsClientID",
                            value: e,
                          })
                        );
                      }}
                    />
                    <td>
                      {data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsClientID === ""
                          ? "⚠️"
                          : ""
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <BoolForm
                      value={
                        data.oidcRPMetaDataOptions
                          ? Number(
                              data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsPublic
                            )
                          : 0
                      }
                      fieldName="oidcRPMetaDataOptionsPublic"
                      updateFunc={(e: number) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsPublic",
                            value: e,
                          })
                        );
                      }}
                    />
                    <td>
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
                    </td>
                  </tr>

                  <tr>
                    <PasswordForm
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
                      fieldName="oidcRPMetaDataOptionsClientSecret"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsClientSecret",
                            value: e,
                          })
                        );
                      }}
                    />
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                    <TextForm
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsRedirectUris
                          : ""
                      )}
                      fieldName="oidcRPMetaDataOptionsRedirectUris"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsRedirectUris",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsAuthMethod
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsAuthMethod
                            : ""
                          : ""
                      )}
                      fieldName="oidcRPMetaDataOptionsAuthMethod"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAuthMethod",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsDisplay
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsDisplay
                            : ""
                          : ""
                      )}
                      fieldName="oidcRPMetaDataOptionsDisplay"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsDisplay",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      value={String(
                        data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsIcon
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsIcon
                            : ""
                          : ""
                      )}
                      fieldName="oidcRPMetaDataOptionsIcon"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsIcon",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {optionSelected === "oidcRPMetaDataExportedVars" && (
            <div className="box">
              <table>
                <tbody>
                  <OidcAttributeContainerForm
                    appName={name}
                    value={
                      data.oidcRPMetaDataExportedVars
                        ? data.oidcRPMetaDataExportedVars[name]
                        : {}
                    }
                    fieldName="oidcRPMetaDataExportedVars"
                  />
                </tbody>
              </table>
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
              <strong className="title2">
                {t("oidcRPMetaDataOptions")} / {t(secondOptionSelect)}
              </strong>
              <OptionOidc name={name} optionSelect={secondOptionSelect} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
