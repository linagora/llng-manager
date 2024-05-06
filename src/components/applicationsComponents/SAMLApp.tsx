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
import { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  styled,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <FormControl>
                <RadioGroup
                  row
                  value={mandatory}
                  onChange={() =>
                    dispatch(
                      updateSamlSPMetadataExportedAttribute({
                        appName,
                        data: updateExpAttr("exportedAttribute"),
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
                      updateSamlSPMetadataExportedAttribute({
                        appName,
                        data: updateExpAttr(
                          "exportedAttribute",
                          key,
                          e.target.value
                        ),
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
              <Button
                onClick={() => {
                  dispatch(
                    delSamlSPMetadataExportedAttribute({ appName, key })
                  );
                }}
                className="minus"
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
              {t("samlSPMetaDataXML")}
              {name
                ? data.samlSPMetaDataXML[name]
                  ? data.samlSPMetaDataXML[name].samlSPMetaDataXML === ""
                    ? "⚠️"
                    : ""
                  : "⚠️"
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
                  name
                    ? data.samlSPMetaDataXML[name]
                      ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                      : undefined
                    : undefined
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
                          console.log("File content:", fileContent);
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
            <strong className="title2">
              {t("samlSPMetaDataExportedAttributes")}
            </strong>

            <table id="exportedAttribute">
              <thead>
                <tr>
                  <th>{t("variableName")}</th>
                  <th>{t("attributeName")}</th>
                  <th>{t("friendlyName")}</th>
                  <th>{t("mandatory")}</th>
                  <th>{t("format")}</th>
                  <th>
                    <Button
                      onClick={() =>
                        dispatch(newSamlSPMetadataExportedAttribute(name))
                      }
                      color="success"
                      startIcon={<AddCircleIcon />}
                    />
                  </th>
                </tr>
              </thead>
              {data.samlSPMetaDataExportedAttributes
                ? ExportedAttribute(
                    name,
                    data.samlSPMetaDataExportedAttributes[name]
                  )
                : ""}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newSamlSPMetadataExportedAttribute(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "samlSPMetaDataMacros" && (
          <div className="box">
            <strong className="title2">{t("samlSPMetaDataMacros")}</strong>

            <table id="samlSPMetaDataMacros">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() => dispatch(newSAMLSPMetaDataMacros(name))}
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
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
            <Button
              className="plus"
              onClick={() => dispatch(newSAMLSPMetaDataMacros(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
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
