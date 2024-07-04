import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function SamlAttributeContainerForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: Record<string, string>;
  fieldName: string;
  updateFunc: Function;
}) {
  let i = 0;
  return (
    <>
      <th className="title2">{t(fieldName)}</th>
      <td>
        {" "}
        <table id="exportedAttribute">
          <thead>
            <tr>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("variableName")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("attributeName")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("friendlyName")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("mandatory")}</th>
              </Tooltip>
              <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
                <th>{t("format")}</th>
              </Tooltip>
              <th>
                <Button
                  onClick={() => updateFunc()}
                  color="success"
                  startIcon={<AddCircleIcon />}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(value).map((key) => {
              const [mandatory, name, format, friendlyName] =
                value[key].split(";");
              i++;
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
                      value={key}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      onChange={() => () => updateFunc()}
                      type="text"
                      value={name}
                    />
                  </td>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      onChange={() => () => updateFunc()}
                      type="text"
                      value={friendlyName}
                    />
                  </td>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={mandatory}
                        onChange={() => () => updateFunc()}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                  <td>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel shrink>{t("format")}</InputLabel>
                      <Select
                        value={format}
                        label={t("format")}
                        displayEmpty
                        onChange={() => updateFunc()}
                      >
                        {attributes.samlSPMetaDataExportedAttributes.select.map(
                          (el) => {
                            return (
                              <MenuItem key={el.k} value={el.k}>
                                {t(el.v)}
                              </MenuItem>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>
                  </td>

                  <td>
                    <IconButton onClick={() => updateFunc()} className="minus">
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
