import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton } from "@mui/material";
import { NodeApi } from "react-arborist";
import { changeAppName, delApp } from "../features/config/configSlice";
import { treeFormat } from "../utils/recursTree";
import OidcOPMetaDataNodeForm from "./OidcOPMetaDataNodeForm";

export default function OidcOPMetaDataNodeContainerForm({
  node,
  dispatch,
}: {
  node: NodeApi<treeFormat>;
  dispatch: Function;
}) {
  let i = 0;
  return (
    <td>
      <table>
        <tbody>
          {node.children?.map((child) => {
            i++;
            return (
              <tr key={i}>
                <OidcOPMetaDataNodeForm
                  value={child.data.name}
                  updateFunc={(e: { name: string; newName: string }) => {
                    dispatch(changeAppName(e));
                    child.data.name = e.newName;
                    child.data.id = `${child.data.id
                      .split(";")
                      .slice(0, -1)
                      .join(";")};${e.newName}`;
                    child.data.app = e.newName;
                    child.data.children?.forEach((el) => {
                      el.id = `${el.id.split(";").slice(0, -2).join(";")};${
                        e.newName
                      };${el.id.split(";").at(-1)}`;
                      el.app = e.newName;
                    });
                  }}
                />
                <td>
                  <IconButton
                    onClick={() => {
                      dispatch(
                        delApp({ name: child.data.name || "", type: "OPoidc" })
                      );
                    }}
                    className="minus"
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </td>
  );
}
