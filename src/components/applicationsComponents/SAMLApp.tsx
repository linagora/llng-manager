import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppPage.css";
import attributes from "../../static/attributes.json";
import { URLLoader } from "../managerComponents/URLLoader";
import { updateSamlSPMetadata } from "../../features/config/configSlice";
import { handleChangeFile } from "../../utils/readFiles";
import { OptionSaml } from "./OptionSaml";

function ExportedAttribute(appName: string, vars: Record<string, string>) {
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        const [name, friendlyName, mandatory, format] = vars[key].split(";");
        return (
          <tr>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={key}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={name}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={friendlyName}
              />
            </td>
            <td>
              <label>
                <input
                  type="radio"
                  className="radio"
                  onChange={() => console.log("abab")}
                  name="mandatory"
                  checked={mandatory === "1"}
                />
                <span>{t("on")}</span>
              </label>
              <label>
                <input
                  type="radio"
                  className="radio"
                  onChange={() => console.log("abab")}
                  name="mandatory"
                  checked={mandatory === "0"}
                />
                <span>{t("off")}</span>
              </label>
            </td>
            <td>
              <select
                name="format"
                defaultValue={""}
                value={String(format)}
                onChange={(el) => console.log(el.target.value)}
              >
                {SAMLFormat()}
              </select>
            </td>

            <td>
              <button
                onClick={() => {
                  console.log("del");
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

function SAMLFormat() {
  const typeList = attributes.samlSPMetaDataExportedAttributes.select;
  return typeList.map((type) => {
    return <option value={`${type.k}`}>{t(type.v)}</option>;
  });
}

function tableVars(appName: string, vars: Record<string, string>) {
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        return (
          <tr>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={key}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={vars[key]}
              />
            </td>

            <td>
              <button
                onClick={() => {
                  console.log("del");
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

  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong className="title2">{t("samlSPMetaDataXML")}</strong>
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
        <div className="box">
          <strong className="title2">
            {t("samlSPMetaDataExportedAttributes")}
          </strong>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
          <table id="exportedAttribute">
            <thead>
              <th>{t("variableName")}</th>
              <th>{t("attributeName")}</th>
              <th>{t("friendlyName")}</th>
              <th>{t("mandatory")}</th>
              <th>{t("format")}</th>
            </thead>
            {data.samlSPMetaDataExportedAttributes
              ? ExportedAttribute(
                  name,
                  data.samlSPMetaDataExportedAttributes[name]
                )
              : ""}
          </table>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("samlSPMetaDataMacros")}</strong>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
          <table>
            <thead>
              <th>{t("keys")}</th>
              <th>{t("values")}</th>
            </thead>
            {data.samlSPMetaDataMacros
              ? tableVars(name, data.samlSPMetaDataMacros[name])
              : ""}
          </table>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("samlSPMetaDataOptions")}</strong>
          <OptionSaml name={name} />
        </div>
      </div>
    </div>
  );
}
