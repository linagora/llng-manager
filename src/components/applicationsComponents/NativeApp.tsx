import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delLocationRule,
  delVhostHeader,
  delVhostPost,
  newLocationRule,
  newVhostHeaders,
  newVhostPost,
  updateDefaultLocationRule,
  updateLocationRule,
  updateVhostHeaders,
  updateVhostOptions,
  updateVhostPost,
} from "../../features/config/configSlice";
import definitions from "../../static/definitions.json";
import {
  transformJsonToList,
  transformListToJson,
} from "../../utils/nativeRule";
import attributes from "./../../static/attributes.json";
import "./AppPage.css";
import { TableVars } from "./TableVars";
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

function NativeRule(
  appName: string,
  locationRules: Record<string, string>,
  dispatch: Function
) {
  let i = 0;
  return (
    <tbody>
      {Object.keys(locationRules).map((group) => {
        i++;
        const [commentary, regex, authLevel] = transformJsonToList(group);
        if (regex === "default") {
          return null;
        }
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
                    updateLocationRule({
                      appName,
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                type="text"
                value={commentary || ""}
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
                    updateLocationRule({
                      appName,
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                type="text"
                value={regex || ""}
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
                    updateLocationRule({
                      appName,
                      locationRules: updateRules("locationRules"),
                    })
                  )
                }
                type="text"
                value={locationRules[group] || ""}
              />
            </td>
            <td>
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
                value={authLevel || 0}
              />
            </td>
            <td>
              <IconButton
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
                <RemoveCircleIcon color="error" />
              </IconButton>
            </td>
          </tr>
        );
      })}
      <tr>
        <th>{t("defaultRule")}</th>
        <td>
          <TextField
            size="small"
            margin="normal"
            variant="filled"
            className="form"
            type="text"
            value={"default"}
            disabled
          />
        </td>
        <td>
          <TextField
            size="small"
            margin="normal"
            variant="filled"
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
          <TextField
            size="small"
            margin="normal"
            variant="filled"
            type="text"
            value={"default"}
            className="authLevel"
            disabled
          />
        </td>
        <td>
          <IconButton
            className="plus"
            onClick={() => dispatch(newLocationRule(appName))}
          >
            <AddCircleIcon color="success" />
          </IconButton>
        </td>
      </tr>
    </tbody>
  );
}

function NativPost(
  appName: string,
  post: Record<string, Record<string, string>>,
  dispatch: Function
) {
  let i = 0;
  return (
    <tbody>
      {Object.keys(post).map((link) => {
        i++;
        return (
          <tr key={i}>
            <td>
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <TextField
                size="small"
                margin="normal"
                variant="filled"
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
              <IconButton
                className="minus"
                onClick={() =>
                  dispatch(delVhostPost({ name: appName, key: link }))
                }
              >
                <RemoveCircleIcon color="error" />
              </IconButton>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export function NativeApp({ name }: { name: string }) {
  const locationR = useAppSelector((state) => {
    if (state.config.data.config.locationRules) {
      return state.config.data.config.locationRules[name];
    }
  });
  const locationRules = locationR ? locationR : {};
  const exportedHeaders = useAppSelector((state) => {
    if (state.config.data.config.exportedHeaders) {
      return state.config.data.config.exportedHeaders[name];
    }
  });
  const post = useAppSelector((state) => {
    if (state.config.data.config.post) {
      return state.config.data.config.post[name];
    }
  });
  const options = useAppSelector((state) => {
    if (state.config.data.config.vhostOptions) {
      return state.config.data.config.vhostOptions[name];
    }
  });
  const [optionSelected, setOptionSelected] = useState("basic");
  const dispatch = useAppDispatch();
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
            optionSelected === "locationRules" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("locationRules")}
        >
          {t("locationRules")}
        </label>
        <label
          className={`option ${
            optionSelected === "exportedHeaders" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("exportedHeaders")}
        >
          {t("exportedHeaders")}
        </label>
        <label
          className={`option ${optionSelected === "post" ? "selected" : ""}`}
          onClick={() => setOptionSelected("post")}
        >
          {t("post")}
        </label>
        <label
          className={`option ${
            optionSelected === "vhostOptions" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("vhostOptions")}
        >
          {t("vhostOptions")}
        </label>
      </div>
      <div className="appDesc">
        {optionSelected === "basic" && (
          <div className="box">
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.vhostComment
                          ? definitions.vhostComment
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("vhostComment")}</th>
                  </Tooltip>

                  <th>{t("regexp")}</th>

                  <th>{t("rules")}</th>

                  <th>{t("rulesAuthnLevel")}</th>
                </tr>
                <tr>
                  <th>{t("defaultRule")}</th>

                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={"default"}
                      disabled
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      onChange={(e) =>
                        dispatch(
                          updateDefaultLocationRule({
                            appName: name,
                            rule: e.target.value,
                          })
                        )
                      }
                      value={locationRules["default"]}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type="text"
                      value={"default"}
                      className="authLevel"
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={<Markdown>{definitions.maintenance}</Markdown>}
                  >
                    <th>{t("maintenance")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          options
                            ? options.vhostMaintenance
                            : attributes.vhostMaintenance.default
                        }
                        onChange={(e) => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostMaintenance",
                              value: Number(e.target.value),
                            })
                          );
                        }}
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
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {optionSelected === "locationRules" && (
          <div className="box">
            <strong className="title2">{t("locationRules")}</strong>

            <table id="locationRules">
              <thead>
                <tr>
                  <th>{t("vhostComment")}</th>
                  <th>{t("regexp")}</th>
                  <th>{t("rules")}</th>
                  <th>{t("rulesAuthnLevel")}</th>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newLocationRule(name))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              {NativeRule(name, locationRules, dispatch)}
            </table>
          </div>
        )}
        {(optionSelected === "exportedHeaders" ||
          optionSelected === "basic") && (
          <div className="box">
            <div>
              <strong className="title2">{t("exportedHeaders")}</strong>
            </div>
            <table id="exportedHeaders">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <Tooltip
                    title={<Markdown>{definitions.exportedHeaders}</Markdown>}
                  >
                    <th>{t("values")}</th>
                  </Tooltip>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newVhostHeaders(name))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={name}
                vars={exportedHeaders ? exportedHeaders : {}}
                tableID={"exportedHeaders"}
                dispatch={dispatch}
                delFunction={delVhostHeader}
                updateFunction={updateVhostHeaders}
              />
            </table>
            <IconButton
              className="plus"
              onClick={() => dispatch(newVhostHeaders(name))}
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </div>
        )}
        {optionSelected === "post" && (
          <div className="box">
            <strong className="title2">{t("post")}</strong>

            <table id="post">
              <thead>
                <tr>
                  <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                    <th>{t("postUrl")}</th>
                  </Tooltip>
                  <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                    <th>{t("postTargetUrl")}</th>
                  </Tooltip>
                  <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                    <th>{t("jqueryUrl")}</th>
                  </Tooltip>
                  <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                    <th>{t("jqueryFormSelector")}</th>
                  </Tooltip>
                  <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                    <th>{t("jqueryButtonSelector")}</th>
                  </Tooltip>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newVhostPost(name))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              {NativPost(name, post ? post : {}, dispatch)}
            </table>
            <IconButton
              className="plus"
              onClick={() => dispatch(newVhostPost(name))}
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </div>
        )}

        {optionSelected === "vhostOptions" && (
          <div className="box">
            <strong className="title2">{t("vhostOptions")}</strong>
            <table>
              <tbody>
                <tr>
                  <Tooltip title={<Markdown>{definitions.port}</Markdown>}>
                    <th>{t("port")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="number"
                      value={String(
                        options
                          ? options.vhostPort
                          : attributes.vhostPort.default
                      )}
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
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.vhostHttps ? definitions.vhostHttps : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("vhostHttps")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          options
                            ? options.vhostHttps
                            : attributes.vhostHttps.default
                        }
                        onChange={(e) => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostHttps",
                              value: Number(e.target.value),
                            })
                          );
                        }}
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
                        <FormControlLabel
                          value={-1}
                          control={<Radio />}
                          label={t("default")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={<Markdown>{definitions.maintenance}</Markdown>}
                  >
                    <th>{t("maintenance")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          options
                            ? options.vhostMaintenance
                            : attributes.vhostMaintenance.default
                        }
                        onChange={(e) => {
                          dispatch(
                            updateVhostOptions({
                              name,
                              option: "vhostMaintenance",
                              value: Number(e.target.value),
                            })
                          );
                        }}
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
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.vhostAliases
                          ? definitions.vhostAliases
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("vhostAliases")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={String(
                        options
                          ? options.vhostAliases
                          : attributes.vhostAliases.default
                      )}
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
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.vhostAccessToTrace
                          ? definitions.vhostAccessToTrace
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("vhostAccessToTrace")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="text"
                      value={String(
                        options
                          ? options.vhostAccessToTrace
                          : attributes.vhostAccessToTrace.default
                      )}
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
                  <Tooltip title={<Markdown>{definitions.vhostType}</Markdown>}>
                    <th>{t("vhostType")}</th>
                  </Tooltip>
                  <td>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>{t("vhostType")}</InputLabel>
                      <Select
                        value={
                          options
                            ? options.vhostType
                            : attributes.vhostType.default
                        }
                        label={t("vhostType")}
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
                        {attributes.vhostType.select.map((type) => {
                          return (
                            <MenuItem key={type.k} value={type.k}>
                              {t(type.v)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.vhostAuthnLevel
                          ? definitions.vhostAuthnLevel
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("vhostAuthnLevel")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="number"
                      value={String(options ? options.vhostAuthnLevel : 0)}
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
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.vhostServiceTokenTTL
                          ? definitions.vhostServiceTokenTTL
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("vhostServiceTokenTTL")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="number"
                      value={String(
                        options
                          ? options.vhostServiceTokenTTL
                          : attributes.vhostServiceTokenTTL.default
                      )}
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
        )}
      </div>
    </div>
  );
}
