import { t } from "i18next";
import { useAppSelector } from "../../app/hooks";
import "./NativeApp.css";
import { OptionOidc } from "./OptionOidc";

function ExportedAttribute(appName: string, vars: Record<string, string>) {
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        const [name, type, table] = vars[key].split(";");
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
              <select
                value={String(type)}
                onChange={(el) => console.log(el.target.value)}
              >
                <option value="string">{t("string")}</option>
                <option value="int">{t("int")}</option>
                <option value="bool">{t("bool")}</option>
              </select>
            </td>
            <td>
              <select
                value={String(table)}
                onChange={(el) => console.log(el.target.value)}
              >
                <option value="auto">{t("auto")}</option>
                <option value="always">{t("always")}</option>
                <option value="never">{t("never")}</option>
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

export function tableVars(appName: string, vars: Record<string, string>) {
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

export function OIDCApp({ name }: { name: string }) {
  const data = useAppSelector((state) => state.config.data.config);

  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataOptionsBasic")}</strong>
          <table>
            <tbody>
              <tr>
                <th>{t("oidcRPMetaDataOptionsPublic")}</th>
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
                          console.log("aka");
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
                        onChange={() => console.log("akak")}
                      />
                      <span>{t("off")}</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsClientID")}</th>
                <td>
                  <input
                    className="form"
                    type="text"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsClientID
                    )}
                    onChange={(el) => console.log(el.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsClientSecret")}</th>
                <td>
                  <input
                    className="form"
                    type="number"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsClientSecret
                    )}
                    onChange={(el) => console.log(el.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("oidcRPMetaDataOptionsRedirectUris")}</th>
                <td>
                  <input
                    type="text"
                    name="oidcRPMetaDataOptionsRedirectUris"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsRedirectUris
                    )}
                    onChange={() => {
                      console.log("aka");
                    }}
                  />
                </td>
              </tr>{" "}
              <tr>
                <th>{t("oidcRPMetaDataOptionsAuthMethod")}</th>
                <td>
                  <input
                    type="text"
                    name="oidcRPMetaDataOptionsAuthMethod"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAuthMethod
                    )}
                    onChange={() => {
                      console.log("aka");
                    }}
                  />
                </td>
              </tr>{" "}
              <tr>
                <th>{t("oidcRPMetaDataOptionsDisplay")}</th>
                <td>
                  <input
                    type="text"
                    value={String(
                      data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsDisplay
                    )}
                    onChange={() => {
                      console.log("aka");
                    }}
                  />
                </td>
              </tr>{" "}
              <tr>
                <th>{t("oidcRPMetaDataOptionsIcon")}</th>
                <td>
                  <input
                    type="text"
                    value={String(
                      data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsIcon
                    )}
                    onChange={() => {
                      console.log("aka");
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataExportedVars")}</strong>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
          <table id="exportedVars">
            <thead>
              <td>{t("claimName")}</td>
              <td>{t("variableName")}</td>
              <td>{t("type")}</td>
              <td>{t("array")}</td>
            </thead>
            {data.oidcRPMetaDataExportedVars
              ? ExportedAttribute(name, data.oidcRPMetaDataExportedVars[name])
              : ""}
          </table>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataMacros")}</strong>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
          <table>
            <thead>
              <th>{t("keys")}</th>
              <th>{t("values")}</th>
            </thead>
            {data.oidcRPMetaDataMacros
              ? tableVars(name, data.oidcRPMetaDataMacros[name])
              : ""}
          </table>{" "}
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("oidcRPMetaDataOptions")}</strong>
          <OptionOidc name={name} />
        </div>
      </div>
    </div>
  );
}
