import { t } from "i18next";
import attributes from "../static/attributes.json";
import { llngConfig } from "../utils/types";
import { confFieldsEq, treeFormat } from "./Tree";

export function recursTree(
  tree: any,
  config: llngConfig,
  parentId: string,
  ctree?: any
): treeFormat {
  if (typeof tree === "string") {
    const id = tree.slice(0, -1);
    if (Object.keys(confFieldsEq).includes(id)) {
      console.log(
        confFieldsEq[id as keyof typeof confFieldsEq] as keyof llngConfig
      );
      return {
        label: t(tree),
        type: attributes[id as keyof typeof attributes]?.type,
        id: `${parentId};${tree}`,
        children: Object.keys(
          (config[
            confFieldsEq[id as keyof typeof confFieldsEq] as keyof llngConfig
          ] || {}) as Record<string, string>
        ).map((el) => {
          return {
            label: t(el),
            type: attributes[ctree.title as keyof typeof attributes]?.type,
            form: ctree.form,
            id: `${parentId};${el}`,
            children: ctree[id as keyof typeof ctree].map((node: any) => {
              return recursTree(node, config, `${parentId};${el}`);
            }),
          };
        }) as Array<treeFormat>,
      };
    } else if (config[tree as keyof typeof config] instanceof Object) {
      return {
        label: t(tree),
        type: attributes[tree as keyof typeof attributes]?.type,
        id: `${parentId};${tree}`,
      };
    }
    return {
      label: t(tree),
      type: attributes[tree as keyof typeof attributes]?.type,
      id: `${parentId};${tree}`,
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
      return {
        label: t(tree.title),
        form: tree.form,
        type: attributes[tree.title as keyof typeof attributes]?.type,
        id: `${parentId};${tree.title}`,
        children: tree.nodes
          ?.map((node: any) => {
            return recursTree(node, config, `${parentId};${tree.title}`, ctree);
          })
          .concat(
            tree.nodes_cond
              ?.map((condNode: any) => {
                return recursTree(
                  condNode,
                  config,
                  `${parentId};${tree.title}`,
                  ctree
                );
              })
              .filter((el: any) =>
                selectedOptions.includes(el.id.split(";").at(-1))
              )
          ),
      };
    }
    return {
      label: t(tree.title),
      form: tree.form,
      type: attributes[tree.title as keyof typeof attributes]?.type,
      id: `${parentId};${tree.title}`,
      children: tree.nodes?.map((node: any) => {
        return recursTree(node, config, `${parentId};${tree.title}`, ctree);
      }),
    };
  }
}
