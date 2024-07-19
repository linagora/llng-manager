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
  help?: string;
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
        help: tree.help,
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
  } else if (tree.cnodes === "applicationList") {
    console.log("je fais ca");
    return {
      name: t(tree.title),
      help: tree.help,
      type:
        tree?.type || attributes[tree.title as keyof typeof attributes]?.type,
      id: `${parentId};${tree.title}`,
      children: Object.keys(
        config[tree.title as keyof llngConfig] as Record<
          string,
          Record<string, string>
        >
      )
        .sort(
          (key1, key2) =>
            (
              config[tree.title as keyof llngConfig] as Record<
                string,
                Record<string, any>
              >
            )[key1].order -
            (
              config[tree.title as keyof llngConfig] as Record<
                string,
                Record<string, any>
              >
            )[key2].order
        )
        .map((el) => {
          return {
            name: (
              config[tree.title as keyof llngConfig] as Record<
                string,
                Record<string, any>
              >
            )[el].catname,
            id: `${tree.title};${el}`,
            type: (
              config[tree.title as keyof llngConfig] as Record<
                string,
                Record<string, any>
              >
            )[el].type,
            children: Object.keys(
              (
                config[tree.title as keyof llngConfig] as Record<
                  string,
                  Record<string, any>
                >
              )[el]
            )
              .filter(
                (key) => key !== "type" && key !== "catname" && key !== "order"
              )
              .sort(
                (key1, key2) =>
                  (
                    config[tree.title as keyof llngConfig] as Record<
                      string,
                      Record<string, any>
                    >
                  )[el][key1].order -
                  (
                    config[tree.title as keyof llngConfig] as Record<
                      string,
                      Record<string, any>
                    >
                  )[el][key2].order
              )
              .map((key) => {
                return {
                  name: (
                    config[tree.title as keyof llngConfig] as Record<
                      string,
                      Record<string, any>
                    >
                  )[el][key].options.name,
                  id: `${tree.title};${el};${key}`,
                  type: "application",
                };
              }),
          };
        }),
    };
  } else if (tree._nodes) {
    if (tree._nodes_cond) {
      tree._nodes = tree._nodes.concat(tree._nodes_cond);
    }

    return {
      name: t(tree.title),
      help: tree.help,
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
          help: node.help,
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
    help: tree.help,
  };
}
