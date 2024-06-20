import { Divider, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SimpleTreeView } from "@mui/x-tree-view";
import { TreeItem2 } from "@mui/x-tree-view/TreeItem2";
import { t } from "i18next";
import { useState } from "react";
import attributes from "../static/attributes.json";
import { llngConfig } from "../utils/types";
import { TreeNode } from "./TreeNode";

const confFieldsEq = {
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
function recursTree(
  tree: any,
  config: llngConfig,
  parentId: string,
  ctree?: any
): treeFormat {
  if (typeof tree === "string") {
    const id = tree.slice(0, -1);
    if (ctree ? ctree[id as keyof typeof ctree] : false) {
      return {
        label: t(tree),
        type: attributes[tree as keyof typeof attributes]?.type,
        id: `${parentId}.${tree}`,
        children: Object.keys(
          config[
            confFieldsEq[id as keyof typeof confFieldsEq] as keyof llngConfig
          ] as Record<string, string>
        ).map((el) => {
          return {
            label: t(el),
            type: attributes[ctree.title as keyof typeof attributes]?.type,
            form: ctree.form,
            id: `${parentId}.${el}`,
            children: ctree[id as keyof typeof ctree].map((node: any) => {
              return recursTree(node, config, `${parentId}.${el}`);
            }),
          };
        }) as Array<treeFormat>,
      };
    }
    return {
      label: t(tree),
      type: attributes[tree as keyof typeof attributes]?.type,
      id: `${parentId}.${tree}`,
    };
  } else {
    const choices = [
      config.authentication,
      config.registerDB,
      config.passwordDB,
      config.userDB,
    ];
    const selectedOptions = [
      config.authentication,
      config.registerDB,
      config.passwordDB,
      config.userDB,
      ...Object.keys(
        choices.includes("Choice")
          ? config.authChoiceModules
            ? config.authChoiceModules
            : {}
          : {}
      ).flatMap((key) => {
        if (config.authChoiceModules) {
          return config.authChoiceModules[key].split(";").splice(0, 3);
        }
        return [];
      }),
    ].map(
      (el) => `${el === "OpenIDConnect" ? "oidc" : el?.toLowerCase()}Params`
    );

    if (tree.nodes_cond) {
      console.log("aaaak");
      return {
        label: t(tree.title),
        form: tree.form,
        type: attributes[tree.title as keyof typeof attributes]?.type,
        id: `${parentId}.${tree.title}`,
        children: tree.nodes
          ?.map((node: any) => {
            return recursTree(node, config, `${parentId}.${tree.title}`, ctree);
          })
          .concat(
            tree.nodes_cond
              ?.map((condNode: any) => {
                return recursTree(
                  condNode,
                  config,
                  `${parentId}.${tree.title}`,
                  ctree
                );
              })
              .filter((el: any) =>
                selectedOptions.includes(el.id.split(".").at(-1))
              )
          ),
      };
    }
    return {
      label: t(tree.title),
      form: tree.form,
      type: attributes[tree.title as keyof typeof attributes]?.type,
      id: `${parentId}.${tree.title}`,
      children: tree.nodes?.map((node: any) => {
        return recursTree(node, config, `${parentId}.${tree.title}`, ctree);
      }),
    };
  }
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
                {selectedItem.children?.map((child) => (
                  <tr>
                    <td>
                      <TreeNode
                        node={(child || {}) as treeFormat}
                        data={
                          config[
                            child.id?.split(".").at(-1) as keyof llngConfig
                          ]
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedItem?.type && (
          <TreeNode
            node={(selectedItem || {}) as treeFormat}
            data={
              config[selectedItem.id?.split(".").at(-1) as keyof llngConfig]
            }
          />
        )}
      </div>
    </div>
  );
}
