import { NodeApi } from "react-arborist";
import { useAppDispatch } from "../app/hooks";
import { changeAppName, changeConf } from "../features/config/configSlice";
import AuthChoiceContainerForm from "../forms/AuthChoiceContainerForm";
import BlackWhiteListForm from "../forms/BlackWhiteListForm";
import BoolForm from "../forms/BoolForm";
import BoolOrExprForm from "../forms/BoolOrExprForm";
import CasAppMetaDataNodeContainerForm from "../forms/CasAppMetaDataNodeContainerForm";
import CasAppMetaDataNodeForm from "../forms/CasAppMetaDataNodeForm";
import CasSrvMetaDataNodeContainerForm from "../forms/CasSrvMetaDataNodeContainerForm";
import CasSrvMetaDataNodeForm from "../forms/CasSrvMetaDataNodeForm";
import CatAndAppListForm from "../forms/CatAndAppListForm";
import CmbModuleContainerForm from "../forms/CmbModuleContainerForm";
import DoubleHashForm from "../forms/DoubleHashForm";
import FileForm from "../forms/FileForm";
import GrantContainerForm from "../forms/GrantContainerForm";
import GrantForm from "../forms/GrantForm";
import IntForm from "../forms/IntForm";
import KeyTextContainerForm from "../forms/KeyTextContainerForm";
import LongtextForm from "../forms/LongtextForm";
import MenuCatForm from "../forms/MenuCatForm";
import OidcAttributeContainerForm from "../forms/OidcAttributeContainerForm";
import OidcOPMetaDataNodeContainerForm from "../forms/OidcOPMetaDataNodeContainerForm";
import OidcOPMetaDataNodeForm from "../forms/OidcOPMetaDataNodeForm";
import OidcRPMetaDataNodeContainerForm from "../forms/OidcRPMetaDataNodeContainerForm";
import OidcRPMetaDataNodeForm from "../forms/OidcRPMetaDataNodeForm";
import PasswordForm from "../forms/PasswordForm";
import PostContainerForm from "../forms/PostContainerForm";
import RuleContainerForm from "../forms/RuleContainerForm";
import SamlAttributeContainerForm from "../forms/SamlAttributeContainerForm";
import SamlIDPMetaDataNodeContainerForm from "../forms/SamlIDPMetaDataNodeContainerForm";
import SamlIDPMetaDataNodeForm from "../forms/SamlIDPMetaDataNodeForm";
import SamlSPMetaDataNodeContainerForm from "../forms/SamlSPMetaDataNodeContainerForm";
import SamlSPMetaDataNodeForm from "../forms/SamlSPMetaDataNodeForm";
import SamlServiceForm from "../forms/SamlServiceForm";
import SelectForm from "../forms/SelectForm";
import TextForm from "../forms/TextForm";
import TroolForm from "../forms/TroolForm";
import UrlForm from "../forms/UrlForm";
import VirtualHostContainerForm from "../forms/VirtualHostContainerForm";
import VirtualHostForm from "../forms/VirtualHostForm";
import { llngConfig } from "../utils/types";
import { treeFormat } from "./recursTree";
import { findElementInConf } from "./searchIntree";

export function TreeNodeType({
  node,
  config,
}: {
  node: NodeApi<treeFormat>;
  config: llngConfig;
}) {
  console.log("find dans le truc ", findElementInConf(config, node.data));
  const dispatch = useAppDispatch();
  const data = findElementInConf(config, node.data);
  console.log(`node ${node.id} data :  ${JSON.stringify(data)}`);
  let i = 0;
  switch (node.data.type) {
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
          {node.children?.map((child: NodeApi<treeFormat>) => {
            i++;
            return <TreeNodeType key={i} node={child} config={config} />;
          })}
        </>
      );
    case "authParams":
      i = 0;
      return (
        <>
          {node.children?.map((child: NodeApi<treeFormat>) => {
            i++;
            if (child.data.type === "select") {
              return <TreeNodeType key={i} node={child} config={config} />;
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
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "int":
      return (
        <tr>
          <IntForm
            value={Number(data)}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: number) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "intOrNull":
      return (
        <tr>
          <IntForm
            value={Number(data)}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: number) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "grantContainer":
      return (
        <tr>
          <GrantContainerForm
            value={data as Record<string, string>}
            fieldName={node.data.id.split(";").at(-1) || ""}
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
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "boolOrExpr":
      return (
        <tr>
          <BoolOrExprForm
            value={data as string | number}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: number | string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "trool":
      return (
        <tr>
          <TroolForm
            value={Number(data)}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: number) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "keyTextContainer":
      return (
        <tr>
          <KeyTextContainerForm
            value={data as Record<string, string>}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: Record<string, string>) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "bool":
      return (
        <tr>
          <BoolForm
            value={Number(data)}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: number) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "text":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: any) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "longtext":
      return (
        <tr>
          <LongtextForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "file":
      return (
        <tr>
          <FileForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "PerlModule":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "authParamsText":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "url":
      return (
        <tr>
          <UrlForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "password":
      return (
        <tr>
          <PasswordForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "lmAttrOrMacro":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "doubleHash":
      return (
        <tr>
          <DoubleHashForm
            value={data as Record<string, Record<string, string>>}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: Record<string, Record<string, string>>) =>
              console.log(e)
            }
          />
        </tr>
      );
    case "pcre":
      return (
        <tr>
          <TextForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "blackWhiteList":
      return (
        <tr>
          <BlackWhiteListForm
            value={String(data || "")}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: string) =>
              dispatch(changeConf({ node: node.data, newValue: e }))
            }
          />
        </tr>
      );
    case "samlIDPMetaDataNodeContainer":
      return (
        <SamlIDPMetaDataNodeContainerForm dispatch={dispatch} node={node} />
      );
    case "samlSPMetaDataNodeContainer":
      return (
        <SamlSPMetaDataNodeContainerForm dispatch={dispatch} node={node} />
      );

    case "virtualHost":
      return (
        <tr>
          <VirtualHostForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "samlSPMetaDataNode":
      return (
        <tr>
          <SamlSPMetaDataNodeForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "samlIDPMetaDataNode":
      return (
        <tr>
          <SamlIDPMetaDataNodeForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "oidcOPMetaDataNode":
      return (
        <tr>
          <OidcOPMetaDataNodeForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "oidcRPMetaDataNode":
      return (
        <tr>
          <OidcRPMetaDataNodeForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "casSrvMetaDataNode":
      return (
        <tr>
          <CasSrvMetaDataNodeForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "casAppMetaDataNode":
      return (
        <tr>
          <CasAppMetaDataNodeForm
            value={node.data.name}
            updateFunc={(e: { name: string; newName: string }) => {
              dispatch(changeAppName(e));
              node.data.name = e.newName;
              node.data.id = `${node.data.id
                .split(";")
                .slice(0, -1)
                .join(";")};${e.newName}`;
              node.data.app = e.newName;
              node.data.children?.forEach((child) => {
                child.id = `${child.id.split(";").slice(0, -2).join(";")};${
                  e.newName
                };${child.id.split(";").at(-1)}`;
                child.app = e.newName;
              });
            }}
          />
        </tr>
      );
    case "virtualHostContainer":
      return <VirtualHostContainerForm dispatch={dispatch} node={node} />;
    case "oidcRPMetaDataNodeContainer":
      return (
        <OidcRPMetaDataNodeContainerForm dispatch={dispatch} node={node} />
      );

    case "oidcOPMetaDataNodeContainer":
      return (
        <OidcOPMetaDataNodeContainerForm dispatch={dispatch} node={node} />
      );

    case "casAppMetaDataNodeContainer":
      return (
        <CasAppMetaDataNodeContainerForm dispatch={dispatch} node={node} />
      );

    case "casSrvMetaDataNodeContainer":
      return (
        <CasSrvMetaDataNodeContainerForm dispatch={dispatch} node={node} />
      );

    case "ruleContainer":
      return (
        <tr>
          <RuleContainerForm
            value={data as Record<string, string>}
            appName={node.data?.app || ""}
          />
        </tr>
      );
    case "postContainer":
      return (
        <tr>
          <PostContainerForm
            value={data as Record<string, Record<string, string>>}
            appName={node.data.app || ""}
          />
        </tr>
      );
    case "samlService":
      return (
        <tr>
          <SamlServiceForm
            value={String(data)}
            fieldName={node.data.id.split(";").at(-1) || ""}
            updateFunc={(e: any) => console.log(e)}
          />
        </tr>
      );
    case "samlAttributeContainer":
      return (
        <tr>
          <SamlAttributeContainerForm
            value={data as Record<string, string>}
            fieldName={node.data.id.split(";").at(-1) || ""}
            appName={node.data.app || ""}
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
    case "oidcAttributeContainer":
      return (
        <tr>
          <OidcAttributeContainerForm
            value={data as Record<string, string>}
            fieldName={node.data.id.split(";").at(-1) || ""}
            appName={node.data.app || ""}
          />
        </tr>
      );
    case "cmbModuleContainer":
      return <CmbModuleContainerForm data={data} dispatch={dispatch} />;
    case "catAndAppList":
      return <CatAndAppListForm values={data} />;
    case "category":
      console.log("cat", data);
      return <MenuCatForm values={data} />;
    default:
      return <></>;
  }
}
