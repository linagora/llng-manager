import { t } from "i18next";
import attributes from "../static/attributes.json";
import { llngConfig } from "../utils/types";
import { TreeNode } from "./searchIntree";

export interface treeFormat {
  id: string;
  name: string;
  type?: string;
  form?: string;
  children?: treeFormat[];
}

export const confFieldsEq = {
  casAppMetaDataNode: "casAppMetaDataExportedVars",
  casSrvMetaDataNode: "casSrvMetaDataExportedVars",
  oidcOPMetaDataNode: "oidcOPMetaDataExportedVars",
  oidcRPMetaDataNode: "oidcRPMetaDataOptions",
  samlIDPMetaDataNode: "samlIDPMetaDataXML",
  samlSPMetaDataNode: "samlSPMetaDataXML",
  virtualHost: "locationRules",
};

export function recursTree(
  tree: TreeNode | string,
  config: llngConfig,
  parentId: string,
  ctree?: any
): treeFormat {
  if (typeof tree === "string") {
    const id = tree.slice(0, -1);
    if (Object.keys(confFieldsEq).includes(id)) {
      return {
        name: t(tree),
        type: attributes[id as keyof typeof attributes]?.type,
        id: `${parentId};${tree}`,
        children: Object.keys(
          (config[
            confFieldsEq[id as keyof typeof confFieldsEq] as keyof llngConfig
          ] || {}) as Record<string, string>
        ).map((el) => {
          return {
            name: t(el),
            type: id,
            form: ctree.form,
            id: `${parentId};${tree};${el}`,
            children: ctree[id as keyof typeof ctree].map((node: any) => {
              // return recursTree(node, config, `${parentId};${el}`);
              return {
                name: t(node.title ? node.title : node),
                type: attributes[
                  (node.title ? node.title : node) as keyof typeof attributes
                ]?.type,
                form: node.form,
                id: `${parentId};${tree};${el};${
                  node.title ? node.title : node
                }`,
              };
            }),
          };
        }) as Array<treeFormat>,
      };
    } else if (config[tree as keyof typeof config] instanceof Object) {
      return {
        name: t(tree),
        type: attributes[tree as keyof typeof attributes]?.type,
        id: `${parentId};${tree}`,
      };
    }
    return {
      name: t(tree),
      type: attributes[tree as keyof typeof attributes]?.type,
      id: `${parentId};${tree}`,
    };
  } else {
    if (tree.nodes_cond) {
      tree.nodes = tree.nodes?.concat(tree.nodes_cond);
    }
    return {
      name: t(tree.title),
      form: tree.form,
      type: attributes[tree.title as keyof typeof attributes]?.type,
      id: `${parentId};${tree.title}`,
      children: tree.nodes?.map((node: any) => {
        return {
          name: t(node.title ? node.title : node),
          type: attributes[
            (node.title ? node.title : node) as keyof typeof attributes
          ]?.type,
          form: node.form,
          id: `${parentId};${tree.title};${node.title ? node.title : node}`,
        };
      }),
    };
  }
}
