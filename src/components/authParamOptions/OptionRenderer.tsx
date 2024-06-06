import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delChoiceOverParam,
  delChoiceParam,
  delCombOverParam,
  delCombParam,
  delModuleOpt,
  newChoiceOverParam,
  newChoiceParam,
  newCombOverParam,
  newCombParam,
  newModuleOpt,
  updateChoiceOverParam,
  updateChoiceParam,
  updateCombOverParam,
  updateCombParam,
  updateConfigParams,
  updateModuleOpt,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import tree from "../../static/tree.json";
import { llngConfig } from "../../utils/types";
import { TableVars } from "../applicationsComponents/TableVars";
import { SAMLRenderer } from "./SAMLRenderer";
function updateComb(
  tableID: string,
  data: Record<string, Record<string, string | Record<string, string>>>,
  selectData: { name: string; type?: string; use?: string },
  newkey?: string
) {
  const headerList: Record<
    string,
    Record<string, string | Record<string, string | number>>
  > = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const type = cells[1].querySelector("input")?.value;
      const use = cells[2].querySelector("input")?.value;
      if (key) {
        if (key === selectData?.name) {
          headerList[key] = {
            for: selectData?.use ? selectData.use : use ? use : "",
            over: data[key].over,
            type: selectData?.type ? selectData.type : type ? type : "",
          };
        } else if (newkey && key === newkey) {
          headerList[newkey] = {
            for: use ? use : "",
            over: data[selectData.name].over,
            type: type ? type : "",
          };
        } else {
          headerList[key] = {
            for: use ? use : "",
            over: data[key] ? data[key].over : {},
            type: type ? type : "",
          };
        }
      }
    }
  }
  return headerList;
}

function updateChoice(
  tableID: string,
  data: Record<string, string>,
  selectData: { name: string; auth?: string; user?: string; pass?: string },
  newkey?: string
) {
  const headerList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const authMod = cells[1].querySelector("input")?.value;
      const userMod = cells[2].querySelector("input")?.value;
      const passMod = cells[3].querySelector("input")?.value;
      const url = cells[4].querySelector("input")?.value;
      const cond = cells[5].querySelector("input")?.value;

      if (key) {
        if (key === selectData.name) {
          headerList[selectData.name] = [
            selectData?.auth ? selectData?.auth : authMod ? authMod : "",
            selectData?.user ? selectData?.user : userMod ? userMod : "",
            selectData?.pass ? selectData?.pass : passMod ? passMod : "",
            url ? url : "",
            cond ? cond : "",
            data[selectData.name].split(";")[5],
          ].join(";");
        } else if (newkey && key === newkey) {
          headerList[key ? key : ""] = [
            authMod ? authMod : selectData?.auth ? selectData?.auth : "",
            userMod ? userMod : selectData?.user ? selectData?.user : "",
            passMod ? passMod : selectData?.pass ? selectData?.pass : "",
            url ? url : "",
            cond ? cond : "",
            data[selectData.name].split(";")[5],
          ].join(";");
        } else {
          headerList[key ? key : ""] = [
            authMod ? authMod : selectData?.auth ? selectData?.auth : "",
            userMod ? userMod : selectData?.user ? selectData?.user : "",
            passMod ? passMod : selectData?.pass ? selectData?.pass : "",
            url ? url : "",
            cond ? cond : "",
            data[key].split(";")[5],
          ].join(";");
        }
      }
    }
  }
  return headerList;
}

function CmbModuleContainer(
  data: Record<string, Record<string, string | Record<string, string>>>,
  dispatch: Function
) {
  let i = 0;
  return (
    <>
      <table id="combTable">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("type")}</th>
            <th>{t("use")}</th>
            <th>
              <Button className="plus" onClick={() => dispatch(newCombParam())}>
                <AddCircleIcon color="success" />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            i++;
            return (
              <tr key={i}>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    placeholder={t(key)}
                    value={key}
                    onChange={(e) =>
                      dispatch(
                        updateCombParam(
                          updateComb(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          )
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      defaultValue={"LDAP"}
                      value={data[key].type}
                      onChange={(e) =>
                        dispatch(
                          updateCombParam(
                            updateComb("combTable", data, {
                              name: key,
                              type: String(e.target.value),
                            })
                          )
                        )
                      }
                    >
                      {attributes.combModules.select.map((e) => {
                        return (
                          <MenuItem key={e.v} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("use")}</InputLabel>
                    <Select
                      label={t("use")}
                      defaultValue={"0"}
                      value={String(data[key].for)}
                      onChange={(e) =>
                        dispatch(
                          updateCombParam(
                            updateComb("combTable", data, {
                              name: key,
                              use: String(e.target.value),
                            })
                          )
                        )
                      }
                    >
                      <MenuItem value={"0"}>{t("authAndUserdb")}</MenuItem>
                      <MenuItem value={"1"}>{t("authOnly")}</MenuItem>
                      <MenuItem value={"2"}>{t("userdbOnly")}</MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <IconButton
                    className="minus"
                    onClick={() => dispatch(delCombParam(key))}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {Object.keys(data).map((key) => {
        i++;
        return (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("overPrm") + " " + key}
            </AccordionSummary>

            <table id={`overParam${key}`}>
              <thead>
                <tr>
                  <th>{t("overPrm")}</th>
                  <th>{t("value")}</th>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newCombOverParam(key))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={key}
                vars={
                  (data[key].over ? data[key].over : {}) as Record<
                    string,
                    string
                  >
                }
                tableID={`overParam${key}`}
                dispatch={dispatch}
                delFunction={delCombOverParam}
                updateFunction={updateCombOverParam}
              />
            </table>
          </Accordion>
        );
      })}
    </>
  );
}
function authChoiceContainer(data: Record<string, string>, dispatch: Function) {
  let i = 0;
  return (
    <>
      <table id="choiceParam">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("authentication")}</th>
            <th>{t("userDB")}</th>
            <th>{t("passwordDB")}</th>
            <th>{t("url")}</th>
            <th>{t("condition")}</th>
            <th>
              <IconButton
                className="plus"
                onClick={() => dispatch(newChoiceParam())}
              >
                <AddCircleIcon color="success" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            i++;
            const [authMod, userMod, passMod, url, cond] = data[key].split(";");
            return (
              <tr key={i}>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={key}
                    onChange={(e) =>
                      dispatch(
                        updateChoiceParam(
                          updateChoice(
                            "choiceParam",
                            data,
                            { name: key },
                            e.target.value
                          )
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      defaultValue={"LDAP"}
                      value={authMod}
                      onChange={(e) =>
                        dispatch(
                          updateChoiceParam(
                            updateChoice("choiceParam", data, {
                              name: key,
                              auth: e.target.value,
                            })
                          )
                        )
                      }
                    >
                      {attributes.authChoiceModules.select[0].map((e) => {
                        return (
                          <MenuItem key={e.v + "auth"} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      defaultValue={"LDAP"}
                      value={userMod}
                      onChange={(e) =>
                        dispatch(
                          updateChoiceParam(
                            updateChoice("choiceParam", data, {
                              name: key,
                              user: e.target.value,
                            })
                          )
                        )
                      }
                    >
                      {attributes.authChoiceModules.select[1].map((e) => {
                        return (
                          <MenuItem key={e.v + "auth"} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      defaultValue={"LDAP"}
                      value={passMod}
                      onChange={(e) =>
                        dispatch(
                          updateChoiceParam(
                            updateChoice("choiceParam", data, {
                              name: key,
                              pass: e.target.value,
                            })
                          )
                        )
                      }
                    >
                      {attributes.authChoiceModules.select[2].map((e) => {
                        return (
                          <MenuItem key={e.v + "choice"} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <TextField
                    size="small"
                    type="url"
                    value={url}
                    onChange={() =>
                      dispatch(
                        updateChoiceParam(
                          updateChoice("choiceParam", data, {
                            name: key,
                          })
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={cond}
                    onChange={() =>
                      dispatch(
                        updateChoiceParam(
                          updateChoice("choiceParam", data, {
                            name: key,
                          })
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <IconButton
                    className="minus"
                    onClick={() => dispatch(delChoiceParam(key))}
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {Object.keys(data).map((key) => {
        i++;
        const over = data[key].split(";")[5];
        return (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("overPrm") + " " + key}
            </AccordionSummary>

            <table id={`overParam${key}`}>
              <thead>
                <tr>
                  <th>{t("overPrm")}</th>
                  <th>{t("value")}</th>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newChoiceOverParam(key))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={key}
                vars={(over ? JSON.parse(over) : {}) as Record<string, string>}
                tableID={`overParam${key}`}
                dispatch={dispatch}
                delFunction={delChoiceOverParam}
                updateFunction={updateChoiceOverParam}
              />
            </table>
          </Accordion>
        );
      })}
    </>
  );
}

function RecursRender({
  param,
}: {
  param: {
    values: Record<string, any>;
    config: llngConfig;
    tab: number;
    dispatch: Function;
  };
}) {
  type TypeKeyValue = keyof typeof attributes;
  type YourType = { k: string; v: string };
  return param.values.map((el: string | Record<string, any>) => {
    if (typeof el === "object") {
      return (
        <Accordion key={el.title + param.tab}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t(el.title)}
          </AccordionSummary>
          <RecursRender
            param={{
              values: el.nodes,
              config: param.config,
              tab: param.tab + 1,
              dispatch: param.dispatch,
            }}
          />
        </Accordion>
      );
    }
    switch (attributes[el as TypeKeyValue].type) {
      case "int":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <TextField
              size="small"
              type="number"
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: Number(e.target.value),
                  })
                )
              }
              placeholder={t(el)}
              value={param.config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "text":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <TextField
              size="small"
              type="text"
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
              value={param.config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "PerlModule":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <TextField
              size="small"
              type="text"
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
              value={param.config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "password":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <TextField
              size="small"
              type="password"
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
              value={param.config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "intOrNull":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <TextField
              size="small"
              type="number"
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: Number(e.target.value),
                  })
                )
              }
              placeholder={t(el)}
              value={param.config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "authChoiceContainer":
        return (
          <div key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            {authChoiceContainer(
              param.config[el as keyof llngConfig] as Record<string, string>,
              param.dispatch
            )}
          </div>
        );
      case "cmbModuleContainer":
        return (
          <div key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            {CmbModuleContainer(
              param.config[el as keyof llngConfig] as Record<
                string,
                Record<string, any>
              >,
              param.dispatch
            )}
          </div>
        );
      case "select":
        return (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel shrink>{t(el)}</InputLabel>
            <Select
              label={t(el)}
              displayEmpty
              value={param.config[el as keyof llngConfig]}
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
            >
              {attributes[el as TypeKeyValue] &&
              "select" in attributes[el as TypeKeyValue]
                ? (
                    (
                      attributes[el as TypeKeyValue] as {
                        select?: YourType[];
                      }
                    ).select || []
                  ).map((e) => {
                    return (
                      <MenuItem key={e.v} value={e.k}>
                        {t(e.v)}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select>
          </FormControl>
        );
      case "bool":
        return (
          <ul key={el}>
            <FormControl>
              <FormLabel>{t(el)}</FormLabel>
              <RadioGroup
                row
                value={param.config[el as keyof llngConfig]}
                onChange={(e) =>
                  param.dispatch(
                    updateConfigParams({
                      param: el as keyof llngConfig,
                      value: Number(e.target.value),
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
          </ul>
        );
      case "keyTextContainer":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <table id={el + "Table"}>
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() =>
                        param.dispatch(newModuleOpt(el as keyof llngConfig))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={el}
                vars={
                  param.config[el as keyof llngConfig] as Record<string, string>
                }
                tableID={el + "Table"}
                dispatch={param.dispatch}
                delFunction={delModuleOpt}
                updateFunction={updateModuleOpt}
              />
            </table>
          </ul>
        );
      case "url":
        return (
          <ul key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <strong className="title3">{t(el)}</strong>
            </Tooltip>
            <TextField
              size="small"
              type="url"
              placeholder={t(el)}
              value={param.config[el as keyof llngConfig]}
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: String(e.target.value),
                  })
                )
              }
            />
          </ul>
        );
      case "blackWhiteList":
        return (
          <ul key={el}>
            <FormControl>
              <RadioGroup
                row
                value={param.config[el as keyof llngConfig]}
                onChange={(e) =>
                  param.dispatch(
                    updateConfigParams({
                      param: el as keyof llngConfig,
                      value: Number(e.target.value),
                    })
                  )
                }
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={t("blacklist")}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label={t("whitelist")}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              size="small"
              type="url"
              value={param.config[el as keyof llngConfig]}
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
            />
          </ul>
        );
      default:
        return <ul key={el}>{attributes[el as TypeKeyValue].type} </ul>;
    }
  });
}

export function OptionRenderer({ selected }: { selected: string }) {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const test1 = (tree[0] as Record<string, any>).nodes.filter(
    (el: Record<string, any>) => el.title === "authParams"
  )[0].nodes_cond;
  if (selected !== "SAML") {
    const l = `${
      selected === "OpenIDConnect" ? "oidc" : selected.toLowerCase()
    }Params`;
    const nodeSelected = test1.filter(
      (el: Record<string, any>) => el.title === l
    )[0].nodes;

    return (
      <div>
        <strong className="title2">{t(l)}</strong>
        <div className="appDesc">
          {nodeSelected ? (
            <div key={selected}>
              <RecursRender
                param={{ values: nodeSelected, config, tab: 0, dispatch }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  return <SAMLRenderer />;
}
