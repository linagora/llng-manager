import { TextField } from "@mui/material";
import { t } from "i18next";

export default function SamlIDPMetaDataNodeForm({
  value,
  updateFunc,
}: {
  value: string;
  updateFunc: Function;
}) {
  return (
    <>
      <th >{t("samlIDPName")}</th>
      <td>
        <TextField
          size="small"
          type="text"
          onChange={(e) => updateFunc({ name: value, newName: e.target.value })}
          placeholder={t("samlIDPName")}
          value={value || ""}
        />
      </td>
    </>
  );
}
