import { t } from "i18next";
import attributes from "../static/attributes.json";
import { llngConfig } from "./types";

export interface TreeNode {
  help?: string;
  cnodes?: TreeNode[];
  template?: string;
  _nodes_cond?: TreeNode[];
  _nodes?: TreeNode[];
  title: string;
  id?: string;
  type?: string;
  get?: string;
}

export interface treeFormat {
  id: string;
  name: string;
  type?: string;
  children?: treeFormat[];
  app?: string;
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
  tree: TreeNode,
  config: llngConfig,
  parentId: string,
  app?: string
): treeFormat {
  if (tree.cnodes && typeof tree.cnodes === "object") {
    const id = tree.title?.slice(0, -1) || "";
    if (Object.keys(confFieldsEq).includes(id)) {
      return {
        name: t(tree.title),
        type: attributes[tree.title as keyof typeof attributes]?.type,
        id: `${parentId};${tree.title}`,
        children: Object.keys(
          (config[
            confFieldsEq[id as keyof typeof confFieldsEq] as keyof llngConfig
          ] || {}) as Record<string, string>
        ).map((el) => {
          return {
            name: t(el),
            type: id,
            app: el,
            id: `${parentId};${tree.title};${el}`,
            children: tree.cnodes?.map((node: TreeNode) => {
              return recursTree(
                node,
                config,
                `${parentId};${tree.title};${el}`,
                el
              );
            }),
          };
        }) as Array<treeFormat>,
        app: app,
      };
    }
  } else if (tree._nodes) {
    if (tree._nodes_cond) {
      tree._nodes = tree._nodes.concat(tree._nodes_cond);
    }
    return {
      name: t(tree.title),
      type:
        tree?.type || attributes[tree.title as keyof typeof attributes]?.type,
      id: `${parentId};${tree.title}`,
      children: tree._nodes?.map((node: TreeNode) => {
        return {
          name: t(node.title),
          type:
            node.type ||
            attributes[node.title as keyof typeof attributes]?.type,
          id: `${parentId};${tree.title};${node.title}`,
          app: app,
        };
      }),
      app: app,
    };
  }
  return {
    name: t(tree.title),
    type: tree?.type || attributes[tree.title as keyof typeof attributes]?.type,
    id: `${parentId};${tree.title}`,
    app: app,
  };
}
