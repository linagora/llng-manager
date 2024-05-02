import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppPage.css";
import attributes from "../../static/attributes.json";
import { URLLoader } from "../managerComponents/URLLoader";
import {
  delSAMLSPMetaDataMacros,
  delSamlSPMetadataExportedAttribute,
  newSAMLSPMetaDataMacros,
  newSamlSPMetadataExportedAttribute,
  updateSAMLSPMetaDataMacros,
  updateSamlSPMetadata,
  updateSamlSPMetadataExportedAttribute,
} from "../../features/config/configSlice";
import { handleChangeFile } from "../../utils/readFiles";
import { OptionSaml } from "./OptionSaml";
import { TableVars } from "./TableVars";
import { useState } from "react";

function updateExpAttr(tableID: string) {
  const attrList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const name = cells[0].querySelector("input")?.value;
      const attName = cells[1].querySelector("input")?.value;
      const friendlyName = cells[2].querySelector("input")?.value;
      const format = cells[4].querySelector("select")?.value;

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

function ExportedAttribute(appName: string, vars: Record<string, string>) {
  const dispatch = useAppDispatch();
  let i = 0;
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        const [mandatory, name, format, friendlyName] = vars[key].split(";");
        i++;
        return (
          <tr key={i}>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateSamlSPMetadataExportedAttribute({
                      appName,
                      data: updateExpAttr("exportedAttribute"),
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
                    updateSamlSPMetadataExportedAttribute({
                      appName,
                      data: updateExpAttr("exportedAttribute"),
                    })
                  )
                }
                type="text"
                value={name}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateSamlSPMetadataExportedAttribute({
                      appName,
                      data: updateExpAttr("exportedAttribute"),
                    })
                  )
                }
                type="text"
                value={friendlyName}
              />
            </td>
            <td>
              <label>
                <input
                  type="radio"
                  className="radio"
                  onChange={() =>
                    dispatch(
                      updateSamlSPMetadataExportedAttribute({
                        appName,
                        data: updateExpAttr("exportedAttribute"),
                      })
                    )
                  }
                  name={`mandatory.
                  ${key}`}
                  checked={mandatory === "1"}
                />
                <span>{t("on")}</span>
              </label>
              <label>
                <input
                  type="radio"
                  className="radio"
                  onChange={() =>
                    dispatch(
                      updateSamlSPMetadataExportedAttribute({
                        appName,
                        data: updateExpAttr("exportedAttribute"),
                      })
                    )
                  }
                  name={`mandatory.
                  ${key}`}
                  checked={mandatory === "0"}
                />
                <span>{t("off")}</span>
              </label>
            </td>
            <td>
              <select
                name="format"
                value={String(format)}
                onChange={() =>
                  dispatch(
                    updateSamlSPMetadataExportedAttribute({
                      appName,
                      data: updateExpAttr("exportedAttribute"),
                    })
                  )
                }
              >
                {attributes.samlSPMetaDataExportedAttributes.select.map(
                  (type) => {
                    return (
                      <option key={type.k} value={`${type.k}`}>
                        {t(type.v)}
                      </option>
                    );
                  }
                )}
              </select>
            </td>

            <td>
              <button
                onClick={() => {
                  dispatch(
                    delSamlSPMetadataExportedAttribute({ appName, key })
                  );
                }}
                className="minus"
              >
                -
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export function SAMLApp({ name }: { name: string }) {
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
        <label onClick={() => setOptionSelected("samlSPMetaDataXML")}>
          {t("samlSPMetaDataXML")}
        </label>
        <label
          onClick={() => setOptionSelected("samlSPMetaDataExportedAttributes")}
        >
          {t("samlSPMetaDataExportedAttributes")}
        </label>
        <label onClick={() => setOptionSelected("samlSPMetaDataMacros")}>
          {t("samlSPMetaDataMacros")}
        </label>
        <label onClick={() => setOptionSelected("samlSPMetaDataOptions")}>
          {t("samlSPMetaDataOptions")}
        </label>
      </div>
      <div className="appDesc">
        {optionSelected === "samlSPMetaDataXML" && (
          <div className="box">
            <strong className="title2">
              {t("samlSPMetaDataXML")}{" "}
              {name
                ? data.samlSPMetaDataXML[name]
                  ? data.samlSPMetaDataXML[name].samlSPMetaDataXML === ""
                    ? "⚠️"
                    : ""
                  : "⚠️"
                : "⚠️"}
            </strong>
            <div>
              <textarea
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
                  name
                    ? data.samlSPMetaDataXML[name]
                      ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                      : undefined
                    : undefined
                }
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                onChange={(e) => {
                  handleChangeFile(e).then((fileContent) => {
                    console.log("File content:", fileContent);
                    dispatch(
                      updateSamlSPMetadata({
                        name: name ? name : "",
                        data: fileContent,
                      })
                    );
                  });
                }}
              />
            </div>
            <URLLoader appName={name} loadFunction={updateSamlSPMetadata} />
          </div>
        )}
        {(optionSelected === "samlSPMetaDataExportedAttributes" ||
          optionSelected === "basic") && (
          <div className="box">
            <strong className="title2">
              {t("samlSPMetaDataExportedAttributes")}
            </strong>
            <button
              className="plus"
              onClick={() => dispatch(newSamlSPMetadataExportedAttribute(name))}
            >
              +
            </button>
            <table id="exportedAttribute">
              <thead>
                <tr>
                  <th>{t("variableName")}</th>
                  <th>{t("attributeName")}</th>
                  <th>{t("friendlyName")}</th>
                  <th>{t("mandatory")}</th>
                  <th>{t("format")}</th>
                </tr>
              </thead>
              {data.samlSPMetaDataExportedAttributes
                ? ExportedAttribute(
                    name,
                    data.samlSPMetaDataExportedAttributes[name]
                  )
                : ""}
            </table>
            <button
              className="plus"
              onClick={() => dispatch(newSamlSPMetadataExportedAttribute(name))}
            >
              +
            </button>
          </div>
        )}
        {optionSelected === "samlSPMetaDataMacros" && (
          <div className="box">
            <strong className="title2">{t("samlSPMetaDataMacros")}</strong>
            <button
              className="plus"
              onClick={() => dispatch(newSAMLSPMetaDataMacros(name))}
            >
              +
            </button>
            <table id="samlSPMetaDataMacros">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                </tr>
              </thead>
              {data.samlSPMetaDataMacros
                ? TableVars(
                    name,
                    data.samlSPMetaDataMacros[name],
                    "samlSPMetaDataMacros",
                    delSAMLSPMetaDataMacros,
                    updateSAMLSPMetaDataMacros
                  )
                : ""}
            </table>
            <button
              className="plus"
              onClick={() => dispatch(newSAMLSPMetaDataMacros(name))}
            >
              +
            </button>
          </div>
        )}
        {optionSelected === "samlSPMetaDataOptions" && (
          <div className="box">
            <strong className="title2">{t("samlSPMetaDataOptions")}</strong>
            <OptionSaml name={name} />
          </div>
        )}
      </div>
    </div>
  );
}
