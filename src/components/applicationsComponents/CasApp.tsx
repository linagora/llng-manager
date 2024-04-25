import { t } from "i18next";
import { useAppSelector } from "../../app/hooks";
import "./NativeApp.css";

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

export function CasApp({ name }: { name: string }) {
  const vars = useAppSelector((state) =>
    state.config.data.config.casAppMetaDataExportedVars
      ? state.config.data.config.casAppMetaDataExportedVars[name]
      : {}
  );
  const casAppMetaDataMacros = useAppSelector((state) => {
    return state.config.data.config.casAppMetaDataMacros
      ? state.config.data.config.casAppMetaDataMacros[name]
      : {};
  });

  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong className="title2">{t("casAppMetaDataExportedVars")}</strong>
          <button className="plus" onClick={() => console.log("new attribute")}>
            +
          </button>
          <table id="exportedVars">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th></th>
              </tr>
            </thead>
            {tableVars(name, vars)}
          </table>
        </div>
        <div className="box">
          <strong className="title2">{t("casAppMetaDataMacros")}</strong>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
          <table id="post">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>

                <th></th>
              </tr>
            </thead>
            {tableVars(name, casAppMetaDataMacros)}
          </table>
          <button className="plus" onClick={() => console.log("+")}>
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("casAppMetaDataOptions")}</strong>
          <table>
            <tbody>
              <tr>
                <th>{t("casAppMetaDataOptionsDisplayName")}</th>
                <td>
                  <input className="form" type="text" />
                </td>
              </tr>
              <tr>
                <th>{t("casAppMetaDataOptionsService")}</th>
                <td>
                  <input className="form" type="text" />
                </td>
              </tr>
              <tr>
                <th>{t("casAppMetaDataOptionsLogout")}</th>
                <td>
                  <div>
                    <label>
                      <input type="radio" name="casAppMetaDataOptionsLogout" />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input type="radio" name="casAppMetaDataOptionsLogout" />
                      <span>{t("off")}</span>
                    </label>
                    <label>
                      <input type="radio" name="casAppMetaDataOptionsLogout" />
                      <span>{t("default")}</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{t("casAppMetaDataOptionsAuthnLevel")}</th>
                <td>
                  <input />
                </td>
              </tr>
              <tr>
                <th>{t("casAppMetaDataOptionsRule")}</th>
                <td>
                  <input className="form" type="text" />
                </td>
              </tr>
              <tr>
                <th>{t("casAppMetaDataOptionsComment")}</th>
                <td>
                  <textarea className="form" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
