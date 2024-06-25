import { TextField } from "@mui/material";
import { t } from "i18next";

export default function VirtualHostContainerForm({
  value,
  updateFunc,
}: {
  value: Record<string, Record<string, string>>;
  updateFunc: Function;
}) {
  return (
    <td>
      <table>
        <tbody>
          {Object.keys(value).map((key) => (
            <tr>
              <th>
                <th className="title3">{t("vHostName")}</th>
              </th>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) => updateFunc(e.target.value)}
                  placeholder={t("samlSPName")}
                  value={key || ""}
                />
              </td>
              <td>+-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  );
}
