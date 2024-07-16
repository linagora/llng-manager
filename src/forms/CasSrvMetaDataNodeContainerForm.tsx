import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { NodeApi } from "react-arborist";
import { changeAppName, delApp, newApp } from "../features/config/configSlice";
import { treeFormat } from "../utils/recursTree";
import CasSrvMetaDataNodeForm from "./CasSrvMetaDataNodeForm";

export default function CasSrvMetaDataNodeContainerForm({
  node,
  dispatch,
}: {
  node: NodeApi<treeFormat>;
  dispatch: Function;
}) {
  let i = 0;
  const [genPopup, setGenPopup] = useState(false);
  const [name, setName] = useState<string>();

  return (
    <td>
      <table>
        <thead>
          <tr>
            <th>
              <IconButton className="plus" onClick={() => setGenPopup(true)}>
                <AddCircleIcon color="success" />
              </IconButton>
            </th>
          </tr>
        </thead>
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
                <td>
                  <td>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          delApp({
                            name: child.data.name || "",
                            type: "SrvCas",
                          })
                        );
                      }}
                      className="minus"
                    >
                      <RemoveCircleIcon color="error" />
                    </IconButton>
                  </td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog open={genPopup}>
        <TextField
          size="small"
          margin="normal"
          className="formInput"
          value={name}
          placeholder={t("enterName")}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => {
            dispatch(newApp({ name: name || "", type: "SrvCas" }));
            setGenPopup(false);
          }}
        >
          {t("close")}
        </Button>
      </Dialog>
    </td>
  );
}
