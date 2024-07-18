import { NodeApi } from "react-arborist";
import { useAppDispatch } from "../app/hooks";
import {
  changeAppName,
  changeConf,
  updateConfigParams,
} from "../features/config/configSlice";
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
import DisplayOidcMetaDataForm from "../forms/DisplayOidcMetadataForm";
import DisplaySamlMetaDataForm from "../forms/DisplaySamlMetadataForm";
import DoubleHashForm from "../forms/DoubleHashForm";
import FileForm from "../forms/FileForm";
import GrantContainerForm from "../forms/GrantContainerForm";
import IntForm from "../forms/IntForm";
import KeyTextContainerForm from "../forms/KeyTextContainerForm";
import LongtextForm from "../forms/LongtextForm";
import MenuAppForm from "../forms/MenuAppForm";
import MenuCatForm from "../forms/MenuCatForm";
import OidcAttributeContainerForm from "../forms/OidcAttributeContainerForm";
import OidcKeyForm from "../forms/OidcKeyForm";
import OidcOPMetaDataNodeContainerForm from "../forms/OidcOPMetaDataNodeContainerForm";
import OidcOPMetaDataNodeForm from "../forms/OidcOPMetaDataNodeForm";
import OidcRPMetaDataNodeContainerForm from "../forms/OidcRPMetaDataNodeContainerForm";
import OidcRPMetaDataNodeForm from "../forms/OidcRPMetaDataNodeForm";
import PasswordForm from "../forms/PasswordForm";
import PortalskinForm from "../forms/PortalskinForm";
import PortalskinbackgroundForm from "../forms/PortalskinbackgroundForm";
import PostContainerForm from "../forms/PostContainerForm";
import RSACertKeyForm from "../forms/RSACertKeyForm";
import RuleContainerForm from "../forms/RuleContainerForm";
import SMTPForm from "../forms/SMTPForm";
import SamlAssertionForm from "../forms/SamlAssertionForm";
import SamlAttributeContainerForm from "../forms/SamlAttributeContainerForm";
import SamlIDPMetaDataNodeContainerForm from "../forms/SamlIDPMetaDataNodeContainerForm";
import SamlIDPMetaDataNodeForm from "../forms/SamlIDPMetaDataNodeForm";
import SamlSPMetaDataNodeContainerForm from "../forms/SamlSPMetaDataNodeContainerForm";
import SamlSPMetaDataNodeForm from "../forms/SamlSPMetaDataNodeForm";
import SamlServiceForm from "../forms/SamlServiceForm";
import SelectForm from "../forms/SelectForm";
import SfExtraContainerForm from "../forms/SfExtraContainerForm";
import TextForm from "../forms/TextForm";
import TroolForm from "../forms/TroolForm";
import UrlForm from "../forms/UrlForm";
import VirtualHostContainerForm from "../forms/VirtualHostContainerForm";
import VirtualHostForm from "../forms/VirtualHostForm";
import { treeFormat } from "../utils/recursTree";
import { findElementInConf } from "../utils/searchIntree";
import { llngConfig } from "../utils/types";

export function TreeNodeType({
  node,
  config,
}: {
  node: NodeApi<treeFormat>;
  config: llngConfig;
}) {
  const dispatch = useAppDispatch();
  const data = findElementInConf(config, node.data);
  console.log(`node ${node.id} data :  ${JSON.stringify(data)}`);
  let i = 0;
  switch (node.data.type) {
    case "RSACertKey":
      return (
        <tr>
          <RSACertKeyForm
            value={{
              pub: String(
                config[
                  node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Security", "PublicKey") as keyof llngConfig
                ] || ""
              ),
              hash: String(
                config[
                  (node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Security", "PrivateKey") +
                    "Pwd") as keyof llngConfig
                ] || ""
              ),
              priv: String(
                config[
                  node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Security", "PrivateKey") as keyof llngConfig
                ] || ""
              ),
            }}
            fieldNames={{
              pub:
                node.data.id
                  .split(";")
                  .at(-1)
                  ?.replace("Security", "PublicKey") || "",
              hash:
                node.data.id
                  .split(";")
                  .at(-1)
                  ?.replace("Security", "PrivateKey") + "Pwd",
              priv:
                node.data.id
                  .split(";")
                  .at(-1)
                  ?.replace("Security", "PrivateKey") || "",
            }}
            updateFunc={<K extends keyof llngConfig>(e: {
              param: K;
              value: llngConfig[K];
            }) => dispatch(updateConfigParams(e))}
          />
        </tr>
      );
    case "OidcKey":
      return (
        <tr>
          <td>
            <OidcKeyForm
              value={{
                pub: String(
                  config[
                    node.data.id
                      .split(";")
                      .at(-1)
                      ?.replace("Keys", "")
                      ?.replace("MetaData", "PublicKey") as keyof llngConfig
                  ] || ""
                ),
                hash: String(
                  config[
                    node.data.id
                      .split(";")
                      .at(-1)
                      ?.replace("Keys", "")
                      ?.replace("MetaData", "KeyId") as keyof llngConfig
                  ] || ""
                ),
                type: String(
                  config[
                    node.data.id
                      .split(";")
                      .at(-1)
                      ?.replace("Keys", "")
                      ?.replace("MetaData", "KeyType") as keyof llngConfig
                  ] || ""
                ),
                priv: String(
                  config[
                    node.data.id
                      .split(";")
                      .at(-1)
                      ?.replace("Keys", "")
                      ?.replace("MetaData", "PrivateKey") as keyof llngConfig
                  ] || ""
                ),
              }}
              fieldNames={{
                pub:
                  node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Keys", "")
                    ?.replace("MetaData", "PublicKey") || "",
                hash:
                  node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Keys", "")
                    ?.replace("MetaData", "KeyId") || "",

                type:
                  node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Keys", "")
                    ?.replace("MetaData", "KeyType") || "",

                priv:
                  node.data.id
                    .split(";")
                    .at(-1)
                    ?.replace("Keys", "")
                    ?.replace("MetaData", "PrivateKey") || "",
              }}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
          </td>
        </tr>
      );
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
            value={(data as Record<string, string>) || {}}
            fieldName={node.data.id.split(";").at(-1) || ""}
            dispatch={dispatch}
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
            value={(data as Record<string, string>) || {}}
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
            updateFunc={(e: string) =>
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
          <td>
            <DoubleHashForm
              value={(data as Record<string, Record<string, string>>) || {}}
              fieldName={node.data.id.split(";").at(-1) || ""}
              dispatch={dispatch}
            />
          </td>
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
          <td>
            <SamlServiceForm
              value={String(data || "")}
              fieldName={node.data.id.split(";").at(-1) || ""}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
          </td>
        </tr>
      );
    case "samlAssertion":
      return (
        <tr>
          <td>
            <SamlAssertionForm
              value={String(data || "")}
              fieldName={node.data.id.split(";").at(-1) || ""}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
          </td>
        </tr>
      );
    case "samlAttributeContainer":
      return (
        <tr>
          <SamlAttributeContainerForm
            value={(data as Record<string, string>) || {}}
            fieldName={node.data.id.split(";").at(-1) || ""}
            appName={node.data.app || ""}
          />
        </tr>
      );
    case "authChoiceContainer":
      return (
        <tr>
          <AuthChoiceContainerForm
            data={(data as Record<string, string>) || {}}
            dispatch={dispatch}
          />
        </tr>
      );
    case "oidcAttributeContainer":
      return (
        <tr>
          <OidcAttributeContainerForm
            value={(data as Record<string, string>) || {}}
            fieldName={node.data.id.split(";").at(-1) || ""}
            appName={node.data.app || ""}
          />
        </tr>
      );
    case "cmbModuleContainer":
      return <CmbModuleContainerForm data={data || {}} dispatch={dispatch} />;
    case "catAndAppList":
      return <CatAndAppListForm values={data || {}} dispatch={dispatch} />;
    case "category":
      return (
        <tr>
          <td>
            <MenuCatForm
              values={data || {}}
              id={node.data.id.split(";").at(-1) || ""}
              dispatch={dispatch}
            />
          </td>
        </tr>
      );
    case "application":
      return (
        <MenuAppForm
          values={data || {}}
          dispatch={dispatch}
          id={node.data.id.split(";").at(-1) || ""}
          catid={node.data.id.split(";").at(-2) || ""}
          portal={config.portal || ""}
        />
      );
    case "displayOidcMetadata":
      return <DisplayOidcMetaDataForm confNum={config.cfgNum || 0} />;
    case "displaySamlMetadata":
      return <DisplaySamlMetaDataForm confNum={config.cfgNum || 0} />;
    case "portalskinbackground":
      return (
        <PortalskinbackgroundForm
          value={data || {}}
          portal={config.portal || ""}
          dispatch={dispatch}
        />
      );
    case "portalskin":
      return (
        <tr>
          <td>
            <PortalskinForm
              value={data || {}}
              portal={config.managerDn || ""}
              dispatch={dispatch}
            />
          </td>
        </tr>
      );
    case "SMTP":
      return (
        <tr>
          <td>
            <SMTPForm />
          </td>
        </tr>
      );
    case "sfExtraContainer":
      return (
        <tr>
          <td>
            <SfExtraContainerForm data={data || {}} dispatch={dispatch} />
          </td>
        </tr>
      );
    default:
      return <></>;
  }
}
