import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delModuleOpt,
  newModuleOpt,
  saveSAMLPrivIdSig,
  saveSAMLPrivSig,
  saveSAMLPubSig,
  toggleSAML,
  updateConfigParams,
  updateModuleOpt,
} from "../../features/config/configSlice";
import definitions from "../../static/definitions.json";
import { GenerateKeys } from "../../utils/generateKey";
import { handleChangeFile } from "../../utils/readFiles";
import { TableVars } from "../applicationsComponents/TableVars";
import { VisuallyHiddenInput } from "../managerComponents/VisuallyHiddenInput";
export function SAMLIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("basic");
  const handleGenerateKeys = async () => {
    try {
      const result = await GenerateKeys("RSA");

      result.hash ? dispatch(saveSAMLPrivIdSig(result.hash)) : console.log();
      dispatch(saveSAMLPrivSig(result.private));
      dispatch(saveSAMLPubSig(result.public));
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };

  return (
    <div>
      <strong className="title">{t("samlServiceMetaData")}</strong>
      <div className="optionNavbar">
        <label
          className={`option ${option === "basic" ? "selected" : ""}`}
          onClick={() => {
            setOption("basic");
          }}
        >
          {t("Basic Option")}
        </label>
        <label
          className={`option ${
            option === "samlServiceSecurity" ? "selected" : ""
          }`}
          onClick={() => setOption("samlServiceSecurity")}
        >
          {t("samlServiceSecurity")}
        </label>
        <label
          className={`option ${option === "providerOptions" ? "selected" : ""}`}
          onClick={() => setOption("providerOptions")}
        >
          {t("providerOptions")}
        </label>
        <label
          className={`option ${option === "samlAdvanced" ? "selected" : ""}`}
          onClick={() => setOption("samlAdvanced")}
        >
          {t("samlAdvanced")}
        </label>
      </div>
      <div className="appDesc">
        {option === "basic" && (
          <div className="box">
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.issuerDBSAMLActivation
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("issuerDBSAMLActivation")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={config.issuerDBSAMLActivation ? true : false}
                        onChange={() => dispatch(toggleSAML())}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label={t("off")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={<Markdown>{definitions.samlEntityID}</Markdown>}
                  >
                    <th>{t("samlEntityID")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlEntityID || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlEntityID",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("samlOrganization")}
              </AccordionSummary>

              <table>
                <tbody>
                  <tr>
                    <Tooltip
                      title={
                        <Markdown>
                          {definitions.samlOrganizationDisplayName}
                        </Markdown>
                      }
                    >
                      <th>{t("samlOrganizationDisplayName")}</th>
                    </Tooltip>
                    <td>
                      <TextField
                        size="small"
                        margin="normal"
                        variant="filled"
                        className="form"
                        value={config.samlOrganizationDisplayName || ""}
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlOrganizationDisplayName",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <Tooltip
                      title={
                        <Markdown>{definitions.samlOrganizationName}</Markdown>
                      }
                    >
                      <th>{t("samlOrganizationName")}</th>
                    </Tooltip>
                    <td>
                      <TextField
                        size="small"
                        margin="normal"
                        variant="filled"
                        className="form"
                        value={config.samlOrganizationName || ""}
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlOrganizationName",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <Tooltip
                      title={
                        <Markdown>{definitions.samlOrganizationURL}</Markdown>
                      }
                    >
                      <th>{t("samlOrganizationURL")}</th>
                    </Tooltip>
                    <td>
                      <TextField
                        size="small"
                        margin="normal"
                        variant="filled"
                        className="form"
                        value={config.samlOrganizationURL || ""}
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlOrganizationURL",
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion>
          </div>
        )}
        {option === "samlServiceSecurity" && (
          <table>
            <tbody>
              <tr>
                <th>
                  <div>{t("samlServicePrivateKeySig")}</div>
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
                            console.log("File content:", fileContent);
                            dispatch(saveSAMLPrivSig(fileContent));
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
                    value={config.samlServicePrivateKeySig}
                    onChange={(e) => dispatch(saveSAMLPrivSig(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <th> {t("samlServiceKeyIdSig")}</th>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="formInput"
                    value={config.samlServicePrivateKeySigPwd}
                    onChange={(e) =>
                      dispatch(saveSAMLPrivIdSig(e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <div>{t("samlServicePublicKeySig")}</div>
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
                            console.log("File content:", fileContent);
                            dispatch(saveSAMLPubSig(fileContent));
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
                    value={config.samlServicePublicKeySig}
                    onChange={(e) => dispatch(saveSAMLPubSig(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <Button
                    variant="outlined"
                    className="generateButton"
                    onClick={() => handleGenerateKeys()}
                  >
                    {t("newRSAKey")}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {option === "providerOptions" && (
          <>
            <Accordion expanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("samlSPSSODescriptor")}
              </AccordionSummary>

              <table>
                <tbody>
                  <tr>
                    <Tooltip
                      title={
                        <Markdown>
                          {(definitions
                            ? definitions.samlSPSSODescriptorAuthnRequestsSigned
                            : "") + ""}
                        </Markdown>
                      }
                    >
                      <th>{t("samlSPSSODescriptorAuthnRequestsSigned")}</th>
                    </Tooltip>
                    <td>
                      <FormControl>
                        <RadioGroup
                          row
                          value={config.samlSPSSODescriptorAuthnRequestsSigned}
                          onChange={(e) =>
                            dispatch(
                              updateConfigParams({
                                param: "samlSPSSODescriptorAuthnRequestsSigned",
                                value: e.target.value,
                              })
                            )
                          }
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

                  <tr>
                    <Tooltip
                      title={
                        <Markdown>
                          {(definitions
                            ? definitions.samlSPSSODescriptorWantAssertionsSigned
                            : "") + ""}
                        </Markdown>
                      }
                    >
                      <th>{t("samlSPSSODescriptorWantAssertionsSigned")}</th>
                    </Tooltip>
                    <td>
                      <FormControl>
                        <RadioGroup
                          row
                          value={config.samlSPSSODescriptorWantAssertionsSigned}
                          onChange={(e) =>
                            dispatch(
                              updateConfigParams({
                                param:
                                  "samlSPSSODescriptorWantAssertionsSigned",
                                value: e.target.value,
                              })
                            )
                          }
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
            </Accordion>
            <Accordion expanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("samlIDPSSODescriptor")}
              </AccordionSummary>

              <table>
                <tbody>
                  <tr>
                    <Tooltip
                      title={
                        <Markdown>
                          {(definitions
                            ? definitions.samlSPSSODescriptorAuthnRequestsSigned
                            : "") + ""}
                        </Markdown>
                      }
                    >
                      <th>
                        {t("samlIDPSSODescriptorWantAuthnRequestsSigned")}
                      </th>
                    </Tooltip>
                    <td>
                      <FormControl>
                        <RadioGroup
                          row
                          value={
                            config.samlIDPSSODescriptorWantAuthnRequestsSigned
                          }
                          onChange={(e) =>
                            dispatch(
                              updateConfigParams({
                                param:
                                  "samlIDPSSODescriptorWantAuthnRequestsSigned",
                                value: e.target.value,
                              })
                            )
                          }
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
            </Accordion>
          </>
        )}
        {option === "samlAdvanced" && (
          <>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>{definitions.samlOverrideIDPEntityID}</Markdown>
                    }
                  >
                    <th>{t("samlOverrideIDPEntityID")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlOverrideIDPEntityID || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlOverrideIDPEntityID",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={<Markdown>{definitions.samlStorage}</Markdown>}
                  >
                    <th>{t("samlStorage")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlStorage || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlStorage",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table id="samlStorageOptions">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() =>
                        dispatch(newModuleOpt("samlStorageOptions"))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={"samlStorageOptions"}
                vars={
                  config.samlStorageOptions ? config.samlStorageOptions : {}
                }
                tableID={"samlStorageOptions"}
                dispatch={dispatch}
                delFunction={delModuleOpt}
                updateFunction={updateModuleOpt}
              />
            </table>
          </>
        )}
      </div>
    </div>
  );
}
