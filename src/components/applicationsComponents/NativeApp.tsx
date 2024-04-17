import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  transformJsonToList,
  transformListToJson,
} from "../../utils/nativeRule";
import "./NativeApp.css";
import attributes from "./../../static/attributes.json";
import {
  delLocationRule,
  newLocationRule,
  updateLocationRule,
} from "../../features/config/configSlice";

function updateRules(appName: string, tableID: string) {
  const ruleList = [];

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const comment = cells[0].querySelector("input")?.value;
      const regex = cells[1].querySelector("input")?.value;
      const rule = cells[2].querySelector("input")?.value;
      const authLevel = cells[3].querySelector("input")?.value;
      if (cells.length === 4) {
        ruleList.push({
          regex: comment ? comment : "",
          rule: regex ? regex : "",
        });
      } else {
        const inputs = {
          comment: comment ? comment : "",
          regex: regex ? regex : "",
          rule: rule ? rule : "",
          authLevel: authLevel ? authLevel : "",
        };

        ruleList.push(inputs);
      }
    }
  }
  const locationRules = transformListToJson(ruleList);
  return locationRules;
}

function NativeRule(appName: string, locationRules: Record<string, string>) {
  const dispatch = useAppDispatch();
  return (
    <tbody>
      {Object.keys(locationRules).map((group) => {
        const [commentary, regex, authLevel] = transformJsonToList(group);
        if (regex === "default") {
          return <></>;
        }
        return (
          <tr>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateLocationRule({
                      appName,
                      locationRules: updateRules(appName, "locationRules"),
                    })
                  )
                }
                type="text"
                defaultValue={commentary}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateLocationRule({
                      appName,
                      locationRules: updateRules(appName, "locationRules"),
                    })
                  )
                }
                type="text"
                defaultValue={regex}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateLocationRule({
                      appName,
                      locationRules: updateRules(appName, "locationRules"),
                    })
                  )
                }
                type="text"
                defaultValue={locationRules[group]}
              />
            </td>
            <td>
              <input
                type="number"
                className="authLevel"
                onChange={() =>
                  dispatch(
                    updateLocationRule({
                      appName,
                      locationRules: updateRules(appName, "locationRules"),
                    })
                  )
                }
                defaultValue={authLevel}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  dispatch(
                    delLocationRule({
                      name: appName,
                      key: `(?#${commentary})${regex}${
                        authLevel ? `(?#AuthnLevel=${authLevel})` : ""
                      }`,
                    })
                  )
                }
                className="minus"
              >
                -
              </button>
            </td>
          </tr>
        );
      })}
      <tr>
        <th>{t("defaultRule")}</th>
        <td>
          <input
            className="form"
            type="text"
            defaultValue={"default"}
            readOnly
          />
        </td>
        <td>
          <input
            className="form"
            type="text"
            onChange={() =>
              dispatch(
                updateLocationRule({
                  appName,
                  locationRules: updateRules(appName, "locationRules"),
                })
              )
            }
            defaultValue={locationRules["default"]}
          />
        </td>
        <td>
          <input type="text" value={"default"} className="authLevel" readOnly />
        </td>
        <td>
          <button
            className="plus"
            onClick={() => dispatch(newLocationRule(appName))}
          >
            +
          </button>
        </td>
      </tr>
    </tbody>
  );
}

function NativeHeaders(exportedHeaders: Record<string, string>) {
  return (
    <tbody>
      {Object.keys(exportedHeaders).map((header) => {
        return (
          <tr>
            <td>
              <input className="form" type="text" defaultValue={header} />
            </td>
            <td>
              <input
                className="form"
                type="text"
                defaultValue={exportedHeaders[header]}
              />
            </td>
            <td>
              <button className="minus">-</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function NativPost(post: Record<string, Record<string, string>>) {
  return (
    <tbody>
      {Object.keys(post).map((link) => {
        return (
          <tr>
            <td>
              <input className="form" type="text" defaultValue={link} />
            </td>
            <td>
              <input
                className="form"
                type="text"
                defaultValue={post[link].target}
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                defaultValue={post[link].jqueryUrl}
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                defaultValue={post[link].formSelector}
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                defaultValue={post[link].buttonSelector}
              />
            </td>
            <td>
              <button className="minus">-</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function NativeType() {
  const typeList = attributes.vhostType.select;
  return typeList.map((type) => {
    return <option value={`${type.k}`}>{t(type.v)}</option>;
  });
}

export function NativeApp({ name }: { name: string }) {
  const locationRules = useAppSelector(
    (state) => state.config.data.config.locationRules[name]
  );
  const exportedHeaders = useAppSelector((state) =>
    state.config.data.config.exportedHeaders
      ? state.config.data.config.exportedHeaders[name]
      : {}
  );
  const post = useAppSelector((state) =>
    state.config.data.config.post ? state.config.data.config.post[name] : {}
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong className="title2">{t("locationRules")}</strong>
          <button
            className="plus"
            onClick={() => dispatch(newLocationRule(name))}
          >
            +
          </button>
          <table id="locationRules">
            <thead>
              <tr>
                <th>{t("vhostComment")}</th>
                <th>{t("regexp")}</th>
                <th>{t("rules")}</th>
                <th>{t("rulesAuthnLevel")}</th>
                <th></th>
              </tr>
            </thead>
            {NativeRule(name, locationRules)}
          </table>
        </div>
        <div className="box">
          <div>
            <strong className="title2">{t("exportedHeaders")}</strong>
            <button className="plus">+</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th></th>
              </tr>
            </thead>
            {NativeHeaders(exportedHeaders)}
          </table>
        </div>
        <div className="box">
          <strong className="title2">{t("post")}</strong>
          <button className="plus">+</button>
          <table>
            <thead>
              <tr>
                <th>{t("postUrl")}</th>
                <th>{t("postTargetUrl")}</th>
                <th>{t("jqueryUrl")}</th>
                <th>{t("jqueryFormSelector")}</th>
                <th>{t("jqueryButtonSelector")}</th>
                <th></th>
              </tr>
            </thead>
            {NativPost(post)}
          </table>
        </div>

        <div className="box">
          <strong className="title2">{t("vhostOptions")}</strong>
          <table>
            <tbody>
              <tr>
                <th>{t("port")}</th>
                <td>
                  <input className="form" type="text" />
                </td>
              </tr>
              <tr>
                <th>{t("vhostHttps")}</th>
                <td>
                  <div>
                    <label>
                      <input type="radio" />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input type="radio" />
                      <span>{t("off")}</span>
                    </label>
                    <label>
                      <input type="radio" />
                      <span>{t("default")}</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{t("maintenance")}</th>
                <td>
                  <div>
                    <label>
                      <input type="radio" />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input type="radio" />
                      <span>{t("off")}</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{t("vhostAliases")}</th>
                <td>
                  <input className="form" type="text" />
                </td>
              </tr>
              <tr>
                <th>{t("vhostAccessToTrace")}</th>
                <td>
                  <input className="form" type="text" />
                </td>
              </tr>
              <tr>
                <th>{t("vhostType")}</th>
                <td>
                  <select
                    name="type"
                    defaultValue={attributes.vhostType.default}
                  >
                    {NativeType()}
                  </select>
                </td>
              </tr>
              <tr>
                <th>{t("vhostAuthnLevel")}</th>
                <td>
                  <input className="form" type="number" />
                </td>
              </tr>
              <tr>
                <th>{t("vhostServiceTokenTTL")}</th>
                <td>
                  <input className="form" type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
