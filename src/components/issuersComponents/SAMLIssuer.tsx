import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
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
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { exportData } from "../../utils/exportData";
import { NewCertificate } from "../../utils/generateKey";
import { handleChangeFile } from "../../utils/readFiles";
import { TableVars } from "../applicationsComponents/TableVars";
import { VisuallyHiddenInput } from "../managerComponents/VisuallyHiddenInput";
import "../applicationsComponents/AppPage.css";
import BoolForm from "../../forms/BoolForm";
import TextForm from "../../forms/TextForm";
export function SAMLIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("basic");
  const handleGenerateKeys = async () => {
    try {
      const result = await NewCertificate();

      dispatch(saveSAMLPrivSig(result.private));
      dispatch(saveSAMLPubSig(result.public));
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };

  return (
    <div>
      <div className="top">
        <strong className="title">
          {t("samlServiceMetaData")}
          <IconButton
            size="large"
            color="secondary"
            onClick={async () =>
              await exportData(
                "samlMetadata",
                config.cfgNum ? config.cfgNum : 1
              )
            }
          >
            <DownloadIcon />
          </IconButton>
        </strong>
      </div>
      <div className="app">
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
            className={`option ${
              option === "providerOptions" ? "selected" : ""
            }`}
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
        <Divider className="divider" orientation="vertical" variant="middle" />
        <div className="appDesc">
          {option === "basic" && (
            <div className="box">
              <table>
                <tbody>
                  <tr>
                    <BoolForm
                      fieldName="issuerDBSAMLActivation"
                      value={Number(
                        config.issuerDBSAMLActivation ||
                          attributes.issuerDBSAMLActivation.default
                      )}
                      updateFunc={() => dispatch(toggleSAML())}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      fieldName="samlEntityID"
                      value={config.samlEntityID || ""}
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlEntityID",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          {t("samlOrganization")}
                        </AccordionSummary>

                        <table>
                          <tbody>
                            <tr>
                              <TextForm
                                fieldName="samlOrganizationDisplayName"
                                value={String(
                                  config.samlOrganizationDisplayName || ""
                                )}
                                updateFunc={(e: string) =>
                                  dispatch(
                                    updateConfigParams({
                                      param: "samlOrganizationDisplayName",
                                      value: e,
                                    })
                                  )
                                }
                              />
                            </tr>
                            <tr>
                              <TextForm
                                fieldName="samlOrganizationName"
                                value={config.samlOrganizationName || ""}
                                updateFunc={(e: string) =>
                                  dispatch(
                                    updateConfigParams({
                                      param: "samlOrganizationName",
                                      value: e,
                                    })
                                  )
                                }
                              />
                            </tr>
                            <tr>
                              <TextForm
                                fieldName="samlOrganizationURL"
                                value={config.samlOrganizationURL || ""}
                                updateFunc={(e: string) =>
                                  dispatch(
                                    updateConfigParams({
                                      param: "samlOrganizationURL",
                                      value: e,
                                    })
                                  )
                                }
                              />
                            </tr>
                          </tbody>
                        </table>
                      </Accordion>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                              console.debug("File content:", fileContent);
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
                      fullWidth
                      rows={4}
                      className="formInput"
                      value={
                        config.samlServicePrivateKeySig ||
                        attributes.samlServicePrivateKeySig.default
                      }
                      onChange={(e) =>
                        dispatch(saveSAMLPrivSig(e.target.value))
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <TextForm
                    fieldName="samlServiceKeyIdSig"
                    value={
                      config.samlServicePrivateKeySigPwd ||
                      attributes.samlServicePrivateKeySigPwd.default
                    }
                    updateFunc={(e: string) => dispatch(saveSAMLPrivIdSig(e))}
                  />
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
                              console.debug("File content:", fileContent);
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
                      fullWidth
                      rows={4}
                      className="formInput"
                      value={
                        config.samlServicePublicKeySig ||
                        attributes.samlServicePublicKeySig.default
                      }
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
                      <BoolForm
                        fieldName="samlSPSSODescriptorAuthnRequestsSigned"
                        value={Number(
                          config.samlSPSSODescriptorAuthnRequestsSigned ||
                            attributes.samlSPSSODescriptorAuthnRequestsSigned
                              .default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlSPSSODescriptorAuthnRequestsSigned",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                    <tr>
                      <BoolForm
                        fieldName="samlSPSSODescriptorWantAssertionsSigned"
                        value={Number(
                          config.samlSPSSODescriptorWantAssertionsSigned ||
                            attributes.samlSPSSODescriptorWantAssertionsSigned
                              .default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlSPSSODescriptorWantAssertionsSigned",
                              value: e,
                            })
                          )
                        }
                      />
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
                      <BoolForm
                        fieldName="samlSPSSODescriptorAuthnRequestsSigned"
                        value={Number(
                          config.samlSPSSODescriptorAuthnRequestsSigned ||
                            attributes.samlSPSSODescriptorAuthnRequestsSigned
                              .default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlSPSSODescriptorAuthnRequestsSigned",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                  </tbody>
                </table>
              </Accordion>
            </>
          )}
          {option === "samlAdvanced" && (
            <>
              <table className="box">
                <tbody>
                  <tr>
                    <TextForm
                      fieldName="samlOverrideIDPEntityID"
                      value={
                        config.samlOverrideIDPEntityID ||
                        attributes.samlOverrideIDPEntityID.default
                      }
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlOverrideIDPEntityID",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <TextForm
                      fieldName="samlStorage"
                      value={config.samlStorage || ""}
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlStorage",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <th> {t("samlStorageOptions")}</th>
                    <td>
                      <table className="box" id="samlStorageOptions">
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
                            config.samlStorageOptions
                              ? config.samlStorageOptions
                              : {}
                          }
                          tableID={"samlStorageOptions"}
                          dispatch={dispatch}
                          delFunction={delModuleOpt}
                          updateFunction={updateModuleOpt}
                        />
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
