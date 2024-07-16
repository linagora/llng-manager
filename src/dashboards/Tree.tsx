import EditIcon from "@mui/icons-material/Edit";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  CircularProgress,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { RefObject, useEffect, useRef, useState } from "react";
import { NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import useResizeObserver from "use-resize-observer";
import { TreeNode, recursTree, treeFormat } from "../utils/recursTree";
import { findElementByTitleOrValue } from "../utils/searchIntree";
import { llngConfig } from "../utils/types";
import "./Tree.css";
import { TreeNodeType } from "./TreeNode";
export function ToggleConfTree(
  itemId: string,
  treeRef: RefObject<TreeApi<treeFormat>>,
  tree: TreeNode[],
  config: llngConfig
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
  const [ITEMS, setItems] = useState(
    tree?.map((el: any) => recursTree(el, config, "root"))
  );
  const [selectedItem, setSelectedItem] = useState<NodeApi<treeFormat> | null>(
    null
  );
  const { ref, width, height = 1 } = useResizeObserver();
  useEffect(() => {
    setItems(tree?.map((el: any) => recursTree(el, config, "root")));
  }, [tree, config]);

  if (tree) {
    return (
      <div className="treePage">
        <div className="tree" ref={ref}>
          {width} {height}
          <Tree
            disableDrag={true}
            rowHeight={height / 25}
            ref={treeRef}
            onToggle={(itemId) => ToggleConfTree(itemId, treeRef, tree, config)}
            height={height}
            width={width}
            onFocus={(node) => {
              setSelectedItem(node);
            }}
            data={ITEMS}
            openByDefault={false}
          >
            {Node}
          </Tree>
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ width: "100%" }}>
          <Paper style={{ backgroundColor: "lightgrey" }}>
            <strong className="title3">{selectedItem?.data?.name}</strong>
            {selectedItem?.data.help ? (
              <Link target="blank" href={selectedItem?.data.help}>
                <HelpCenterOutlinedIcon />
                {selectedItem?.data.help}
              </Link>
            ) : (
              <></>
            )}
          </Paper>
          <div className="nodeContent">
            <strong>Clicked Node</strong>
            {`: ${selectedItem?.data?.id}, `}
            <Typography variant="body2" color="textSecondary">
              type: {selectedItem?.data.type}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              app: {selectedItem?.data.app}
            </Typography>
            {selectedItem?.data?.type && (
              <table style={{ width: "100%" }}>
                <tbody>
                  <TreeNodeType node={selectedItem} config={config} />
                </tbody>
              </table>
            )}
          </div>
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
