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
import RSACertKeyForm from "../forms/RSACertKeyForm";
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
import { treeFormat } from "./Tree";

export function TreeNodeType({
  node,
  data,
}: {
  node: treeFormat;
  data:
    | string
    | number
    | boolean
    | llngConfig
    | string[]
    | Record<string, string | number | boolean>
    | Record<string, object>
    | { k: string; v: string }[]
    | { value: Record<string, string>; fieldName: string }
    | null
    | undefined;
}) {
  console.log(`node data :  ${JSON.stringify(data)}`);
  switch (node.type) {
    case "select":
      return (
        <SelectForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "int":
      return (
        <IntForm
          value={Number(data)}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "intOrNull":
      return (
        <IntForm
          value={Number(data)}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "grantContainer":
      return (
        <GrantContainerForm
          value={data as Record<string, string>}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "grant":
      return (
        <GrantForm
          key={(data as Record<string, string>).key}
          value={(data as Record<string, string>).value}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "boolOrExpr":
      return (
        <BoolOrExprForm
          value={data as string | number}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "trool":
      return (
        <TroolForm
          value={Number(data)}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "keyTextContainer":
      return (
        <KeyTextContainerForm
          value={data as Record<string, string>}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "bool":
      return (
        <BoolForm
          value={Number(data)}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "text":
      return (
        <TextForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "longtext":
      return (
        <LongtextForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "file":
      return (
        <FileForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "PerlModule":
      return (
        <TextForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "url":
      return (
        <UrlForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "password":
      return (
        <PasswordForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "lmAttrOrMacro":
      return (
        <TextForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "doubleHash":
      return (
        <DoubleHashForm
          value={data as Record<string, Record<string, string>>}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "pcre":
      return (
        <TextForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "blackWhiteList":
      return (
        <BlackWhiteListForm
          value={String(data || "")}
          fieldName={node.id.split(";").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "samlIDPMetaDataNodeContainer":
      return (
        <SamlIDPMetaDataNodeContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "samlSPMetaDataNodeContainer":
      return (
        <SamlSPMetaDataNodeContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "virtualHostContainer":
      return (
        <VirtualHostContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "oidcRPMetaDataNodeContainer":
      return (
        <OidcRPMetaDataNodeContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "oidcOPMetaDataNodeContainer":
      return (
        <OidcOPMetaDataNodeContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "casAppMetaDataNodeContainer":
      return (
        <CasAppMetaDataNodeContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "casSrvMetaDataNodeContainer":
      return (
        <CasSrvMetaDataNodeContainerForm
          value={
            data as Record<string, Record<string, string | number | boolean>>
          }
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "ruleContainer":
      return (
        <RuleContainerForm
          value={data as Record<string, string>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "postContainer":
      return (
        <PostContainerForm
          value={data as Record<string, Record<string, string>>}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "samlService":
      return (
        <SamlServiceForm
          value={(data as Record<string, string>).value}
          fieldName={(data as Record<string, string>).fieldName}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "samlAttributeContainer":
      return (
        <SamlAttributeContainerForm
          value={
            (data as { value: Record<string, string>; fieldName: string })
              .value as Record<string, string>
          }
          fieldName={
            (data as { value: Record<string, string>; fieldName: string })
              .fieldName
          }
          updateFunc={(e: any) => console.log(e)}
        />
      );
    default:
      return (
        <td>
          {node.type} : {JSON.stringify(data)}
        </td>
      );
  }
}

export function TreeNodeForm({ node, data }: { node: treeFormat; data: any }) {
  let i = 0;
  switch (node.form) {
    case "RSACertKey":
      return (
        <tr>
          <RSACertKeyForm
            value={data.values}
            fieldNames={data.fieldNames}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "simpleInputContainer":
      i = 0;
      return (
        <>
          {node.children?.map((child) => {
            i++;
            return (
              <tr key={i}>
                <TreeNodeType
                  node={(child || {}) as treeFormat}
                  data={data[child.id?.split(";").at(-1) as keyof llngConfig]}
                />
              </tr>
            );
          })}
        </>
      );
    case "authParams":
      i = 0;
      return (
        <>
          {node.children?.map((child) => {
            i++;
            return (
              <tr key={i}>
                <TreeNodeType
                  node={(child || {}) as treeFormat}
                  data={data[child.id?.split(";").at(-1) as keyof llngConfig]}
                />
              </tr>
            );
          })}
        </>
      );
    default:
      return (
        <div>
          {node.type} : {data}
        </div>
      );
  }
}
