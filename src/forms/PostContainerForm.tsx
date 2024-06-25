import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import definitions from "../static/definitions.json";

export default function PostContainerForm({
  value,
  updateFunc,
}: {
  value: Record<string, Record<string, string>>;
  updateFunc: Function;
}) {
  let i = 0;
  return (
    <>
      <th className="title2">{t("post")}</th>

      <table id="post">
        <thead>
          <tr>
            <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
              <th>{t("postUrl")}</th>
            </Tooltip>
            <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
              <th>{t("postTargetUrl")}</th>
            </Tooltip>
            <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
              <th>{t("jqueryUrl")}</th>
            </Tooltip>
            <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
              <th>{t("jqueryFormSelector")}</th>
            </Tooltip>
            <Tooltip title={<Markdown>{definitions.test}</Markdown>}>
              <th>{t("jqueryButtonSelector")}</th>
            </Tooltip>
            <th>
              <IconButton className="plus">
                <AddCircleIcon color="success" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(value).map((link) => {
            i++;
            return (
              <tr key={i}>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={link}
                    onChange={() => updateFunc()}
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={value[link].target}
                    onChange={() => updateFunc()}
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={value[link].jqueryUrl}
                    onChange={() => updateFunc()}
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={value[link].formSelector}
                    onChange={() => updateFunc()}
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={value[link].buttonSelector}
                    onChange={() => updateFunc()}
                  />
                </td>
                <td>
                  <IconButton className="minus">
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <IconButton className="plus">
        <AddCircleIcon color="success" />
      </IconButton>
    </>
  );
}
