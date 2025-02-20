import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  IconButton,
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
import TextForm from "../../forms/TextForm";
import IntForm from "../../forms/IntForm";
import PasswordForm from "../../forms/PasswordForm";
import SelectForm from "../../forms/SelectForm";
import BoolForm from "../../forms/BoolForm";
import UrlForm from "../../forms/UrlForm";
import BlackWhiteListForm from "../../forms/BlackWhiteListForm";

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
        <tr key={el.title}>
          <td colSpan={2}>
            <Accordion key={el.title + param.tab}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t(el.title)}
              </AccordionSummary>
              <table>
                <tbody>
                  <RecursRender
                    param={{
                      values: el.nodes,
                      config: param.config,
                      tab: param.tab + 1,
                      dispatch: param.dispatch,
                    }}
                  />
                </tbody>
              </table>
            </Accordion>
          </td>
        </tr>
      );
    }
    switch (attributes[el as TypeKeyValue].type) {
      case "int":
        return (
          <tr key={el}>
            <IntForm
              fieldName={el}
              updateFunc={(e: number) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: Number(e),
                  })
                )
              }
              value={Number(param.config[el as keyof llngConfig] || 0)}
            />
          </tr>
        );
      case "text":
        return (
          <tr key={el}>
            <TextForm
              fieldName={el}
              updateFunc={(e: string) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e,
                  })
                )
              }
              value={String(param.config[el as keyof llngConfig] || "")}
            />
          </tr>
        );
      case "PerlModule":
        return (
          <tr key={el}>
            <TextForm
              fieldName={el}
              updateFunc={(e: string) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e,
                  })
                )
              }
              value={String(param.config[el as keyof llngConfig] || "")}
            />
          </tr>
        );
      case "password":
        return (
          <tr key={el}>
            <PasswordForm
              fieldName={el}
              updateFunc={(e: string) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e,
                  })
                )
              }
              value={String(param.config[el as keyof llngConfig] || "")}
            />
          </tr>
        );
      case "intOrNull":
        return (
          <tr key={el}>
            <IntForm
              fieldName={el}
              updateFunc={(e: number) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e,
                  })
                )
              }
              value={Number(param.config[el as keyof llngConfig] || 0)}
            />
          </tr>
        );
      case "authChoiceContainer":
        return (
          <tr key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <th>{t(el)}</th>
            </Tooltip>
            <td>
              <AuthChoiceContainerForm
                data={
                  (param.config[el as keyof llngConfig] as Record<
                    string,
                    string
                  >) || {}
                }
                dispatch={param.dispatch}
              />
            </td>
          </tr>
        );
      case "cmbModuleContainer":
        return (
          <tr key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <th>{t(el)}</th>
            </Tooltip>
            <td>
              <CmbModuleContainerForm
                data={
                  (param.config[el as keyof llngConfig] as Record<
                    string,
                    Record<string, any>
                  >) || {}
                }
                dispatch={param.dispatch}
              />
            </td>
          </tr>
        );
      case "select":
        return (
          <tr key={el}>
            <SelectForm
              fieldName={el}
              value={String(param.config[el as keyof llngConfig] || "")}
              updateFunc={(e: string) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e,
                  })
                )
              }
            />
          </tr>
        );
      case "bool":
        return (
          <tr key={el}>
            <BoolForm
              fieldName={el}
              value={Number(param.config[el as keyof llngConfig] || 0)}
              updateFunc={(e: number) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: Number(e),
                  })
                )
              }
            />
          </tr>
        );
      case "keyTextContainer":
        return (
          <tr key={el}>
            <Tooltip
              title={
                <Markdown>
                  {(definitions[el as keyof typeof definitions]
                    ? definitions[el as keyof typeof definitions]
                    : "") + ""}
                </Markdown>
              }
            >
              <th>{t(el)}</th>
            </Tooltip>
            <td>
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
            </td>
          </tr>
        );
      case "url":
        return (
          <tr key={el}>
            <UrlForm
              fieldName={el}
              value={String(param.config[el as keyof llngConfig] || "")}
              updateFunc={(e: string) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: String(e),
                  })
                )
              }
            />
          </tr>
        );
      case "blackWhiteList":
        return (
          <tr key={el}>
            <BlackWhiteListForm
              fieldName={el}
              value={String(
                param.config[el as keyof llngConfig]
                  ? param.config[el as keyof llngConfig]
                  : 0
              )}
              updateFunc={(e: string) =>
                param.dispatch(
                  updateConfigParams({
                    param: el as keyof llngConfig,
                    value: e,
                  })
                )
              }
            />
          </tr>
        );
      default:
        return (
          <tr key={el}>
            <td>{attributes[el as TypeKeyValue].type}</td>
          </tr>
        );
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
            <table key={selected}>
              <tbody>
                <RecursRender
                  param={{ values: nodeSelected, config, tab: 0, dispatch }}
                />
              </tbody>
            </table>
          ) : (
            <table key={selected}>
              <tbody></tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
  return <SAMLRenderer />;
}
