import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { changeApplicationField } from "../features/config/configSlice";
import LongtextForm from "./LongtextForm";
import TextForm from "./TextForm";

export default function MenuAppForm({
  values,
  portal,
  catid,
  id,
  dispatch,
}: {
  values: Record<string, string | Record<string, string>>;
  portal: string;
  catid: string;
  id: string;
  dispatch: Function;
}) {
  const logoOptions = [
    "attach.png",
    "bell.png",
    "bookmark.png",
    "configure.png",
    "database.png",
    "demo.png",
    "docs.png",
    "folder.png",
    "gear.png",
    "help.png",
    "llng.png",
    "mailappt.png",
    "money.png",
    "network.png",
    "terminal.png",
    "thumbnail.png",
    "tools.png",
    "tux.png",
    "web.png",
    "wheels.png",
  ];
  const [display, setDisplay] = useState<string>("auto");
  useEffect(() => {
    setDisplay(
      (values.options as Record<string, string>).display === "on" ||
        (values.options as Record<string, string>).display === "off" ||
        (values.options as Record<string, string>).display === "auto"
        ? (values.options as Record<string, string>).display
        : "specialRule"
    );
  }, [values.options]);
  return (
    <tr>
      <td>
        <div>
          <h3>{t("application")}</h3>
        </div>
        <table>
          <tbody>
            <tr>
              <TextForm
                fieldName="name"
                value={(values.options as Record<string, string>).name}
                updateFunc={(e: string) =>
                  dispatch(
                    changeApplicationField({
                      catid,
                      id,
                      field: "name",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <LongtextForm
                fieldName="description"
                value={(values.options as Record<string, string>).description}
                updateFunc={(e: string) =>
                  dispatch(
                    changeApplicationField({
                      catid,
                      id,
                      field: "description",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="uri"
                value={(values.options as Record<string, string>).uri}
                updateFunc={(e: string) =>
                  dispatch(
                    changeApplicationField({
                      catid,
                      id,
                      field: "uri",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="tooltip"
                value={(values.options as Record<string, string>).tooltip}
                updateFunc={(e: string) =>
                  dispatch(
                    changeApplicationField({
                      catid,
                      id,
                      field: "tooltip",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <th>
                <span>{t("logo")}</span>
              </th>
              <td>
                <FormControl>
                  <Select
                    value={
                      (values.options as Record<string, string>).logo ||
                      "network.png"
                    }
                    onChange={(e) =>
                      dispatch(
                        changeApplicationField({
                          catid,
                          id,
                          field: "logo",
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    {logoOptions.map((option) => (
                      <MenuItem value={option} key={option}>
                        <img
                          src={`${portal}/static/common/apps/${option}`}
                          height="30px"
                          width="30px"
                          alt={option}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    value={(values.options as Record<string, string>).logo}
                  />
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                <span>{t("applicationDisplay")}</span>
              </th>
              <td>
                <FormControl>
                  <FormLabel>{t("applicationDisplay")}</FormLabel>
                  <RadioGroup
                    row
                    value={display}
                    onChange={(e) => {
                      dispatch(
                        changeApplicationField({
                          catid,
                          id,
                          field: "display",
                          value: e.target.value,
                        })
                      );
                      setDisplay(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={"on"}
                      control={<Radio />}
                      label={t("on")}
                    />
                    <FormControlLabel
                      value={"off"}
                      control={<Radio />}
                      label={t("off")}
                    />
                    <FormControlLabel
                      value={"auto"}
                      control={<Radio />}
                      label={t("auto")}
                    />
                    <FormControlLabel
                      value={"specialRule"}
                      control={<Radio />}
                      label={t("specialRule")}
                    />
                  </RadioGroup>
                </FormControl>
                {display === "specialRule" && (
                  <TextField
                    size="small"
                    multiline
                    variant="filled"
                    rows={4}
                    onChange={(e) =>
                      dispatch(
                        changeApplicationField({
                          catid,
                          id,
                          field: "specialRule",
                          value: e.target.value,
                        })
                      )
                    }
                    value={(values.options as Record<string, string>).display}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
