import BlackWhiteListForm from "../forms/BlackWhiteListForm";
import BoolForm from "../forms/BoolForm";
import BoolOrExprForm from "../forms/BoolOrExprForm";
import DoubleHashForm from "../forms/DoubleHashForm";
import FileForm from "../forms/FileForm";
import GrantContainerForm from "../forms/GrantContainerForm";
import GrantForm from "../forms/GrantForm";
import IntForm from "../forms/IntForm";
import KeyTextContainerForm from "../forms/KeyTextContainerForm";
import LongtextForm from "../forms/LongtextForm";
import SelectForm from "../forms/SelectForm";
import TextForm from "../forms/TextForm";
import UrlForm from "../forms/UrlForm";
import { treeFormat } from "./Tree";

export function TreeNode({ node, data }: { node: treeFormat; data: any }) {
  switch (node.type) {
    case "select":
      return (
        <SelectForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "int":
      return (
        <IntForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "intOrNull":
      return (
        <IntForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "grantContainer":
      return (
        <GrantContainerForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "grant":
      return (
        <GrantForm
          key={data}
          value={data[0]}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "boolOrExpr":
      return (
        <BoolOrExprForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "keyTextContainer":
      return (
        <KeyTextContainerForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "bool":
      return (
        <BoolForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "text":
      return (
        <TextForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "longtext":
      return (
        <LongtextForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "file":
      return (
        <FileForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "PerlModule":
      return (
        <TextForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "url":
      return (
        <UrlForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "lmAttrOrMacro":
      return (
        <TextForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "doubleHash":
      return (
        <DoubleHashForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "pcre":
      return (
        <TextForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    case "blackWhiteList":
      return (
        <BlackWhiteListForm
          value={data}
          fieldName={node.id.split(".").at(-1) || ""}
          updateFunc={(e: any) => console.log(e)}
        />
      );
    default:
      return (
        <div>
          {node.type} : {data}
        </div>
      );
  }
}
