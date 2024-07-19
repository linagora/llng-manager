import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { ChangeEvent } from "react";
import {
  updateOIDCPrivateClient,
  updateOIDCPublicClient,
  updateOIDCclientID,
  updateSamlSPMetadata,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { handleChangeFile } from "../../utils/readFiles";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import "./MandatoryField.css";
import { URLLoader } from "./URLLoader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export function MandatoryFields({
  type,
  name,
}: {
  type: string;
  name?: string;
}) {
  const data = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();

  switch (type) {
    case "SPsaml":
      return (
        <div className="mandatoryField">
          <div>
            <TextField
              size="small"
              margin="normal"
              multiline
              variant="filled"
              fullWidth
              rows={4}
              placeholder="XML MetaData"
              onChange={(e) =>
                dispatch(
                  updateSamlSPMetadata({
                    name: name ? name : "",
                    data: e.target.value,
                  })
                )
              }
              value={
                (name
                  ? data.samlSPMetaDataXML
                    ? data.samlSPMetaDataXML[name]
                      ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                      : undefined
                    : undefined
                  : undefined) || ""
              }
            />
          </div>
          <div>
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
                        dispatch(
                          updateSamlSPMetadata({
                            name: name ? name : "",
                            data: fileContent,
                          })
                        );
                      }
                    );
                  }
                }}
              />
            </Button>
          </div>
          <URLLoader appName={name} loadFunction={updateSamlSPMetadata} />
        </div>
      );
    case "RPoidc":
      return (
        <div className="mandatoryField">
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcRPMetaDataOptionsClientID
                        ? definitions.oidcRPMetaDataOptionsClientID
                        : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcRPMetaDataOptionsClientID")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    type="text"
                    placeholder={t("oidcRPMetaDataOptionsClientID")}
                    value={
                      name
                        ? data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsClientID
                              ? String(
                                  data.oidcRPMetaDataOptions[name]
                                    .oidcRPMetaDataOptionsClientID
                                )
                              : ""
                            : ""
                          : ""
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateOIDCclientID({
                          name: name ? name : "",
                          id: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcRPMetaDataOptionsClientSecret
                        ? definitions.oidcRPMetaDataOptionsClientSecret
                        : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcRPMetaDataOptionsClientSecret")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    type="password"
                    placeholder={t("oidcRPMetaDataOptionsClientSecret")}
                    value={String(
                      name
                        ? data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsClientSecret
                              ? data.oidcRPMetaDataOptions[name]
                                  .oidcRPMetaDataOptionsClientSecret
                              : ""
                            : ""
                          : ""
                        : ""
                    )}
                    onChange={(e) =>
                      dispatch(
                        updateOIDCPrivateClient({
                          name: name ? name : "",
                          privateClient: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcRPMetaDataOptionsPublic}
                    </Markdown>
                  }
                >
                  <th>{t("oidcRPMetaDataOptionsPublic")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={
                        data.oidcRPMetaDataOptions === undefined
                          ? attributes.oidcRPMetaDataOptionsPublic.default
                          : data.oidcRPMetaDataOptions[name ? name : ""]
                              .oidcRPMetaDataOptionsPublic
                      }
                      onChange={(e) => {
                        dispatch(
                          updateOIDCPublicClient({
                            name: name ? name : "",
                            publicClient: Number(e.target.value),
                          })
                        );
                      }}
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
              </tr>
            </tbody>
          </table>
          <div></div>
        </div>
      );

    default:
      return <div className="mandatoryField"></div>;
  }
}
