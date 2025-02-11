import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Divider, IconButton, Tooltip
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delCASAppMetaDataMacros,
  delCASexportedVars,
  newCASAppMetaDataMacros,
  newCASexportedVars,
  updateCASAppMetaDataMacros,
  updateCASOptions,
  updateCASexportedVars,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import "./AppPage.css";
import { TableVars } from "./TableVars";
import TextForm from "../../forms/TextForm";
import IntForm from "../../forms/IntForm";
import LongtextForm from "../../forms/LongtextForm";
import TroolForm from "../../forms/TroolForm";

export function CasApp({ name }: { name: string }) {
  const vars =
    useAppSelector((state) => {
      if (state.config.data.config.casAppMetaDataExportedVars) {
        return state.config.data.config.casAppMetaDataExportedVars[name];
      }
    }) || {};
  const casAppMetaDataMacros =
    useAppSelector((state) => {
      if (state.config.data.config.casAppMetaDataMacros) {
        return state.config.data.config.casAppMetaDataMacros[name];
      }
    }) || {};
  const casAppMetaDataOptions =
    useAppSelector((state) => {
      if (state.config.data.config.casAppMetaDataOptions) {
        return state.config.data.config.casAppMetaDataOptions[name];
      }
    }) || {};
  const [optionSelected, setOptionSelected] = useState("basic");
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="top">
        <strong className="title">{name}</strong>
      </div>
      <div className="app">
        <div className="optionNavbar">
          <label
            className={`option ${optionSelected === "basic" ? "selected" : ""}`}
            onClick={() => setOptionSelected("basic")}
          >
            {t("Basic Option")}
          </label>
          <label
            className={`option ${
              optionSelected === "casAppMetaDataExportedVars" ? "selected" : ""
            }`}
            onClick={() => setOptionSelected("casAppMetaDataExportedVars")}
          >
            {t("casAppMetaDataExportedVars")}
          </label>
          <label
            className={`option ${
              optionSelected === "casAppMetaDataMacros" ? "selected" : ""
            }`}
            onClick={() => setOptionSelected("casAppMetaDataMacros")}
          >
            {t("casAppMetaDataMacros")}
          </label>
          <label
            className={`option ${
              optionSelected === "casAppMetaDataOptions" ? "selected" : ""
            }`}
            onClick={() => setOptionSelected("casAppMetaDataOptions")}
          >
            {t("casAppMetaDataOptions")}
          </label>
        </div>
        <Divider className="divider" orientation="vertical" variant="middle" />
        <div className="appDesc">
          {(optionSelected === "casAppMetaDataExportedVars" ||
            optionSelected === "basic") && (
            <div className="box">
              <strong className="title2">
                {t("casAppMetaDataExportedVars")}
              </strong>

              <table id="exportedVars">
                <thead>
                  <tr>
                    <th>{t("keys")}</th>
                    <Tooltip
                      title={
                        <Markdown>
                          {definitions.casAppMetaDataExportedVars}
                        </Markdown>
                      }
                    >
                      <th>{t("values")}</th>
                    </Tooltip>
                    <th>
                      <IconButton
                        className="plus"
                        onClick={() => dispatch(newCASexportedVars(name))}
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                <TableVars
                  appName={name}
                  vars={vars}
                  tableID={"exportedVars"}
                  dispatch={dispatch}
                  delFunction={delCASexportedVars}
                  updateFunction={updateCASexportedVars}
                />
              </table>
              <IconButton
                className="plus"
                onClick={() => dispatch(newCASexportedVars(name))}
              >
                <AddCircleIcon color="success" />
              </IconButton>
            </div>
          )}
          {optionSelected === "casAppMetaDataMacros" && (
            <div className="box">
              <strong className="title2">{t("casAppMetaDataMacros")}</strong>

              <table id="macros">
                <thead>
                  <tr>
                    <th>{t("keys")}</th>

                    <Tooltip
                      title={
                        <Markdown>{definitions.casAppMetaDataMacros}</Markdown>
                      }
                    >
                      <th>{t("values")}</th>
                    </Tooltip>

                    <th>
                      <IconButton
                        className="plus"
                        onClick={() => dispatch(newCASAppMetaDataMacros(name))}
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                <TableVars
                  appName={name}
                  vars={casAppMetaDataMacros}
                  tableID={"macros"}
                  dispatch={dispatch}
                  delFunction={delCASAppMetaDataMacros}
                  updateFunction={updateCASAppMetaDataMacros}
                />
              </table>
              <IconButton
                className="plus"
                onClick={() => dispatch(newCASAppMetaDataMacros(name))}
              >
                <AddCircleIcon color="success" />
              </IconButton>
            </div>
          )}
          {optionSelected === "casAppMetaDataOptions" && (
            <div className="box">
              <strong className="title2">{t("casAppMetaDataOptions")}</strong>
              <table>
                <tbody>
                  <tr>
                    <TextForm
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsDisplayName
                          ? casAppMetaDataOptions.casAppMetaDataOptionsDisplayName
                          : ""
                      )}
                      fieldName="casAppMetaDataOptionsDisplayName"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsDisplayName",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsService
                          ? casAppMetaDataOptions.casAppMetaDataOptionsService
                          : ""
                      )}
                      fieldName="casAppMetaDataOptionsService"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsService",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <TroolForm
                      fieldName="casAppMetaDataOptionsLogout"
                      value={Number(
                        casAppMetaDataOptions.casAppMetaDataOptionsLogout !==
                          undefined &&
                          casAppMetaDataOptions.casAppMetaDataOptionsLogout !==
                            null
                          ? casAppMetaDataOptions.casAppMetaDataOptionsLogout
                          : attributes.casAppMetaDataOptionsLogout.default
                      )}
                      updateFunc={(e: number) => {
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsLogout",
                            value: Number(e),
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <IntForm
                      value={Number(
                        casAppMetaDataOptions.casAppMetaDataOptionsAuthnLevel
                          ? casAppMetaDataOptions.casAppMetaDataOptionsAuthnLevel
                          : 0
                      )}
                      fieldName="casAppMetaDataOptionsAuthnLevel"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsAuthnLevel",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsRule
                          ? casAppMetaDataOptions.casAppMetaDataOptionsRule
                          : ""
                      )}
                      fieldName="casAppMetaDataOptionsRule"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsRule",
                            value: e,
                          })
                        );
                      }}
                    />
                  </tr>
                  <tr>
                    <LongtextForm
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsComment
                          ? casAppMetaDataOptions.casAppMetaDataOptionsComment
                          : ""
                      )}
                      fieldName="casAppMetaDataOptionsComment"
                      updateFunc={(e: string) => {
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsComment",
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
        </div>
      </div>
    </div>
  );
}
