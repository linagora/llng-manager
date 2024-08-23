import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, IconButton, TextField, Tooltip, styled } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  delSAMLSPMetaDataMacros,
  newSAMLSPMetaDataMacros,
  updateSAMLSPMetaDataMacros,
  updateSamlSPMetadata,
} from "../../features/config/configSlice";
import SamlAttributeContainerForm from "../../forms/SamlAttributeContainerForm";
import definitions from "../../static/definitions.json";
import { handleChangeFile } from "../../utils/readFiles";
import { URLLoader } from "../managerComponents/URLLoader";
import "./AppPage.css";
import { OptionSaml } from "./OptionSaml";
import { TableVars } from "./TableVars";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function SAMLApp({
  name,
  dispatch,
}: {
  name: string;
  dispatch: Function;
}) {
  const data = useAppSelector((state) => state.config.data.config);
  const [optionSelected, setOptionSelected] = useState("basic");
  return (
    <div>
      <div className="top">
        <strong className="title">{name}</strong>
      </div>
      <div className="optionNavbar">
        <label
          className={`option ${optionSelected === "basic" ? "selected" : ""}`}
          onClick={() => setOptionSelected("basic")}
        >
          {t("Basic Option")}
        </label>
        <label
          className={`option ${
            optionSelected === "samlSPMetaDataXML" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("samlSPMetaDataXML")}
        >
          {t("samlSPMetaDataXML")}
        </label>
        <label
          className={`option ${
            optionSelected === "samlSPMetaDataExportedAttributes"
              ? "selected"
              : ""
          }`}
          onClick={() => setOptionSelected("samlSPMetaDataExportedAttributes")}
        >
          {t("samlSPMetaDataExportedAttributes")}
        </label>
        <label
          className={`option ${
            optionSelected === "samlSPMetaDataMacros" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("samlSPMetaDataMacros")}
        >
          {t("samlSPMetaDataMacros")}
        </label>
        <label
          className={`option ${
            optionSelected === "samlSPMetaDataOptions" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("samlSPMetaDataOptions")}
        >
          {t("samlSPMetaDataOptions")}
        </label>
      </div>
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
                multiline
                fullWidth
                rows={4}
                placeholder="XML MetaData"
                onChange={(e) =>
                  dispatch(
                    updateSamlSPMetadata({
                      name: name ? name : "",
                      data: e.target.value,
                    })
                  )
                }
                value={
                  (name
                    ? data.samlSPMetaDataXML
                      ? data.samlSPMetaDataXML[name]
                        ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                        : undefined
                      : undefined
                    : undefined) || ""
                }
              />
            </div>
            <div>
              <Button
                sx={{ margin: "5px" }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {t("upload")}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                      handleChangeFile(e as ChangeEvent<HTMLInputElement>).then(
                        (fileContent) => {
                          console.debug("File content:", fileContent);
                          dispatch(
                            updateSamlSPMetadata({
                              name: name ? name : "",
                              data: fileContent,
                            })
                          );
                        }
                      );
                    }
                  }}
                />
              </Button>
            </div>
            <URLLoader appName={name} loadFunction={updateSamlSPMetadata} />
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
            <strong className="title2">{t("samlSPMetaDataOptions")}</strong>
            <OptionSaml name={name} dispatch={dispatch} />
          </div>
        )}
      </div>
    </div>
  );
}
