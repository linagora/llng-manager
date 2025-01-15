import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Collapse, Divider, IconButton, List, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  delSAMLSPMetaDataMacros,
  newSAMLSPMetaDataMacros,
  updateSAMLSPMetaDataMacros,
  updateSamlSPMetadata,
} from "../../features/config/configSlice";
import SamlAttributeContainerForm from "../../forms/SamlAttributeContainerForm";
import definitions from "../../static/definitions.json";
import "./AppPage.css";
import { OptionSaml, SubObtionSelector } from "./OptionSaml";
import { TableVars } from "./TableVars";
import FileForm from "../../forms/FileForm";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export function SAMLApp({
  name,
  dispatch,
}: {
  name: string;
  dispatch: Function;
}) {
  const data = useAppSelector((state) => state.config.data.config);
  const [optionSelected, setOptionSelected] = useState("basic");
  const [suboptionSelect, setSubOptionSelected] = useState("authResponse");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="top">
        <strong className="title">{name}</strong>
      </div>
      <div className="app">
        <List className="optionNavbar">
          <label
            className={`option ${optionSelected === "basic" ? "selected" : ""}`}
            onClick={() => {
              setOptionSelected("basic");
              setOpen(false);
            }}
          >
            {t("Basic Option")}
          </label>
          <label
            className={`option ${
              optionSelected === "samlSPMetaDataXML" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("samlSPMetaDataXML");
              setOpen(false);
            }}
          >
            {t("samlSPMetaDataXML")}
          </label>
          <label
            className={`option ${
              optionSelected === "samlSPMetaDataExportedAttributes"
                ? "selected"
                : ""
            }`}
            onClick={() => {
              setOptionSelected("samlSPMetaDataExportedAttributes");
              setOpen(false);
            }}
          >
            {t("samlSPMetaDataExportedAttributes")}
          </label>
          <label
            className={`option ${
              optionSelected === "samlSPMetaDataMacros" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("samlSPMetaDataMacros");
              setOpen(false);
            }}
          >
            {t("samlSPMetaDataMacros")}
          </label>
          <label
            className={`option ${
              optionSelected === "samlSPMetaDataOptions" ? "selected" : ""
            }`}
            onClick={() => {
              setOptionSelected("samlSPMetaDataOptions");
              setOpen(!open);
            }}
          >
            <div>{open ? <ExpandLess /> : <ExpandMore />}</div>
            <span> {t("samlSPMetaDataOptions")}</span>
          </label>
          <Collapse
            className={`option ${
              optionSelected === "samlSPMetaDataOptions" ? "selected" : ""
            }`}
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <SubObtionSelector
              optionSelect={suboptionSelect}
              setOptionSelected={setSubOptionSelected}
            />
          </Collapse>
        </List>
        <Divider
          className="divider"
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <div className="appDesc">
          {optionSelected === "samlSPMetaDataXML" && (
            <div className="box">
              <strong className="title2">
                {t("samlSPMetaDataXML")}
                {name
                  ? data.samlSPMetaDataXML
                    ? data.samlSPMetaDataXML[name]
                      ? data.samlSPMetaDataXML[name].samlSPMetaDataXML === ""
                        ? "⚠️"
                        : ""
                      : "⚠️"
                    : ""
                  : "⚠️"}
              </strong>
              <div>
                <FileForm
                  value={
                    (name
                      ? data.samlSPMetaDataXML
                        ? data.samlSPMetaDataXML[name]
                          ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                          : undefined
                        : undefined
                      : undefined) || ""
                  }
                  fieldName="samlSPMetaDataXML"
                  updateFunc={(e: string) => {
                    dispatch(
                      updateSamlSPMetadata({
                        name: name ? name : "",
                        data: e,
                      })
                    );
                  }}
                />
              </div>
            </div>
          )}
          {(optionSelected === "samlSPMetaDataExportedAttributes" ||
            optionSelected === "basic") && (
            <div className="box">
              <table>
                <tbody>
                  <SamlAttributeContainerForm
                    value={
                      data.samlSPMetaDataExportedAttributes
                        ? data.samlSPMetaDataExportedAttributes[name]
                          ? data.samlSPMetaDataExportedAttributes[name]
                        : {}
                      : {}
                    }
                    appName={name}
                    fieldName="samlSPMetaDataExportedAttributes"
                  />
                </tbody>
              </table>
            </div>
          )}
          {optionSelected === "samlSPMetaDataMacros" && (
            <div className="box">
              <strong className="title2">{t("samlSPMetaDataMacros")}</strong>

              <table id="samlSPMetaDataMacros">
                <thead>
                  <tr>
                    <th>{t("keys")}</th>
                    <Tooltip
                      title={
                        <Markdown>{definitions.samlSPMetaDataMacros}</Markdown>
                      }
                    >
                      <th>{t("values")}</th>
                    </Tooltip>
                    <th>
                      <IconButton
                        className="plus"
                        onClick={() => dispatch(newSAMLSPMetaDataMacros(name))}
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                {data.samlSPMetaDataMacros ? (
                  <TableVars
                    appName={name}
                    vars={data.samlSPMetaDataMacros[name]}
                    tableID={"samlSPMetaDataMacros"}
                    dispatch={dispatch}
                    delFunction={delSAMLSPMetaDataMacros}
                    updateFunction={updateSAMLSPMetaDataMacros}
                  />
                ) : (
                  ""
                )}
              </table>
              <IconButton
                className="plus"
                onClick={() => dispatch(newSAMLSPMetaDataMacros(name))}
              >
                <AddCircleIcon color="success" />
              </IconButton>
            </div>
          )}
          {optionSelected === "samlSPMetaDataOptions" && (
            <div className="box">
              <strong className="title2">
                {t("samlSPMetaDataOptions")} / {t(suboptionSelect)}
              </strong>
              <OptionSaml
                name={name}
                dispatch={dispatch}
                optionSelect={suboptionSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
