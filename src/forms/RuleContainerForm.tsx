import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, TextField } from "@mui/material";
import { t } from "i18next";
import { useAppDispatch } from "../app/hooks";
import {
  delLocationRule,
  newLocationRule,
  updateLocationRule,
} from "../features/config/configSlice";
import { transformJsonToList, transformListToJson } from "../utils/nativeRule";

export default function RuleContainerForm({
  value,
  appName,
}: {
  value: Record<string, string>;
  appName: string;
}) {
  let i = 0;
  const dispatch = useAppDispatch();
  return (
    <>
      <th className="title2">{t("locationRules")}</th>
      <td>
        <table id="locationRules">
          <thead>
            <tr>
              <th>{t("vhostComment")}</th>
              <th>{t("regexp")}</th>
              <th>{t("rules")}</th>
              <th>{t("rulesAuthnLevel")}</th>
              <th>
                <IconButton
                  className="plus"
                  onClick={() => dispatch(newLocationRule(appName))}
                >
                  <AddCircleIcon color="success" />
                </IconButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(value).map((group) => {
              i++;
              const [commentary, regex, authLevel] = transformJsonToList(group);
              if (regex === "default") {
                return null;
              }

              return (
                <tr key={i}>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      onChange={() =>
                        dispatch(
                          updateLocationRule({
                            appName,
                            locationRules: updateRules("locationRules"),
                          })
                        )
                      }
                      type="text"
                      value={commentary || ""}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      onChange={() =>
                        dispatch(
                          updateLocationRule({
                            appName,
                            locationRules: updateRules("locationRules"),
                          })
                        )
                      }
                      type="text"
                      value={regex || ""}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      onChange={() =>
                        dispatch(
                          updateLocationRule({
                            appName,
                            locationRules: updateRules("locationRules"),
                          })
                        )
                      }
                      type="text"
                      value={value[group] || ""}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      type="number"
                      className="authLevel"
                      onChange={() =>
                        dispatch(
                          updateLocationRule({
                            appName,
                            locationRules: updateRules("locationRules"),
                          })
                        )
                      }
                      value={authLevel || 0}
                    />
                  </td>
                  <td>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          delLocationRule({
                            name: appName,
                            key: `(?#${commentary})${regex}${
                              authLevel ? `(?#AuthnLevel=${authLevel})` : ""
                            }`,
                          })
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
            <tr>
              <th>{t("defaultRule")}</th>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={"default"}
                  disabled
                />
              </td>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  onChange={() =>
                    dispatch(
                      updateLocationRule({
                        appName,
                        locationRules: updateRules("locationRules"),
                      })
                    )
                  }
                  value={value["default"]}
                />
              </td>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="text"
                  value={"default"}
                  className="authLevel"
                  disabled
                />
              </td>
              <td>
                <IconButton
                  className="plus"
                  onClick={() => dispatch(newLocationRule(appName))}
                >
                  <AddCircleIcon color="success" />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </>
  );
}

function updateRules(tableID: string) {
  const ruleList = [];

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const comment = cells[0].querySelector("input")?.value;
      const regex = cells[1].querySelector("input")?.value;
      const rule = cells[2].querySelector("input")?.value;
      const authLevel = cells[3].querySelector("input")?.value;
      if (cells.length === 4) {
        ruleList.push({
          regex: comment ? comment : "",
          rule: regex ? regex : "",
        });
      } else {
        const inputs = {
          comment: comment ? comment : "",
          regex: regex ? regex : "",
          rule: rule ? rule : "",
          authLevel: authLevel ? authLevel : "",
        };

        ruleList.push(inputs);
      }
    }
  }
  const locationRules = transformListToJson(ruleList);
  return locationRules;
}
