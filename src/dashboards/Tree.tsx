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
import { TreeNode, recursTree, treeFormat } from "../utils/recursTree";
import { findElementByTitleOrValue } from "../utils/searchIntree";
import { llngConfig } from "../utils/types";
import "./Tree.css";
import { TreeNodeType } from "./TreeNode";
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
          const foundElement = findElementByTitleOrValue(
            tree,
            childId,
            child.id.split(";").at(-2)
          );
          if (foundElement) {
            child = recursTree(foundElement, config, node.id, node.app);
          }
          return child;
        });
      } else {
        const id = node.id.split(";").at(-1) || "";
        const foundElement = findElementByTitleOrValue(
          tree,
          id,
          node.id.split(";").at(-2)
        );

        if (foundElement) {
          if (node.type === "catAndAppList") {
            console.log(node);
            node.children = Object.keys(
              config[id as keyof llngConfig] as Record<
                string,
                Record<string, string>
              >
            )
              .sort(
                (key1, key2) =>
                  (
                    config[id as keyof llngConfig] as Record<
                      string,
                      Record<string, any>
                    >
                  )[key1].order -
                  (
                    config[id as keyof llngConfig] as Record<
                      string,
                      Record<string, any>
                    >
                  )[key2].order
              )
              .map((el) => {
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
                    .filter(
                      (key) =>
                        key !== "type" && key !== "catname" && key !== "order"
                    )
                    .sort(
                      (key1, key2) =>
                        (
                          config[id as keyof llngConfig] as Record<
                            string,
                            Record<string, any>
                          >
                        )[el][key1].order -
                        (
                          config[id as keyof llngConfig] as Record<
                            string,
                            Record<string, any>
                          >
                        )[el][key2].order
                    )
                    .map((key) => {
                      console.log(
                        "hello",
                        (
                          config[id as keyof llngConfig] as Record<
                            string,
                            Record<string, any>
                          >
                        )[el]
                      );
                      return {
                        name: (
                          config[id as keyof llngConfig] as Record<
                            string,
                            Record<string, any>
                          >
                        )[el][key].options.name,
                        id: `${node.id};${el};${key}`,
                        type: "application",
                      };
                    }),
                };
              });
          } else {
            return recursTree(foundElement, config, item.id, item.app);
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
  if (tree) {
    return (
      <div className="treePage">
        <div className="tree" ref={ref}>
          {width} {height}
          <Tree
            disableDrag={true}
            rowHeight={height / 25}
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
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ width: "100%" }}>
          <Paper style={{ backgroundColor: "lightgrey" }}>menu</Paper>
          <div className="nodeContent">
            <strong>Clicked Node</strong>
            {`: ${selectedItem?.data?.id}, `}
            <Typography variant="body2" color="textSecondary">
              type: {selectedItem?.data.type}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              app: {selectedItem?.data.app}
            </Typography>
          </div>
          {selectedItem?.data?.type && (
            <div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <TreeNodeType node={selectedItem} config={config} />
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
      className="treeitem"
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
          paddingLeft: `${node.data.id.split(";").length}px`,
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
