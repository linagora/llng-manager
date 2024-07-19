import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { ChangeEvent } from "react";
import { VisuallyHiddenInput } from "../components/managerComponents/VisuallyHiddenInput";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";
import { GenerateEcKeys, NewCertificate } from "../utils/generateKey";
import { handleChangeFile } from "../utils/readFiles";
export default function OidcKeyForm({
  value,
  fieldNames,
  updateFunc,
}: {
  value: Record<string, string>;
  fieldNames: Record<string, string>;
  updateFunc: Function;
}) {
  const handleGenerateKeys = async (type?: string) => {
    try {
      let result;
      switch (type) {
        case "EC":
          result = await GenerateEcKeys();
          break;
        default:
          result = await NewCertificate();
          break;
      }
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
        value: result.hash,
      });
      updateFunc({
        param: fieldNames.type,
        value: type,
      });
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>{t(fieldNames.hash)}</th>
            <td>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>{t("oidcServiceKeyTypeSig")}</InputLabel>
                <Select
                  value={value.type || "RSA"}
                  label={t("oidcServiceKeyTypeSig")}
                  onChange={(e) =>
                    updateFunc({
                      param: fieldNames.type,
                      value: e.target.value,
                    })
                  }
                >
                  {(
                    attributes[fieldNames.type as keyof typeof attributes] as {
                      type: string;
                      select: { k: string; v: string }[];
                    }
                  ).select.map((el) => {
                    return (
                      <MenuItem key={el.k} value={el.k}>
                        {t(el.v)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <Tooltip
              title={
                <Markdown>
                  {definitions[fieldNames.hash as keyof typeof definitions]
                    ? definitions[fieldNames.hash as keyof typeof definitions] +
                      ""
                    : ""}
                </Markdown>
              }
            >
              <th> {t("oidcServiceKeyIdSig")} </th>
            </Tooltip>

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
              <div>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions[fieldNames.priv as keyof typeof definitions]
                        ? definitions[
                            fieldNames.priv as keyof typeof definitions
                          ] + ""
                        : ""}
                    </Markdown>
                  }
                >
                  <span>{t("oidcServicePrivateKeySig")}</span>
                </Tooltip>
              </div>
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
                      handleChangeFile(e as ChangeEvent<HTMLInputElement>).then(
                        (fileContent) => {
                          console.debug("File content:", fileContent);
                          updateFunc({
                            param: "oidcServicePrivateKeySig",
                            value: fileContent,
                          });
                        }
                      );
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
                fullWidth
                variant="filled"
                rows={5}
                className="formInput"
                value={value.priv || ""}
                onChange={(e) =>
                  updateFunc({
                    param: "oidcServicePrivateKeySig",
                    value: e.target.value,
                  })
                }
              />
            </td>
          </tr>

          <tr>
            <th>
              <div>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServicePublicKeySig
                        ? definitions.oidcServicePublicKeySig
                        : ""}
                    </Markdown>
                  }
                >
                  <span>{t("oidcServicePublicKeySig")}</span>
                </Tooltip>
              </div>
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
                      handleChangeFile(e as ChangeEvent<HTMLInputElement>).then(
                        (fileContent) => {
                          console.debug("File content:", fileContent);
                          updateFunc({
                            param: "oidcServicePublicKeySig",
                            value: fileContent,
                          });
                        }
                      );
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
                rows={5}
                className="formInput"
                value={value.pub || ""}
                onChange={(e) =>
                  updateFunc({
                    param: "oidcServicePublicKeySig",
                    value: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button
                variant="outlined"
                className="generateButton"
                onClick={() =>
                  handleGenerateKeys(value.type ? value.type : "RSA")
                }
              >
                {t("newRSAKey")}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
