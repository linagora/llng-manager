import { useAppDispatch } from "../app/hooks";
import { changeConf } from "../features/config/configSlice";
import AuthChoiceContainerForm from "../forms/AuthChoiceContainerForm";
import BlackWhiteListForm from "../forms/BlackWhiteListForm";
import BoolForm from "../forms/BoolForm";
import BoolOrExprForm from "../forms/BoolOrExprForm";
import CasAppMetaDataNodeContainerForm from "../forms/CasAppMetaDataNodeContainerForm";
import CasSrvMetaDataNodeContainerForm from "../forms/CasSrvMetaDataNodeContainerForm";
import DoubleHashForm from "../forms/DoubleHashForm";
import FileForm from "../forms/FileForm";
import GrantContainerForm from "../forms/GrantContainerForm";
import GrantForm from "../forms/GrantForm";
import IntForm from "../forms/IntForm";
import KeyTextContainerForm from "../forms/KeyTextContainerForm";
import LongtextForm from "../forms/LongtextForm";
import OidcOPMetaDataNodeContainerForm from "../forms/OidcOPMetaDataNodeContainerForm";
import OidcRPMetaDataNodeContainerForm from "../forms/OidcRPMetaDataNodeContainerForm";
import PasswordForm from "../forms/PasswordForm";
import PostContainerForm from "../forms/PostContainerForm";
import RuleContainerForm from "../forms/RuleContainerForm";
import SamlAttributeContainerForm from "../forms/SamlAttributeContainerForm";
import SamlIDPMetaDataNodeContainerForm from "../forms/SamlIDPMetaDataNodeContainerForm";
import SamlSPMetaDataNodeContainerForm from "../forms/SamlSPMetaDataNodeContainerForm";
import SamlServiceForm from "../forms/SamlServiceForm";
import SelectForm from "../forms/SelectForm";
import TextForm from "../forms/TextForm";
import TroolForm from "../forms/TroolForm";
import UrlForm from "../forms/UrlForm";
import VirtualHostContainerForm from "../forms/VirtualHostContainerForm";
import { llngConfig } from "../utils/types";
import { treeFormat } from "./recursTree";
import { findElementInConf } from "./searchIntree";

export function TreeNodeType({
  node,
  config,
}: {
  node: treeFormat;
  config: llngConfig;
}) {
  console.log("find dans le truc ", findElementInConf(config, node));
  const dispatch = useAppDispatch();
  const data = findElementInConf(config, node);
  console.log(`node ${node.id} data :  ${JSON.stringify(data)}`);
  let i = 0;
  switch (node.type) {
    // case "RSACertKey":
    //   return (
    //     <tr>
    //       <RSACertKeyForm
    //         value={(              findElementInConf(config, node)
    //           as Record<string, Record<string, string>>).values}
    //         fieldNames={
    //           (data as Record<string, Record<string, string>>).fieldNames
    //         }
    //         updateFunc={(e: any) => console.log(e)}
    //       />
    //     </tr>
    //   );
    case "simpleInputContainer":
      i = 0;

      return (
        <>
          {node.children?.map((child: treeFormat) => {
            i++;
            return (
              <TreeNodeType
                key={i}
                node={(child || {}) as treeFormat}
                config={config}
              />
            );
          })}
        </>
      );
    case "authParams":
      i = 0;
      return (
        <>
          {node.children?.map((child: treeFormat) => {
            i++;
            if (child.type === "select") {
              return (
                <TreeNodeType
                  key={i}
                  node={(child || {}) as treeFormat}
                  config={config}
                />
              );
            }
            return <></>;
          })}
        </>
      );
    case "select":
      return (
        <tr>
          <SelectForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "int":
      return (
        <tr>
          <IntForm
            value={Number(data)}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "intOrNull":
      return (
        <tr>
          <IntForm
            value={Number(data)}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "grantContainer":
      return (
        <tr>
          <GrantContainerForm
            value={data as Record<string, string>}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "grant":
      return (
        <tr>
          <GrantForm
            key={(data as Record<string, string>).key}
            value={(data as Record<string, string>).value}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "boolOrExpr":
      return (
        <tr>
          <BoolOrExprForm
            value={data as string | number}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "trool":
      return (
        <tr>
          <TroolForm
            value={Number(data)}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "keyTextContainer":
      return (
        <tr>
          <KeyTextContainerForm
            value={data as Record<string, string>}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "bool":
      return (
        <tr>
          <BoolForm
            value={Number(data)}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "text":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "longtext":
      return (
        <tr>
          <LongtextForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "file":
      return (
        <tr>
          <FileForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "PerlModule":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "authParamsText":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "url":
      return (
        <tr>
          <UrlForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "password":
      return (
        <tr>
          <PasswordForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "lmAttrOrMacro":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "doubleHash":
      return (
        <tr>
          <DoubleHashForm
            value={data as Record<string, Record<string, string>>}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "pcre":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "blackWhiteList":
      return (
        <tr>
          <BlackWhiteListForm
            value={String(data || "")}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => dispatch(changeConf({ node, newValue: e }))}
          />
        </tr>
      );
    case "samlIDPMetaDataNodeContainer":
      return (
        <tr>
          <SamlIDPMetaDataNodeContainerForm
            value={config.samlIDPMetaDataXML || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "samlSPMetaDataNodeContainer":
      return (
        <tr>
          <SamlSPMetaDataNodeContainerForm
            value={config.samlSPMetaDataXML || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "virtualHostContainer":
      return (
        <tr>
          <VirtualHostContainerForm
            value={config.locationRules || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "oidcRPMetaDataNodeContainer":
      return (
        <tr>
          <OidcRPMetaDataNodeContainerForm
            value={config.oidcRPMetaDataOptions || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "oidcOPMetaDataNodeContainer":
      return (
        <tr>
          <OidcOPMetaDataNodeContainerForm
            value={config.oidcOPMetaDataOptions || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "casAppMetaDataNodeContainer":
      return (
        <tr>
          <CasAppMetaDataNodeContainerForm
            value={config.casAppMetaDataOptions || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "casSrvMetaDataNodeContainer":
      return (
        <tr>
          <CasSrvMetaDataNodeContainerForm
            value={config.casSrvMetaDataOptions || {}}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "ruleContainer":
      return (
        <tr>
          <RuleContainerForm
            value={data as Record<string, string>}
            appName={node?.app || ""}
          />
        </tr>
      );
    case "postContainer":
      return (
        <tr>
          <PostContainerForm
            value={data as Record<string, Record<string, string>>}
            appName={node.app || ""}
          />
        </tr>
      );
    case "samlService":
      return (
        <tr>
          <SamlServiceForm
            value={String(data)}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "samlAttributeContainer":
      return (
        <tr>
          <SamlAttributeContainerForm
            value={data as Record<string, string>}
            fieldName={node.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "authChoiceContainer":
      return (
        <tr>
          <AuthChoiceContainerForm
            data={data as Record<string, string>}
            dispatch={(e: any) => console.log(e)}
          />
        </tr>
      );
    default:
      return <></>;
  }
}
