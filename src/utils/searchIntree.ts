import { TreeNode, confFieldsEq, treeFormat } from "./recursTree";
import { llngConfig } from "./types";

export function findElementByTitleOrValue(
  arr: TreeNode[],
  searchTerm: string,
  parent?: string
): TreeNode | undefined {
  for (const element of arr) {
    if (element) {
      if (element.id === parent) {
        for (const child of element._nodes || []) {
          if (child.id === searchTerm) {
            return child;
          }
        }
      }
      if (element._nodes) {
        const result =
          findElementByTitleOrValue(element._nodes, searchTerm, parent) ||
          (element._nodes_cond
            ? findElementByTitleOrValue(element._nodes_cond, searchTerm, parent)
            : undefined);
        if (result) {
          return result;
        }
      }
      if (element.cnodes) {
        const result = findElementByTitleOrValue(
          element.cnodes,
          searchTerm,
          parent
        );
        if (result) {
          return result;
        }
      }
    }
  }
}

export function findElementInConf(config: llngConfig, node: treeFormat): any {
  const searchedId = node.id.split(";").at(-1) || "";
  let result: any;

  if (node.app) {
    const appfields = Object.keys(config)
      .map((key) => {
        const val = (config[key as keyof llngConfig] || {}) as Record<
          string,
          any
        >;
        const returnObject: Record<string, any> = {};

        if (val[node.app || ""]) {
          returnObject[key] = val[node.app || ""];
          return returnObject;
        }
        return null;
      })
      .filter(Boolean);

    for (const el of appfields) {
      if (el && Object.keys(el).includes(searchedId)) {
        console.log("found: ", el);
        return el[searchedId];
      }

      for (const field of appfields) {
        const found = recursSearchConf(field, searchedId);
        if (found !== undefined) {
          result = found;
          break;
        }
      }

      if (result !== undefined || result !== null) break;
    }
    if (searchedId.includes("XML")) {
      return result[searchedId];
    }
    return result;
  } else if (Object.keys(confFieldsEq).includes(searchedId.slice(0, -1))) {
    return config[
      confFieldsEq[
        searchedId.slice(0, -1) as keyof typeof confFieldsEq
      ] as keyof llngConfig
    ];
  } else {
    return recursSearchConf(config, searchedId);
  }
}

function recursSearchConf(conf: any, id: string): any {
  if (typeof conf !== "object" || conf === null) {
    return undefined;
  }

  for (const key of Object.keys(conf)) {
    if (key === id) {
      return conf[key];
    }

    const found = recursSearchConf(conf[key], id);
    if (found !== undefined) {
      return found;
    }
  }

  return undefined;
}

export function changeElementInConf(
  config: llngConfig,
  node: treeFormat,
  obj: any
) {
  const searchedId = node.id.split(";").at(-1) || "";
  let found = false;
  if (node.app) {
    for (const key in config) {
      const val = (config[key as keyof llngConfig] || {}) as Record<
        string,
        any
      >;
      const el = val[node.app || ""];
      console.debug("Searching ", searchedId, " in ", el);
      if (el) {
        if (Object.keys(el).includes(searchedId)) {
          el[searchedId] = obj;
          return true;
        }
        found = recursChangeConf(el, searchedId, obj);
        if (found) {
          return found;
        } else {
          node.id.split(";").forEach((nook) => {
            Object.keys(config).forEach((key) => {
              if (key === nook || nook.includes(key)) {
                if (typeof config[key as keyof llngConfig] === "object") {
                  if (
                    !(config[key as keyof llngConfig] as any)[node.app || ""]
                  ) {
                    ((config[key as keyof llngConfig] as any)[
                      node.app || ""
                    ] as any) = {};
                  }
                  if (node.type === "keyTextContainer") {
                    ((config[key as keyof llngConfig] as any)[
                      node.app || ""
                    ] as any) = obj;
                  } else {
                    ((config[key as keyof llngConfig] as any)[node.app || ""][
                      searchedId
                    ] as any) = obj;
                  }
                  return true;
                }
              }
            });
          });
        }
      }
    }
  } else if (Object.keys(confFieldsEq).includes(searchedId.slice(0, -1))) {
    (config[
      confFieldsEq[
        searchedId.slice(0, -1) as keyof typeof confFieldsEq
      ] as keyof llngConfig
    ] as any) = obj;
    return true;
  } else {
    found = recursChangeConf(config, searchedId, obj);
    if (!found) {
      (config[searchedId as keyof llngConfig] as any) = obj;
    }
  }
}

function recursChangeConf(conf: any, id: string, obj: any): boolean {
  if (typeof conf !== "object" || conf === null) {
    return false;
  }

  for (const key of Object.keys(conf)) {
    if (key === id) {
      conf[key] = obj;
      return true;
    }
    return recursSearchConf(conf[key], id);
  }
  return false;
}
