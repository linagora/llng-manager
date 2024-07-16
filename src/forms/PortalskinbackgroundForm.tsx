import { FormControl, MenuItem, Select } from "@mui/material";
import { t } from "i18next";
import { updateConfigParams } from "../features/config/configSlice";
import attributes from "../static/attributes.json";
export default function PortalskinbackgroundForm({
  value,
  portal,
  dispatch,
}: {
  value: string;
  portal: string;
  dispatch: Function;
}) {
  return (
    <>
      <th>
        <span>{t("portalSkinBackground")}</span>
      </th>
      <td>
        <FormControl>
          <Select
            value={value}
            onChange={(e) =>
              dispatch(
                updateConfigParams({
                  param: "portalSkinBackground",
                  value: e.target.value,
                })
              )
            }
          >
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
