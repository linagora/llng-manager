export interface TreeNode {
  form?: string;
  help?: string;
  nodes_cond?: (TreeNode | string)[];
  nodes?: (TreeNode | string)[];
  title: string;
  group?: string[];
}

export function findElementByTitleOrValue(
  arr: (TreeNode | string)[],
  searchTerm: string
): TreeNode | string | undefined {
  for (const element of arr) {
    if (typeof element === "object" && element !== null) {
      if (element.title === searchTerm) {
        return element;
      }
      if (element.nodes) {
        const result =
          findElementByTitleOrValue(element.nodes, searchTerm) ||
          (element.nodes_cond
            ? findElementByTitleOrValue(element.nodes_cond, searchTerm)
            : undefined);
        if (result) {
          return result;
        }
      }
    }
  }
}

export function findElementByTitleOrValueCtree(
  arr: (TreeNode | string)[],
  searchTerm: string
): TreeNode | string | undefined {
  for (const element of arr) {
    if (typeof element === "object" && element !== null) {
      if (element.title === searchTerm) {
        return element;
      }
      if (element.nodes) {
        const result = findElementByTitleOrValue(element.nodes, searchTerm);
        if (result) {
          return result;
        }
      }
    }
  }
}
