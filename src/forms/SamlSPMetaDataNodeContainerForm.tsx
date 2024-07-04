import { TextField } from "@mui/material";
import { t } from "i18next";

export default function SamlSPMetaDataNodeContainerForm({
  value,
  updateFunc,
}: {
  value: Record<string, Record<string, string>>;
  updateFunc: Function;
}) {
  let i = 0;
  return (
    <td>
      <table>
        <tbody>
          {Object.keys(value).map((key) => {
            i++;
            return (
              <tr key={i}>
                <th className="title3">{t("samlSPName")}</th>
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
            );
          })}
        </tbody>
      </table>
    </td>
  );
}
