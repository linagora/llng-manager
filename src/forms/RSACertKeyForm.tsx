import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Dialog, TextField } from "@mui/material";
import { t } from "i18next";
import { ChangeEvent, useState } from "react";
import { VisuallyHiddenInput } from "../components/managerComponents/VisuallyHiddenInput";
import { NewCertificate } from "../utils/generateKey";
import { handleChangeFile } from "../utils/readFiles";

export default function RSACertKeyForm({
  value,
  fieldNames,
  updateFunc,
}: {
  value: Record<string, string>;
  fieldNames: Record<string, string>;
  updateFunc: Function;
}) {
  const [genPopup, setGenPopup] = useState(false);
  const [password, setPassword] = useState<string>();
  const handleGenerateKeys = async (password?: string) => {
    try {
      const result = await NewCertificate(password);
      updateFunc({
        param: fieldNames.pub,
        value: result.public,
      });
      updateFunc({
        param: fieldNames.priv,
        value: result.private,
      });
      updateFunc({
        param: fieldNames.hash,
        value: password,
      });
      setPassword("");
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };
  return (
    <>
      <td>
        <table>
          <tbody>
            <tr>
              <th>
                <div>{t(fieldNames.priv)}</div>
                <Button
                  sx={{ margin: "5px" }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {t("upload")}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      if (e.target instanceof HTMLInputElement) {
                        handleChangeFile(
                          e as ChangeEvent<HTMLInputElement>
                        ).then((fileContent) => {
                          console.debug("File content:", fileContent);
                          updateFunc({
                            param: fieldNames.priv,
                            value: fileContent,
                          });
                        });
                      }
                    }}
                  />
                </Button>
              </th>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  multiline
                  variant="filled"
                  fullWidth
                  rows={4}
                  className="formInput"
                  value={value.priv || ""}
                  onChange={(e) =>
                    updateFunc({
                      param: fieldNames.priv,
                      value: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th> {t(fieldNames.hash)}</th>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="formInput"
                  value={value.hash || ""}
                  onChange={(e) =>
                    updateFunc({
                      param: fieldNames.hash,
                      value: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>
                <div>{t(fieldNames.pub)}</div>
                <Button
                  sx={{ margin: "5px" }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  {t("upload")}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      if (e.target instanceof HTMLInputElement) {
                        handleChangeFile(
                          e as ChangeEvent<HTMLInputElement>
                        ).then((fileContent) => {
                          console.debug("File content:", fileContent);
                          updateFunc({
                            param: fieldNames.pub,
                            value: fileContent,
                          });
                        });
                      }
                    }}
                  />
                </Button>
              </th>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  multiline
                  variant="filled"
                  rows={4}
                  className="formInput"
                  value={value.pub || ""}
                  onChange={(e) =>
                    updateFunc({
                      param: fieldNames.pub,
                      value: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th></th>
              <td>
                <Button
                  variant="outlined"
                  className="generateButton"
                  onClick={() => setGenPopup(true)}
                >
                  {t("newRSAKey")}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <Dialog open={genPopup}>
        <TextField
          size="small"
          margin="normal"
          className="formInput"
          value={password}
          placeholder={t("enterPassword")}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => {
            handleGenerateKeys(password);
            setGenPopup(false);
          }}
        >
          {t("close")}
        </Button>
      </Dialog>
    </>
  );
}
