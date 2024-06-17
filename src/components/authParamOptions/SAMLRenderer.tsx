import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";

export function SAMLRenderer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title2">{t("SAMLParams")}</strong>
      <div className="appDesc">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlNameIDFormatMap")}
          </AccordionSummary>

          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions
                        ? definitions.samlNameIDFormatMapEmail
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlNameIDFormatMapEmail")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={
                      config.samlNameIDFormatMapEmail
                        ? config.samlNameIDFormatMapEmail
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlNameIDFormatMapEmail",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlNameIDFormatMapX509
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlNameIDFormatMapX509")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={
                      config.samlNameIDFormatMapX509
                        ? config.samlNameIDFormatMapX509
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlNameIDFormatMapX509",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlNameIDFormatMapWindows
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlNameIDFormatMapWindows")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={
                      config.samlNameIDFormatMapWindows
                        ? config.samlNameIDFormatMapWindows
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlNameIDFormatMapWindows",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlNameIDFormatMapKerberos
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlNameIDFormatMapKerberos")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={
                      config.samlNameIDFormatMapKerberos
                        ? config.samlNameIDFormatMapKerberos
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlNameIDFormatMapKerberos",
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlAuthnContextMap")}
          </AccordionSummary>

          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions
                        ? definitions.samlAuthnContextMapPassword
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlAuthnContextMapPassword")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="number"
                    value={
                      config.samlAuthnContextMapPassword
                        ? config.samlAuthnContextMapPassword
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlAuthnContextMapPassword",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlAuthnContextMapPasswordProtectedTransport
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlAuthnContextMapPasswordProtectedTransport")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="number"
                    value={
                      config.samlAuthnContextMapPasswordProtectedTransport
                        ? config.samlAuthnContextMapPasswordProtectedTransport
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param:
                            "samlAuthnContextMapPasswordProtectedTransport",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlAuthnContextMapKerberos
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlAuthnContextMapKerberos")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="number"
                    value={
                      config.samlAuthnContextMapKerberos
                        ? config.samlAuthnContextMapKerberos
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlAuthnContextMapKerberos",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlAuthnContextMapTLSClient
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlAuthnContextMapTLSClient")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="number"
                    value={
                      config.samlAuthnContextMapTLSClient
                        ? config.samlAuthnContextMapTLSClient
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlAuthnContextMapTLSClient",
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlSPSSODescriptor")}
          </AccordionSummary>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlSPSSODescriptorSingleLogoutService")}
            </AccordionSummary>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlSPSSODescriptorSingleLogoutServiceHTTPRedirect")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                          ";"
                        )[1]
                          ? config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                              ";"
                            )[1]
                          : ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorSingleLogoutServiceHTTPRedirect",
                            value: [
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorSingleLogoutServiceHTTPRedirect",
                            value: [
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[0],
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlSPSSODescriptorSingleLogoutServiceHTTPPost
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlSPSSODescriptorSingleLogoutServiceHTTPPost")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorSingleLogoutServiceHTTPPost",
                            value: [
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorSingleLogoutServiceHTTPPost",
                            value: [
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[0],
                              config.samlSPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlSPSSODescriptorSingleLogoutServiceSOAP
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlSPSSODescriptorSingleLogoutServiceSOAP")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorSingleLogoutServiceSOAP?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlSPSSODescriptorSingleLogoutServiceSOAP",
                            value: [
                              config.samlSPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlSPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorSingleLogoutServiceSOAP?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlSPSSODescriptorSingleLogoutServiceSOAP",
                            value: [
                              config.samlSPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[0],
                              config.samlSPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlSPSSODescriptorAssertionConsumerService")}
            </AccordionSummary>

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t(
                        "samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact"
                      )}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("default")}</th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                            ";"
                          )[0] || 0
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param:
                                "samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact",
                              value: [
                                e.target.value,
                                1 - Number(e.target.value),
                                config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                  ";"
                                )[2],
                                config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                  ";"
                                )[3],
                              ].join(";"),
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
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                          ";"
                        )[3] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact",
                            value: [
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                ";"
                              )[0],
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                ";"
                              )[1],
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                ";"
                              )[2],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlSPSSODescriptorAssertionConsumerServiceHTTPPost
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlSPSSODescriptorAssertionConsumerServiceHTTPPost")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("default")}</th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlSPSSODescriptorAssertionConsumerServiceHTTPPost?.split(
                            ";"
                          )[0] || 0
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param:
                                "samlSPSSODescriptorAssertionConsumerServiceHTTPPost",
                              value: [
                                e.target.value,
                                1 - Number(e.target.value),
                                config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                  ";"
                                )[2],
                                config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                  ";"
                                )[3],
                              ].join(";"),
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
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorAssertionConsumerServiceHTTPPost?.split(
                          ";"
                        )[3] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorAssertionConsumerServiceHTTPPost",
                            value: [
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPPost?.split(
                                ";"
                              )[0],
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPPost?.split(
                                ";"
                              )[1],
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPPost?.split(
                                ";"
                              )[2],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlSPSSODescriptorArtifactResolutionService")}
            </AccordionSummary>

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlSPSSODescriptorArtifactResolutionServiceArtifact
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t(
                        "samlSPSSODescriptorArtifactResolutionServiceArtifact"
                      )}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("default")}</th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlSPSSODescriptorArtifactResolutionServiceArtifact?.split(
                            ";"
                          )[0] || 0
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param:
                                "samlSPSSODescriptorArtifactResolutionServiceArtifact",
                              value: [
                                e.target.value,
                                1 - Number(e.target.value),
                                config.samlSPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                  ";"
                                )[2],
                                config.samlSPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                  ";"
                                )[3],
                              ].join(";"),
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
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                          ";"
                        )[3] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact",
                            value: [
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                ";"
                              )[0],
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                ";"
                              )[1],
                              config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?.split(
                                ";"
                              )[2],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlIDPSSODescriptor")}
          </AccordionSummary>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlIDPSSODescriptorSingleSignOnService")}
            </AccordionSummary>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect",
                            value: [
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect",
                            value: [
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorSingleSignOnServiceHTTPPost
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlIDPSSODescriptorSingleSignOnServiceHTTPPost")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleSignOnServiceHTTPPost",
                            value: [
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleSignOnServiceHTTPPost",
                            value: [
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact",
                            value: [
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact",
                            value: [
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlIDPSSODescriptorSingleLogoutService")}
            </AccordionSummary>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect",
                            value: [
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>

                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect",
                            value: [
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorSingleLogoutServiceHTTPPost
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlIDPSSODescriptorSingleLogoutServiceHTTPPost")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleLogoutServiceHTTPPost",
                            value: [
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleLogoutServiceHTTPPost",
                            value: [
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorSingleLogoutServiceSOAP
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t("samlIDPSSODescriptorSingleLogoutServiceSOAP")}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleLogoutServiceSOAP?.split(
                          ";"
                        )[1] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleLogoutServiceSOAP",
                            value: [
                              config.samlIDPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[0],
                              e.target.value,
                              config.samlIDPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[2],
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("returnUrl")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorSingleLogoutServiceSOAP?.split(
                          ";"
                        )[2] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorSingleLogoutServiceSOAP",
                            value: [
                              config.samlIDPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorSingleLogoutServiceSOAP?.split(
                                ";"
                              )[1],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlIDPSSODescriptorArtifactResolutionService")}
            </AccordionSummary>

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlIDPSSODescriptorArtifactResolutionServiceArtifact
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th colSpan={2}>
                      {t(
                        "samlIDPSSODescriptorArtifactResolutionServiceArtifact"
                      )}
                    </th>
                  </Tooltip>
                </tr>
                <tr>
                  <th>{t("default")}</th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                            ";"
                          )[0] || 0
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param:
                                "samlIDPSSODescriptorArtifactResolutionServiceArtifact",
                              value: [
                                e.target.value,
                                1 - Number(e.target.value),
                                config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                  ";"
                                )[2],
                                config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                  ";"
                                )[3],
                              ].join(";"),
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
                  <th>{t("url")}</th>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={
                        config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                          ";"
                        )[3] || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param:
                              "samlIDPSSODescriptorArtifactResolutionServiceArtifact",
                            value: [
                              config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                ";"
                              )[0],
                              config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                ";"
                              )[1],
                              config.samlIDPSSODescriptorArtifactResolutionServiceArtifact?.split(
                                ";"
                              )[2],
                              e.target.value,
                            ].join(";"),
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlAttributeAuthorityDescriptor")}
          </AccordionSummary>

          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions
                        ? definitions.samlAttributeAuthorityDescriptorAttributeServiceSOAP
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th colSpan={2}>
                    {t("samlAttributeAuthorityDescriptorAttributeService")} :
                    {t("samlAttributeAuthorityDescriptorAttributeServiceSOAP")}
                  </th>
                </Tooltip>
              </tr>
              <tr>
                <th>{t("url")}</th>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={
                      config.samlAttributeAuthorityDescriptorAttributeServiceSOAP?.split(
                        ";"
                      )[1] || ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param:
                            "samlAttributeAuthorityDescriptorAttributeServiceSOAP",
                          value: [
                            config.samlAttributeAuthorityDescriptorAttributeServiceSOAP?.split(
                              ";"
                            )[0],
                            e.target.value,
                            config.samlAttributeAuthorityDescriptorAttributeServiceSOAP?.split(
                              ";"
                            )[2],
                          ].join(";"),
                        })
                      )
                    }
                  />
                </td>
              </tr>

              <tr>
                <th>{t("returnUrl")}</th>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={
                      config.samlAttributeAuthorityDescriptorAttributeServiceSOAP?.split(
                        ";"
                      )[2] || ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param:
                            "samlAttributeAuthorityDescriptorAttributeServiceSOAP",
                          value: [
                            config.samlAttributeAuthorityDescriptorAttributeServiceSOAP?.split(
                              ";"
                            )[0],
                            config.samlAttributeAuthorityDescriptorAttributeServiceSOAP?.split(
                              ";"
                            )[1],
                            e.target.value,
                          ].join(";"),
                        })
                      )
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlAdvanced")}
          </AccordionSummary>
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions ? definitions.samlMetadataForceUTF8 : "") +
                        ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlMetadataForceUTF8")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={
                        config.samlMetadataForceUTF8 ||
                        attributes.samlMetadataForceUTF8.default
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlMetadataForceUTF8",
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
                      {(definitions ? definitions.samlRelayStateTimeout : "") +
                        ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlRelayStateTimeout")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    type="number"
                    className="form"
                    value={
                      config.samlRelayStateTimeout ||
                      attributes.samlRelayStateTimeout.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlRelayStateTimeout",
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
                    <Markdown>
                      {(definitions
                        ? definitions.samlUseQueryStringSpecific
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlUseQueryStringSpecific")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={
                        config.samlUseQueryStringSpecific ||
                        attributes.samlUseQueryStringSpecific.default
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlUseQueryStringSpecific",
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
                      {(definitions ? definitions.samlFederationFiles : "") +
                        ""}
                    </Markdown>
                  }
                >
                  <th>{t("samlFederationFiles")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    value={config.samlFederationFiles || ""}
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlFederationFiles",
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
              {t("samlAttributeAuthorityDescriptor")}
            </AccordionSummary>

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.samlCommonDomainCookieActivation
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("samlCommonDomainCookieActivation")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlCommonDomainCookieActivation ||
                          attributes.samlCommonDomainCookieActivation.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlCommonDomainCookieActivation",
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
                          ? definitions.samlCommonDomainCookieDomain
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("samlCommonDomainCookieDomain")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlCommonDomainCookieDomain || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlCommonDomainCookieDomain",
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
                      <Markdown>
                        {(definitions
                          ? definitions.samlCommonDomainCookieReader
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("samlCommonDomainCookieReader")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlCommonDomainCookieReader || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlCommonDomainCookieReader",
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
                      <Markdown>
                        {(definitions
                          ? definitions.samlCommonDomainCookieWriter
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("samlCommonDomainCookieWriter")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlCommonDomainCookieWriter || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlCommonDomainCookieWriter",
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
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlDiscoveryProtocol")}
            </AccordionSummary>

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.samlDiscoveryProtocolActivation}
                      </Markdown>
                    }
                  >
                    <th>{t("samlDiscoveryProtocolActivation")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlDiscoveryProtocolActivation ||
                          attributes.samlDiscoveryProtocolActivation.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlDiscoveryProtocolActivation",
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
                        {definitions.samlDiscoveryProtocolURL}
                      </Markdown>
                    }
                  >
                    <th>{t("samlDiscoveryProtocolURL")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlDiscoveryProtocolURL || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlDiscoveryProtocolURL",
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
                      <Markdown>
                        {definitions.samlDiscoveryProtocolPolicy}
                      </Markdown>
                    }
                  >
                    <th>{t("samlDiscoveryProtocolPolicy")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.samlDiscoveryProtocolPolicy || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "samlDiscoveryProtocolPolicy",
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
                      <Markdown>
                        {definitions.samlDiscoveryProtocolIsPassive}
                      </Markdown>
                    }
                  >
                    <th>{t("samlDiscoveryProtocolIsPassive")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.samlDiscoveryProtocolIsPassive ||
                          attributes.samlDiscoveryProtocolIsPassive.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "samlDiscoveryProtocolIsPassive",
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
        </Accordion>
      </div>
    </div>
  );
}
