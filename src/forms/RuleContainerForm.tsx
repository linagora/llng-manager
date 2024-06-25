import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, TextField } from "@mui/material";
import { t } from "i18next";
import { transformJsonToList } from "../utils/nativeRule";

export default function RuleContainerForm({
  value,
  updateFunc,
}: {
  value: Record<string, string>;
  updateFunc: Function;
}) {
  let i = 0;
  return (
    <div className="box">
      <th className="title2">{t("locationRules")}</th>
      <table id="locationRules">
        <thead>
          <tr>
            <th>{t("vhostComment")}</th>
            <th>{t("regexp")}</th>
            <th>{t("rules")}</th>
            <th>{t("rulesAuthnLevel")}</th>
            <th>
              <IconButton className="plus">
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
                    onChange={() => updateFunc()}
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
                    onChange={() => updateFunc()}
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
                    onChange={() => updateFunc()}
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
                    onChange={() => updateFunc()}
                    value={authLevel || 0}
                  />
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      updateFunc();
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
                onChange={() => updateFunc()}
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
              <IconButton className="plus">
                <AddCircleIcon color="success" />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
