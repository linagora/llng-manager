import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
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
  delModuleOpt,
  newModuleOpt,
  updateConfigParams,
  updateModuleOpt,
} from "../../features/config/configSlice";
import AuthChoiceContainerForm from "../../forms/AuthChoiceContainerForm";
import CmbModuleContainerForm from "../../forms/CmbModuleContainerForm";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import tree from "../../static/tree.json";
import { llngConfig } from "../../utils/types";
import { TableVars } from "../applicationsComponents/TableVars";
import { SAMLRenderer } from "./SAMLRenderer";

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
              value={param.config[el as keyof llngConfig] || 0}
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
              value={param.config[el as keyof llngConfig] || ""}
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
              value={param.config[el as keyof llngConfig] || ""}
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
              value={param.config[el as keyof llngConfig] || ""}
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
              value={param.config[el as keyof llngConfig] || 0}
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
            <AuthChoiceContainerForm
              data={
                (param.config[el as keyof llngConfig] as Record<
                  string,
                  string
                >) || {}
              }
              dispatch={param.dispatch}
            />
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
            <CmbModuleContainerForm
              data={
                (param.config[el as keyof llngConfig] as Record<
                  string,
                  Record<string, any>
                >) || {}
              }
              dispatch={param.dispatch}
            />
          </div>
        );
      case "select":
        return (
          <ul key={el}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel shrink>{t(el)}</InputLabel>
              <Select
                label={t(el)}
                displayEmpty
                value={param.config[el as keyof llngConfig] || ""}
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
          </ul>
        );
      case "bool":
        return (
          <ul key={el}>
            <FormControl>
              <FormLabel>{t(el)}</FormLabel>
              <RadioGroup
                row
                value={param.config[el as keyof llngConfig] || 0}
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
                  (param.config[el as keyof llngConfig] as Record<
                    string,
                    string
                  >) || {}
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
              value={param.config[el as keyof llngConfig] || ""}
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
                value={
                  String(
                    param.config[el as keyof llngConfig]
                      ? param.config[el as keyof llngConfig]
                      : 0
                  ).split(";")[0]
                }
                onChange={(e) =>
                  param.dispatch(
                    updateConfigParams({
                      param: el as keyof llngConfig,
                      value: `${Number(e.target.value)};${
                        String(
                          param.config[el as keyof llngConfig]
                            ? param.config[el as keyof llngConfig]
                            : ""
                        ).split(";")[1]
                      }`,
                    })
                  )
                }
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label={t("blacklist")}
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={t("whitelist")}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              size="small"
              type="url"
              value={
                String(
                  param.config[el as keyof llngConfig]
                    ? param.config[el as keyof llngConfig]
                    : ""
                ).split(";")[1] || ""
              }
              onChange={(e) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: `${
                      String(
                        param.config[el as keyof llngConfig]
                          ? param.config[el as keyof llngConfig]
                          : ""
                      ).split(";")[0]
                    };${e.target.value}`,
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
