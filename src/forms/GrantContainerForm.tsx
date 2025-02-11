import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import {
  delModuleOpt,
  newModuleOpt,
  updateModuleOpt,
} from "../features/config/configSlice";
import definitions from "../static/definitions.json";

function updateGrant(tableID: string) {
  const headerList: Record<string, string> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const comment = cells[0].querySelector("input")?.value;
      const rule = cells[1].querySelector("input")?.value;
      const message = cells[2].querySelector("input")?.value;
      headerList[`${message || ""}##${comment || ""}`] = rule || "";
    }
  }
  return headerList;
}

export default function GrantContainerForm({
  value,
  fieldName,
  dispatch,
}: {
  value: Record<string, string>;
  fieldName: string;
  dispatch: Function;
}) {
  return (
    <>
      <Tooltip
        title={
          <Markdown>
            {(definitions[fieldName as keyof typeof definitions]
              ? definitions[fieldName as keyof typeof definitions]
              : "") + ""}
          </Markdown>
        }
      >
        <th >{t(fieldName)}</th>
      </Tooltip>
      <td>
        <table id="grantTable">
          <thead>
            <tr>
              <th>{t("comments")}</th>
              <th>{t("rules")}</th>
              <th>{t("messages")}</th>
              <th>
                <IconButton
                  className="plus"
                  onClick={() => dispatch(newModuleOpt("grantSessionRules"))}
                >
                  <AddCircleIcon color="success" />
                </IconButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(value).map((key) => {
              const [message, comments] = key.split("##");
              return (
                <tr>
                  <td>
                    <TextField
                      size="small"
                      type="text"
                      onChange={(e) =>
                        dispatch(
                          updateModuleOpt({
                            name: "grantSessionRules",
                            data: updateGrant("grantTable"),
                          })
                        )
                      }
                      value={comments || ""}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      type="text"
                      onChange={(e) =>
                        dispatch(
                          updateModuleOpt({
                            name: "grantSessionRules",
                            data: updateGrant("grantTable"),
                          })
                        )
                      }
                      value={value[key] || ""}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      type="text"
                      onChange={(e) =>
                        dispatch(
                          updateModuleOpt({
                            name: "grantSessionRules",
                            data: updateGrant("grantTable"),
                          })
                        )
                      }
                      value={message || ""}
                    />
                  </td>
                  <td>
                    <IconButton
                      className="minus"
                      onClick={() =>
                        dispatch(
                          delModuleOpt({ name: "grantSessionRules", key })
                        )
                      }
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
    </>
  );
}
