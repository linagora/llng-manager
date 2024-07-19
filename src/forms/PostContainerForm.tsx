import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch } from "../app/hooks";
import {
  delVhostPost,
  newVhostPost,
  updateVhostPost,
} from "../features/config/configSlice";
import definitions from "../static/definitions.json";

export default function PostContainerForm({
  value,
  appName,
}: {
  value: Record<string, Record<string, string>>;
  appName: string;
}) {
  let i = 0;
  const dispatch = useAppDispatch();
  return (
    <>
      <th className="title2">{t("post")}</th>
      <td>
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
                <IconButton
                  className="plus"
                  onClick={() => dispatch(newVhostPost(appName))}
                >
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
                      onChange={() =>
                        dispatch(
                          updateVhostPost({
                            appName,
                            post: updatePost("post"),
                          })
                        )
                      }
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
                      onChange={() =>
                        dispatch(
                          updateVhostPost({
                            appName,
                            post: updatePost("post"),
                          })
                        )
                      }
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
                      onChange={() =>
                        dispatch(
                          updateVhostPost({
                            appName,
                            post: updatePost("post"),
                          })
                        )
                      }
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
                      onChange={() =>
                        dispatch(
                          updateVhostPost({
                            appName,
                            post: updatePost("post"),
                          })
                        )
                      }
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
                      onChange={() =>
                        dispatch(
                          updateVhostPost({
                            appName,
                            post: updatePost("post"),
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    <IconButton
                      className="minus"
                      onClick={() =>
                        dispatch(delVhostPost({ name: appName, key: link }))
                      }
                    >
                      <RemoveCircleIcon color="error" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <IconButton
          className="plus"
          onClick={() => dispatch(newVhostPost(appName))}
        >
          <AddCircleIcon color="success" />
        </IconButton>
      </td>
    </>
  );
}

function updatePost(tableID: string) {
  const post: Record<string, Record<string, string>> = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const url = cells[0].querySelector("input")?.value;
      const target = cells[1].querySelector("input")?.value;
      const jqueryUrl = cells[2].querySelector("input")?.value;
      const formSelector = cells[3].querySelector("input")?.value;
      const buttonSelector = cells[4].querySelector("input")?.value;

      if (url) {
        post[url] = {
          buttonSelector: buttonSelector ? buttonSelector : "",
          formSelector: formSelector ? formSelector : "",
          jqueryUrl: jqueryUrl ? jqueryUrl : "",
          target: target ? target : "",
        };
      }
    }
  }
  return post;
}
