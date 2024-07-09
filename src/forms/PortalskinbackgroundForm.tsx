import { FormControl, MenuItem, Select } from "@mui/material";
import { t } from "i18next";
import attributes from "../static/attributes.json";
export default function PortalskinbackgroundForm({
  value,
  portal,
}: {
  value: string;
  portal: string;
}) {
  return (
    <>
      <th>
        <span>{t("portalSkinBackground")}</span>
      </th>
      <td>
        <FormControl>
          <Select value={value} onChange={console.log}>
            {attributes.portalSkinBackground.select.map((option) => (
              <MenuItem value={option.k} key={option.k}>
                {option.v}
              </MenuItem>
            ))}
          </Select>
          <img
            src={`${portal}/static/common/backgrounds/${value}`}
            width="250px"
            alt={value}
          />
        </FormControl>
      </td>
    </>
  );
}
