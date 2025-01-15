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
          </ul>
        );
      case "text":
        return (
          <ul key={el}>
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
          </ul>
        );
      case "PerlModule":
        return (
          <ul key={el}>
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
          </ul>
        );
      case "password":
        return (
          <ul key={el}>
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
          </ul>
        );
      case "intOrNull":
        return (
          <ul key={el}>
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
          </ul>
        );
      case "bool":
        return (
          <ul key={el}>
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
          </ul>
        );
      case "blackWhiteList":
        return (
          <ul key={el}>
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
