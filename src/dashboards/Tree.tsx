import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { RefObject, useRef, useState } from "react";
import { NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import useResizeObserver from "use-resize-observer";
import attributes from "../static/attributes.json";
import { llngConfig } from "../utils/types";
import { TreeNodeType } from "./TreeNode";
import { TreeNode, recursTree, treeFormat } from "./recursTree";
import { findElementByTitleOrValue } from "./searchIntree";

function ToggleConfTree(
  itemId: string,
  treeRef: RefObject<TreeApi<treeFormat>>,
  tree: TreeNode[],
  config: llngConfig,
  treeData: treeFormat[],
  setTreeData: Function
): void {
  const item = treeRef.current?.get(itemId)?.data;
  if (item) {
    item.children = item.children?.map((node: any) => {
      if (node?.children) {
        node.children = node?.children.map((child: any) => {
          const childId = child.id.split(";").at(-1) || "";
          const foundElement = findElementByTitleOrValue(tree, childId);
          if (foundElement) {
            child = recursTree(foundElement, config, node.id, node.app);
          }
          return child;
        });
      } else {
        const id = node.id.split(";").at(-1) || "";
        const foundElement = findElementByTitleOrValue(tree, id);

        if (foundElement) {
          return recursTree(foundElement, config, item.id, item.app);
        } else if (config[id as keyof llngConfig]) {
          if (node.type === "catAndAppList") {
            node.children = Object.keys(
              config[id as keyof llngConfig] as Record<
                string,
                Record<string, string>
              >
            ).map((el) => {
              return {
                name: (
                  config[id as keyof llngConfig] as Record<
                    string,
                    Record<string, any>
                  >
                )[el].catname,
                id: `${node.id};${el}`,
                type: (
                  config[id as keyof llngConfig] as Record<
                    string,
                    Record<string, any>
                  >
                )[el].type,
                children: Object.keys(
                  (
                    config[id as keyof llngConfig] as Record<
                      string,
                      Record<string, any>
                    >
                  )[el]
                )
                  .filter((key) => key !== "type" && key !== "catname")
                  .map((key) => {
                    return {
                      name: (
                        config[id as keyof llngConfig] as Record<
                          string,
                          Record<string, any>
                        >
                      )[el][key].options.name,
                      id: `${node.id};${el}:${key}`,
                      type: "application",
                    };
                  }),
              };
            });
          }
        }
      }
      return node;
    });
    // const updatedData = treeData;
    //  setTreeData(updatedData);
  }
}

export default function TreeRender({
  tree,
  config,
}: {
  tree?: TreeNode[];
  config: llngConfig;
}) {
  const treeRef = useRef<TreeApi<treeFormat>>(null);
  const ITEMS = tree?.map((el: any) => recursTree(el, config, "root"));
  const [selectedItem, setSelectedItem] = useState<NodeApi<treeFormat> | null>(
    null
  );
  const [treeData, setTreeData] = useState<treeFormat[] | undefined>(ITEMS);
  const { ref, width, height = 1 } = useResizeObserver();
  const [data, setData] = useState<any>(config);
  if (tree) {
    return (
      <div style={{ display: "flex", textAlign: "left", height: "85vh" }}>
        <Box
          sx={{ flexGrow: 1, textAlign: "left", height: "90%", width: "35%" }}
          ref={ref}
        >
          {width} {height}
          <Tree
            disableDrag={true}
            ref={treeRef}
            onToggle={(itemId) =>
              ToggleConfTree(
                itemId,
                treeRef,
                tree,
                config,
                treeData ? treeData : ([] as treeFormat[]),
                setTreeData
              )
            }
            height={height}
            width={width}
            onFocus={(node) => {
              setSelectedItem(node);
            }}
            initialData={ITEMS}
            openByDefault={false}
          >
            {Node}
          </Tree>
        </Box>
        <Divider orientation="vertical" flexItem />
        <div style={{ width: "100%" }}>
          <Paper style={{ backgroundColor: "lightgrey" }}>menu</Paper>
          <div>
            <strong>Clicked Node</strong>
            {`: ${selectedItem?.data?.id}, `}
            <Typography variant="body2" color="textSecondary">
              type: {selectedItem?.data.type}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              app: {selectedItem?.data.app}
            </Typography>
          </div>
          {/* {selectedItem?.data?.form && (
            <div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <TreeNodeForm
                    node={(selectedItem.data || {}) as treeFormat}
                    data={data}
                  />
                </tbody>
              </table>
            </div>
          )} */}
          {selectedItem?.data?.type && ( // && !selectedItem?.data?.form
            <div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <TreeNodeType
                    node={(selectedItem.data || {}) as treeFormat}
                    config={config}
                  />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
}

function Node({ node, style }: NodeRendererProps<treeFormat>) {
  const Icon = node.isInternal
    ? node.isOpen
      ? KeyboardArrowDownIcon
      : KeyboardArrowRightIcon
    : EditIcon;

  return (
    <div
      style={{
        ...style,
        cursor: "pointer",
      }}
      onClick={() => {
        if (node.data.type !== "simpleInputContainer") {
          node.toggle();
        }
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: `${node.data.id.split(";").length * 5}px`,
        }}
      >
        <Icon />
        <Typography
          variant="body1"
          style={{ marginLeft: "8px", wordBreak: "break-word" }}
        >
          {node?.data.name}
        </Typography>
      </div>
      <Divider flexItem />
    </div>
  );
}

function getDataFromSelected(
  selectedItem: treeFormat,
  currentData: any,
  config: llngConfig
) {
  const leafName = selectedItem.id.split(";").at(-1) || "";
  const leafParentName = selectedItem.id.split(";").at(-2) || "";
  const eldestName = selectedItem.id.split(";").at(-3) || "";
  switch (selectedItem.id.split(";").at(-1)) {
    case "samlSPMetaDataNodes":
      return config.samlSPMetaDataXML;
    case "samlIDPMetaDataNodes":
      return config.samlIDPMetaDataXML;
    case "oidcRPMetaDataNodes":
      return config.oidcRPMetaDataOptions;
    case "oidcOPMetaDataNodes":
      return config.oidcOPMetaDataOptions;
    case "casAppMetaDataNodes":
      return config.casAppMetaDataOptions;
    case "casSrvMetaDataNodes":
      return config.casSrvMetaDataOptions;
    case "virtualHosts":
      return config.locationRules;

    //   case "samlServiceSecuritySig":
    //     return {
    //       values: {
    //         priv: config.samlServicePublicKeySig,
    //         hash: config.samlServicePrivateKeySigPwd,
    //         pub: config.samlServicePublicKeySig,
    //       },
    //       fieldNames: {
    //         priv: "samlServicePrivateKeySig",
    //         hash: "samlServicePrivateKeySigPwd",
    //         pub: "samlServicePublicKeySig",
    //       },
    //     };
    //   case "samlServiceSecurityEnc":
    //     return {
    //       values: {
    //         priv: config.samlServicePublicKeyEnc,
    //         hash: config.samlServicePrivateKeyEncPwd,
    //         pub: config.samlServicePublicKeyEnc,
    //       },
    //       fieldNames: {
    //         priv: "samlServicePrivateKeyEnc",
    //         hash: "samlServicePrivateKeyEncPwd",
    //         pub: "samlServicePublicKeyEnc",
    //       },
    //     };
    //   case "samlSPSSODescriptorSingleLogoutServiceHTTPRedirect":
    //     return {
    //       values:
    //         config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect ||
    //         attributes.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect.default,
    //       fieldName: "samlSPSSODescriptorSingleLogoutServiceHTTPRedirect",
    //     };
    //   case "samlSPSSODescriptorSingleLogoutServiceHTTPPost":
    //     return {
    //       values:
    //         config.samlSPSSODescriptorSingleLogoutServiceHTTPPost ||
    //         attributes.samlSPSSODescriptorSingleLogoutServiceHTTPPost.default,
    //       fieldName: "samlSPSSODescriptorSingleLogoutServiceHTTPPost",
    //     };
    //   case "samlSPSSODescriptorSingleLogoutServiceSOAP":
    //     return {
    //       values:
    //         config.samlSPSSODescriptorSingleLogoutServiceSOAP ||
    //         attributes.samlSPSSODescriptorSingleLogoutServiceSOAP.default,
    //       fieldName: "samlSPSSODescriptorSingleLogoutServiceSOAP",
    //     };
    //   case "samlIDPMetaDataXML":
    //     return config.samlIDPMetaDataXML
    //       ? config.samlIDPMetaDataXML[specialName].samlIDPMetaDataXML
    //       : "" || "";
    //   case "samlSPMetaDataXML":
    //     return config.samlSPMetaDataXML
    //       ? config.samlSPMetaDataXML[specialName].samlSPMetaDataXML
    //       : "" || "";
    //   case "oidcRPMetaDataMacros":
    //     return config.oidcRPMetaDataMacros
    //       ? config.oidcRPMetaDataMacros[specialName]
    //       : {};
    //   case "samlSPMetaDataMacros":
    //     return config.samlSPMetaDataMacros
    //       ? config.samlSPMetaDataMacros[specialName]
    //       : {};
    //   case "samlIDPMetaDataExportedAttributes":
    //     return {
    //       value: config.samlIDPMetaDataExportedAttributes
    //         ? config.samlIDPMetaDataExportedAttributes[specialName]
    //         : {},
    //       fieldName: "samlIDPMetaDataExportedAttributes",
    //     };
    //   case "samlSPMetaDataExportedAttributes":
    //     return {
    //       value: config.samlSPMetaDataExportedAttributes
    //         ? config.samlSPMetaDataExportedAttributes[specialName]
    //         : {},
    //       fieldName: "samlSPMetaDataExportedAttributes",
    //     };
    default:
      //     // if (selectedItem.id.includes("samlSPMetaDataOptions")) {
      //     //   return getDataFromSelected(
      //     //     selectedItem,
      //     //     (config.samlSPMetaDataOptions
      //     //       ? config.samlSPMetaDataOptions[specialName]
      //     //       : {}) as unknown as llngConfig
      //     //   );
      //     // }

      const data = config[leafName as keyof llngConfig];
      const defaultData = attributes[leafName as keyof typeof attributes]
        ? (
            attributes[leafName as keyof typeof attributes] as Record<
              string,
              string
            >
          )?.default
        : "";
      return data !== undefined && data !== null
        ? data[leafParentName as keyof typeof data]
          ? data[leafParentName as keyof typeof data]
          : data
        : defaultData;
  }
}
