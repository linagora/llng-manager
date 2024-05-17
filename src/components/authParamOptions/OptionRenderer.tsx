import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import tree from "../../static/tree.json";
import attributes from "../../static/attributes.json";
import { t } from "i18next";
import { TableVars } from "../applicationsComponents/TableVars";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { llngConfig } from "../../utils/types";
import {
  delCombOverParam,
  delCombParam,
  newCombOverParam,
  newCombParam,
  updateCombOverParam,
  updateCombParam,
  updateModuleParams,
} from "../../features/config/configSlice";
function updateComb(
  tableID: string,
  selectData?: { name?: string; type?: string; use?: string }
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
            type: selectData?.type ? selectData.type : type ? type : "",
          };
        } else {
          headerList[key] = {
            for: use ? use : "",
            type: type ? type : "",
          };
        }
      }
      console.log(headerList);
    }
  }
  return headerList;
}

function cmbModuleContainer(
  data: Record<string, Record<string, string | Record<string, string>>>,
  dispatch: Function
) {
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
            return (
              <tr>
                <td>
                  <TextField
                    type="text"
                    placeholder={t(key)}
                    value={key}
                    onChange={() =>
                      dispatch(updateCombParam(updateComb("combTable")))
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
                            updateComb("combTable", {
                              name: key,
                              type: String(e.target.value),
                            })
                          )
                        )
                      }
                    >
                      {attributes.combModules.select.map((e) => {
                        return <MenuItem value={e.k}>{t(e.v)}</MenuItem>;
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
                            updateComb("combTable", {
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
                  <Button
                    className="minus"
                    onClick={() => dispatch(delCombParam(key))}
                  >
                    <RemoveCircleIcon color="error" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {Object.keys(data).map((key) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("overPrm") + " " + key}
          </AccordionSummary>

          <table id={`overParam${key}`}>
            <thead>
              <tr>
                <th>{t("overPrm")}</th>
                <th>{t("value")}</th>
                <th>
                  <Button
                    className="plus"
                    onClick={() => dispatch(newCombOverParam(key))}
                  >
                    <AddCircleIcon color="success" />
                  </Button>
                </th>
              </tr>
            </thead>
            {TableVars(
              key,
              (data[key].over ? data[key].over : {}) as Record<string, string>,
              `overParam${key}`,
              dispatch,
              delCombOverParam,
              updateCombOverParam
            )}
          </table>
        </Accordion>
      ))}
    </>
  );
}
function authChoiceContainer(data: Record<string, string>) {
  return (
    <table>
      <thead>
        <tr>
          <th>{t("name")}</th>
          <th>{t("authentication")}</th>
          <th>{t("userDB")}</th>
          <th>{t("passwordDB")}</th>
          <th>{t("url")}</th>
          <th>{t("condition")}</th>
          <th>
            <Button className="plus">
              <AddCircleIcon color="success" />
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((key) => {
          const [authMod, userMod, passMod, url, cond] = data[key].split(";");
          return (
            <tr>
              <td>
                <TextField type="text" value={key} />
              </td>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>{t("type")}</InputLabel>
                  <Select
                    label={t("type")}
                    defaultValue={"LDAP"}
                    value={authMod}
                  >
                    {attributes.authChoiceModules.select[0].map((e) => {
                      return <MenuItem value={e.k}>{t(e.v)}</MenuItem>;
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
                  >
                    {attributes.authChoiceModules.select[1].map((e) => {
                      return <MenuItem value={e.k}>{t(e.v)}</MenuItem>;
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
                  >
                    {attributes.authChoiceModules.select[2].map((e) => {
                      return <MenuItem value={e.k}>{t(e.v)}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </td>
              <td>
                <TextField type="url" value={url} />
              </td>
              <td>
                <TextField type="text" value={cond} />
              </td>
              <td>
                <Button className="minus">
                  <RemoveCircleIcon color="error" />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function RecursRender(
  values: Record<string, any>,
  config: llngConfig,
  tab: number,
  dispatch: Function
) {
  type TypeKeyValue = keyof typeof attributes;
  type YourType = { k: string; v: string };
  return values.map((el: string | Record<string, any>) => {
    if (typeof el === "object") {
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t(el.title)}
          </AccordionSummary>
          {RecursRender(el.nodes, config, tab + 1, dispatch)}
        </Accordion>
      );
    }
    switch (attributes[el as TypeKeyValue].type) {
      case "int":
        return (
          <ul>
            <TextField
              type="number"
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
                    param: el as keyof llngConfig,
                    value: Number(e.target.value),
                  })
                )
              }
              placeholder={t(el)}
              value={config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "text":
        return (
          <ul>
            <TextField
              type="text"
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
              value={config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "PerlModule":
        return (
          <ul>
            <TextField
              type="text"
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
              value={config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "password":
        return (
          <ul>
            <TextField
              type="password"
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
                    param: el as keyof llngConfig,
                    value: e.target.value,
                  })
                )
              }
              placeholder={t(el)}
              value={config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "intOrNull":
        return (
          <ul>
            <TextField
              type="number"
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
                    param: el as keyof llngConfig,
                    value: Number(e.target.value),
                  })
                )
              }
              placeholder={t(el)}
              value={config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "authChoiceContainer":
        return authChoiceContainer(
          config[el as keyof llngConfig] as Record<string, string>
        );
      case "cmbModuleContainer":
        return cmbModuleContainer(
          config[el as keyof llngConfig] as Record<string, Record<string, any>>,
          dispatch
        );
      case "select":
        return (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel shrink>{t(el)}</InputLabel>
            <Select
              label={t(el)}
              displayEmpty
              value={config[el as keyof llngConfig]}
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
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
                    return <MenuItem value={e.k}>{t(e.v)}</MenuItem>;
                  })
                : ""}
            </Select>
          </FormControl>
        );
      case "bool":
        console.log(t(el));
        return (
          <div>
            <FormControl>
              <FormLabel>{t(el)}</FormLabel>
              <RadioGroup
                row
                value={config[el as keyof llngConfig]}
                onChange={(e) =>
                  dispatch(
                    updateModuleParams({
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
          </div>
        );
      case "keyTextContainer":
        return (
          <table id={el + "table"}>
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th>
                  <Button className="plus">
                    <AddCircleIcon color="success" />
                  </Button>
                </th>
              </tr>
            </thead>
            {TableVars(
              el,
              config[el as keyof llngConfig] as Record<string, string>,
              el + "Table",
              console.log,
              console.log,
              console.log
            )}
          </table>
        );
      case "url":
        return (
          <ul>
            <TextField
              type="url"
              placeholder={t(el)}
              value={config[el as keyof llngConfig]}
            />
          </ul>
        );
      case "blackWhiteList":
        return (
          <ul>
            <FormControl>
              <RadioGroup
                row
                value={config[el as keyof llngConfig]}
                onChange={(e) =>
                  dispatch(
                    updateModuleParams({
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
              type="url"
              value={config[el as keyof llngConfig]}
              onChange={(e) =>
                dispatch(
                  updateModuleParams({
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
        return <ul>{attributes[el as TypeKeyValue].type} </ul>;
    }
  });
}

export function OptionRenderer({ selected }: { selected: string }) {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const test1 = (tree[0] as Record<string, any>).nodes.filter(
    (el: Record<string, any>) => el.title === "authParams"
  )[0].nodes_cond;
  const l = `${
    selected === "OpenIDConnect" ? "oidc" : selected.toLowerCase()
  }Params`;
  const nodeSelected = test1.filter(
    (el: Record<string, any>) => el.title === l
  )[0].nodes;
  return (
    <div>
      <strong className="title2">{t(l)}</strong>
      <div>
        {nodeSelected ? RecursRender(nodeSelected, config, 0, dispatch) : ""}
      </div>
    </div>
  );
}
