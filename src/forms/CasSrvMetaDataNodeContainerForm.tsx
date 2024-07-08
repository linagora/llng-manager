import { NodeApi } from "react-arborist";
import { treeFormat } from "../dashboards/recursTree";
import { changeAppName } from "../features/config/configSlice";
import CasSrvMetaDataNodeForm from "./CasSrvMetaDataNodeForm";

export default function CasSrvMetaDataNodeContainerForm({
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
                <CasSrvMetaDataNodeForm
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
                <td>+-</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </td>
  );
}
