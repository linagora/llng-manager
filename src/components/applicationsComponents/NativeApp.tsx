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
  delVhostHeader,
  delVhostPost,
  newLocationRule,
  newVhostHeaders,
  newVhostPost,
  toggleMaintenance,
  updateLocationRule,
  updateVhostHeaders,
  updateVhostOptions,
  updateVhostPost,
} from "../../features/config/configSlice";
import { useDispatch } from "react-redux";

function updateRules(tableID: string) {
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

function updateHeaders(tableID: string) {
  const headerList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const values = cells[1].querySelector("input")?.value;
      if (key) {
        headerList[key] = values ? values : "";
      }
    }
  }
  return headerList;
}

function updatePost(tableID: string) {
  const post: Record<string, Record<string, string>> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const url = cells[0].querySelector("input")?.value;
      const target = cells[1].querySelector("input")?.value;
      const jqueryUrl = cells[2].querySelector("input")?.value;
      const formSelector = cells[3].querySelector("input")?.value;
      const buttonSelector = cells[4].querySelector("input")?.value;

      if (url) {
        post[url] = {
          buttonSelector: buttonSelector ? buttonSelector : "",
          formSelector: formSelector ? formSelector : "",
          jqueryUrl: jqueryUrl ? jqueryUrl : "",
          target: target ? target : "",
        };
      }
    }
  }
  return post;
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
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                type="text"
                value={commentary}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateLocationRule({
                      appName,
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                type="text"
                value={regex}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateLocationRule({
                      appName,
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                type="text"
                value={locationRules[group]}
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
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                value={authLevel}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  dispatch(
                    delLocationRule({
                      name: appName,
                      key: `(?#${commentary})${regex}${
                        authLevel ? `(?#AuthnLevel=${authLevel})` : ""
                      }`,
                    })
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
      <tr>
        <th>{t("defaultRule")}</th>
        <td>
          <input className="form" type="text" value={"default"} readOnly />
        </td>
        <td>
          <input
            className="form"
            type="text"
            onChange={() =>
              dispatch(
                updateLocationRule({
                  appName,
                  locationRules: updateRules("locationRules"),
                })
              )
            }
            value={locationRules["default"]}
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

function NativeHeaders(
  appName: string,
  exportedHeaders: Record<string, string>
) {
  const dispatch = useAppDispatch();
  return (
    <tbody>
      {Object.keys(exportedHeaders).map((header) => {
        return (
          <tr>
            <td>
              <input
                className="form"
                onChange={() =>
                  dispatch(
                    updateVhostHeaders({
                      appName,
                      exportedHeaders: updateHeaders("exportedHeaders"),
                    })
                  )
                }
                type="text"
                value={header}
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                value={exportedHeaders[header]}
                onChange={() =>
                  dispatch(
                    updateVhostHeaders({
                      appName,
                      exportedHeaders: updateHeaders("exportedHeaders"),
                    })
                  )
                }
              />
            </td>
            <td>
              <button
                className="minus"
                onClick={() =>
                  dispatch(delVhostHeader({ name: appName, key: header }))
                }
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

function NativPost(
  appName: string,
  post: Record<string, Record<string, string>>
) {
  const dispatch = useDispatch();
  return (
    <tbody>
      {Object.keys(post).map((link) => {
        return (
          <tr>
            <td>
              <input
                className="form"
                type="text"
                value={link}
                onChange={() =>
                  dispatch(
                    updateVhostPost({
                      appName,
                      post: updatePost("post"),
                    })
                  )
                }
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                value={post[link].target}
                onChange={() =>
                  dispatch(
                    updateVhostPost({
                      appName,
                      post: updatePost("post"),
                    })
                  )
                }
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                value={post[link].jqueryUrl}
                onChange={() =>
                  dispatch(
                    updateVhostPost({
                      appName,
                      post: updatePost("post"),
                    })
                  )
                }
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                value={post[link].formSelector}
                onChange={() =>
                  dispatch(
                    updateVhostPost({
                      appName,
                      post: updatePost("post"),
                    })
                  )
                }
              />
            </td>
            <td>
              <input
                className="form"
                type="text"
                value={post[link].buttonSelector}
                onChange={() =>
                  dispatch(
                    updateVhostPost({
                      appName,
                      post: updatePost("post"),
                    })
                  )
                }
              />
            </td>
            <td>
              <button
                className="minus"
                onClick={() =>
                  dispatch(delVhostPost({ name: appName, key: link }))
                }
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
  const options = useAppSelector(
    (state) => state.config.data.config.vhostOptions[name]
  );
  console.log(options);
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
            <button
              className="plus"
              onClick={() => dispatch(newVhostHeaders(name))}
            >
              +
            </button>
          </div>
          <table id="exportedHeaders">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th></th>
              </tr>
            </thead>
            {NativeHeaders(name, exportedHeaders)}
          </table>
          <button
            className="plus"
            onClick={() => dispatch(newVhostHeaders(name))}
          >
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("post")}</strong>
          <button className="plus" onClick={() => dispatch(newVhostPost(name))}>
            +
          </button>
          <table id="post">
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
            {NativPost(name, post)}
          </table>
          <button className="plus" onClick={() => dispatch(newVhostPost(name))}>
            +
          </button>
        </div>

        <div className="box">
          <strong className="title2">{t("vhostOptions")}</strong>
          <table>
            <tbody>
              <tr>
                <th>{t("port")}</th>
                <td>
                  <input
                    className="form"
                    type="number"
                    value={String(options.vhostPort)}
                    onChange={(el) => {
                      dispatch(
                        updateVhostOptions({
                          name,
                          option: "vhostPort",
                          value: el.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("vhostHttps")}</th>
                <td>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="HTTPS"
                        checked={options.vhostHttps === 1}
                        onChange={() => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostHttps",
                              value: 1,
                            })
                          );
                        }}
                      />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="HTTPS"
                        checked={options.vhostHttps === 0}
                        onChange={() => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostHttps",
                              value: 0,
                            })
                          );
                        }}
                      />
                      <span>{t("off")}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="HTTPS"
                        checked={options.vhostHttps === -1}
                        onChange={() => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostHttps",
                              value: -1,
                            })
                          );
                        }}
                      />
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
                      <input
                        type="radio"
                        name="maintenance"
                        value={1}
                        checked={Boolean(options.vhostMaintenance)}
                        onChange={() => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostMaintenance",
                              value: true,
                            })
                          );
                        }}
                      />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="maintenance"
                        value={0}
                        checked={!Boolean(options.vhostMaintenance)}
                        onChange={() =>
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostMaintenance",
                              value: false,
                            })
                          )
                        }
                      />
                      <span>{t("off")}</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{t("vhostAliases")}</th>
                <td>
                  <input
                    className="form"
                    type="text"
                    value={String(options.vhostAliases)}
                    onChange={(el) => {
                      dispatch(
                        updateVhostOptions({
                          name,
                          option: "vhostAliases",
                          value: el.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("vhostAccessToTrace")}</th>
                <td>
                  <input
                    className="form"
                    type="text"
                    value={String(options.vhostAccessToTrace)}
                    onChange={(el) => {
                      dispatch(
                        updateVhostOptions({
                          name,
                          option: "vhostAccessToTrace",
                          value: el.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("vhostType")}</th>
                <td>
                  <select
                    name="type"
                    defaultValue={attributes.vhostType.default}
                    value={String(options.vhostType)}
                    onChange={(el) =>
                      dispatch(
                        updateVhostOptions({
                          name,
                          option: "vhostType",
                          value: el.target.value,
                        })
                      )
                    }
                  >
                    {NativeType()}
                  </select>
                </td>
              </tr>
              <tr>
                <th>{t("vhostAuthnLevel")}</th>
                <td>
                  <input
                    className="form"
                    type="number"
                    value={String(options.vhostAuthnLevel)}
                    onChange={(el) => {
                      dispatch(
                        updateVhostOptions({
                          name,
                          option: "vhostAuthnLevel",
                          value: el.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("vhostServiceTokenTTL")}</th>
                <td>
                  <input
                    className="form"
                    type="number"
                    value={String(options.vhostServiceTokenTTL)}
                    onChange={(el) => {
                      dispatch(
                        updateVhostOptions({
                          name,
                          option: "vhostServiceTokenTTL",
                          value: el.target.value,
                        })
                      );
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
