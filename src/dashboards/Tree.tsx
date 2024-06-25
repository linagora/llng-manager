import { Divider, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SimpleTreeView } from "@mui/x-tree-view";
import { TreeItem2 } from "@mui/x-tree-view/TreeItem2";
import { useState } from "react";
import attributes from "../static/attributes.json";
import { llngConfig } from "../utils/types";
import { TreeNodeForm, TreeNodeType } from "./TreeNode";
import { recursTree } from "./recursTree";

export const confFieldsEq = {
  casAppMetaDataNode: "casAppMetaDataExportedVars",
  casSrvMetaDataNode: "casSrvMetaDataExportedVars",
  oidcOPMetaDataNode: "oidcOPMetaDataExportedVars",
  oidcRPMetaDataNode: "oidcRPMetaDataOptions",
  samlIDPMetaDataNode: "samlIDPMetaDataXML",
  samlSPMetaDataNode: "samlSPMetaDataXML",
  virtualHost: "locationRules",
};
export interface treeFormat {
  id: string;
  label: string;
  type?: string;
  form?: string;
  children?: treeFormat[];
}
const renderTree = (nodes: treeFormat, handleClick: Function) => (
  <TreeItem2
    key={nodes.id}
    itemId={nodes.id}
    label={
      <div onClick={() => handleClick(nodes)}>
        <Typography variant="body1">{nodes.label}</Typography>
        {nodes.type && (
          <Typography variant="body2" color="textSecondary">
            type: {nodes.type}
          </Typography>
        )}
        {nodes?.form && (
          <Typography variant="caption" color="textSecondary">
            form: {nodes.form}
          </Typography>
        )}
      </div>
    }
  >
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node, handleClick))
      : null}
  </TreeItem2>
);

export default function TreeRender({
  tree,
  ctree,
  config,
}: {
  tree: Array<Object>;
  ctree: Object;
  config: llngConfig;
}) {
  const data = tree.map((el: any) => recursTree(el, config, "root", ctree));
  const [selectedItem, setSelectedItem] = useState({} as treeFormat);

  const handleNodeClick = (node: treeFormat) => {
    console.log("Clicked node:", node);
    setSelectedItem(node);
    // You can handle the node data here as needed
  };
  return (
    <div style={{ display: "flex", textAlign: "left" }}>
      <div className="clickable-labels">
        <Stack spacing={2}>
          <Box sx={{ height: "80vh", overflowY: "scroll", minWidth: 250 }}>
            <SimpleTreeView>
              {data.map((node) => renderTree(node, handleNodeClick))}
            </SimpleTreeView>
          </Box>
        </Stack>
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ width: "100%" }}>
        <Paper style={{ backgroundColor: "lightgrey" }}>menu</Paper>
        <div>
          <strong>Clicked Node</strong>
          {`: ${selectedItem?.id}, `}
        </div>
        {/* <div>{JSON.stringify(selectedItem)}</div> */}
        {selectedItem?.form && (
          <div>
            <table style={{ width: "100%" }}>
              <tbody>
                <TreeNodeForm
                  node={(selectedItem || {}) as treeFormat}
                  data={getDataFromSelected(selectedItem, config)}
                />
              </tbody>
            </table>
          </div>
        )}
        {selectedItem?.type && !selectedItem?.form && (
          <div>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <TreeNodeType
                    node={(selectedItem || {}) as treeFormat}
                    data={getDataFromSelected(selectedItem, config)}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function getDataFromSelected(selectedItem: treeFormat, config: llngConfig) {
  const specialName = selectedItem.id.split(";").at(-2) || "";
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
    case "locationRules":
      return config.locationRules ? config.locationRules[specialName] : {};
    case "exportedHeaders":
      return config.exportedHeaders ? config.exportedHeaders[specialName] : {};
    case "post":
      return config.post ? config.post[specialName] : {};
    case "vhostOptions":
      return config.vhostOptions ? config.vhostOptions[specialName] : {};
    case "samlServiceSecuritySig":
      return {
        values: {
          priv: config.samlServicePublicKeySig,
          hash: config.samlServicePrivateKeySigPwd,
          pub: config.samlServicePublicKeySig,
        },
        fieldNames: {
          priv: "samlServicePrivateKeySig",
          hash: "samlServicePrivateKeySigPwd",
          pub: "samlServicePublicKeySig",
        },
      };
    case "samlServiceSecurityEnc":
      return {
        values: {
          priv: config.samlServicePublicKeyEnc,
          hash: config.samlServicePrivateKeyEncPwd,
          pub: config.samlServicePublicKeyEnc,
        },
        fieldNames: {
          priv: "samlServicePrivateKeyEnc",
          hash: "samlServicePrivateKeyEncPwd",
          pub: "samlServicePublicKeyEnc",
        },
      };
    case "samlSPSSODescriptorSingleLogoutServiceHTTPRedirect":
      return {
        values:
          config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect ||
          attributes.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect.default,
        fieldName: "samlSPSSODescriptorSingleLogoutServiceHTTPRedirect",
      };
    case "samlSPSSODescriptorSingleLogoutServiceHTTPPost":
      return {
        values:
          config.samlSPSSODescriptorSingleLogoutServiceHTTPPost ||
          attributes.samlSPSSODescriptorSingleLogoutServiceHTTPPost.default,
        fieldName: "samlSPSSODescriptorSingleLogoutServiceHTTPPost",
      };
    case "samlSPSSODescriptorSingleLogoutServiceSOAP":
      return {
        values:
          config.samlSPSSODescriptorSingleLogoutServiceSOAP ||
          attributes.samlSPSSODescriptorSingleLogoutServiceSOAP.default,
        fieldName: "samlSPSSODescriptorSingleLogoutServiceSOAP",
      };
    case "samlIDPMetaDataXML":
      console.log(
        config.samlIDPMetaDataXML
          ? config.samlIDPMetaDataXML[specialName].samlIDPMetaDataXML
          : ""
      );
      return config.samlIDPMetaDataXML
        ? config.samlIDPMetaDataXML[specialName].samlIDPMetaDataXML
        : "" || "";
    case "samlSPMetaDataXML":
      return config.samlSPMetaDataXML
        ? config.samlSPMetaDataXML[specialName].samlSPMetaDataXML
        : "" || "";
    case "oidcRPMetaDataMacros":
      return config.oidcRPMetaDataMacros
        ? config.oidcRPMetaDataMacros[specialName]
        : {};
    case "samlSPMetaDataMacros":
      return config.samlSPMetaDataMacros
        ? config.samlSPMetaDataMacros[specialName]
        : {};
    case "samlIDPMetaDataExportedAttributes":
      return {
        value: config.samlIDPMetaDataExportedAttributes
          ? config.samlIDPMetaDataExportedAttributes[specialName]
          : {},
        fieldName: "samlIDPMetaDataExportedAttributes",
      };
    case "samlSPMetaDataExportedAttributes":
      return {
        value: config.samlSPMetaDataExportedAttributes
          ? config.samlSPMetaDataExportedAttributes[specialName]
          : {},
        fieldName: "samlSPMetaDataExportedAttributes",
      };
    default:
      // if (selectedItem.id.includes("samlSPMetaDataOptions")) {
      //   return getDataFromSelected(
      //     selectedItem,
      //     (config.samlSPMetaDataOptions
      //       ? config.samlSPMetaDataOptions[specialName]
      //       : {}) as unknown as llngConfig
      //   );
      // }
      const data =
        config[selectedItem.id?.split(";").at(-1) as keyof llngConfig];
      return data !== undefined ? data : config;
  }
}
