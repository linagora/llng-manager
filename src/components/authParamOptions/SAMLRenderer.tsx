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
import SamlAssertionForm from "../../forms/SamlAssertionForm";
import SamlServiceForm from "../../forms/SamlServiceForm";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { llngConfig } from "../../utils/types";
import TextForm from "../../forms/TextForm";

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
                <TextForm
                  fieldName="samlNameIDFormatMapEmail"
                  value={
                    config.samlNameIDFormatMapEmail
                      ? config.samlNameIDFormatMapEmail
                      : ""
                  }
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlNameIDFormatMapEmail",
                        value: e,
                      })
                    )
                  }
                />
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
            <SamlServiceForm
              value={
                config.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect ||
                attributes.samlSPSSODescriptorSingleLogoutServiceHTTPRedirect
                  .default
              }
              fieldName={"samlSPSSODescriptorSingleLogoutServiceHTTPRedirect"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
            <SamlServiceForm
              value={
                config.samlSPSSODescriptorSingleLogoutServiceHTTPPost ||
                attributes.samlSPSSODescriptorSingleLogoutServiceHTTPPost
                  .default
              }
              fieldName={"samlSPSSODescriptorSingleLogoutServiceHTTPPost"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
            <SamlServiceForm
              value={
                config.samlSPSSODescriptorSingleLogoutServiceSOAP ||
                attributes.samlSPSSODescriptorSingleLogoutServiceSOAP.default
              }
              fieldName={"samlSPSSODescriptorSingleLogoutServiceSOAP"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlSPSSODescriptorAssertionConsumerService")}
            </AccordionSummary>

            <SamlAssertionForm
              value={
                config.samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact ||
                attributes
                  .samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact
                  .default
              }
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
              fieldName="samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact"
            />
            <SamlAssertionForm
              value={
                config.samlSPSSODescriptorAssertionConsumerServiceHTTPPost ||
                attributes.samlSPSSODescriptorAssertionConsumerServiceHTTPPost
                  .default
              }
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
              fieldName="samlSPSSODescriptorAssertionConsumerServiceHTTPPost"
            />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlSPSSODescriptorArtifactResolutionService")}
            </AccordionSummary>
            <SamlAssertionForm
              value={
                config.samlSPSSODescriptorArtifactResolutionServiceArtifact ||
                attributes.samlSPSSODescriptorArtifactResolutionServiceArtifact
                  .default
              }
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
              fieldName="samlSPSSODescriptorArtifactResolutionServiceArtifact"
            />
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
            <SamlServiceForm
              value={
                config.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect ||
                attributes.samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect
                  .default
              }
              fieldName={"samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
            <SamlServiceForm
              value={
                config.samlIDPSSODescriptorSingleSignOnServiceHTTPPost ||
                attributes.samlIDPSSODescriptorSingleSignOnServiceHTTPPost
                  .default
              }
              fieldName={"samlIDPSSODescriptorSingleSignOnServiceHTTPPost"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
            <SamlServiceForm
              value={
                config.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact ||
                attributes.samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact
                  .default
              }
              fieldName={"samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlIDPSSODescriptorSingleLogoutService")}
            </AccordionSummary>
            <SamlServiceForm
              value={
                config.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect ||
                attributes.samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect
                  .default
              }
              fieldName={"samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
            <SamlServiceForm
              value={
                config.samlIDPSSODescriptorSingleLogoutServiceHTTPPost ||
                attributes.samlIDPSSODescriptorSingleLogoutServiceHTTPPost
                  .default
              }
              fieldName={"samlIDPSSODescriptorSingleLogoutServiceHTTPPost"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
            <SamlServiceForm
              value={
                config.samlIDPSSODescriptorSingleLogoutServiceSOAP ||
                attributes.samlIDPSSODescriptorSingleLogoutServiceSOAP.default
              }
              fieldName={"samlIDPSSODescriptorSingleLogoutServiceSOAP"}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("samlIDPSSODescriptorArtifactResolutionService")}
            </AccordionSummary>
            <SamlAssertionForm
              value={
                config.samlIDPSSODescriptorArtifactResolutionServiceArtifact ||
                attributes.samlIDPSSODescriptorArtifactResolutionServiceArtifact
                  .default
              }
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
              fieldName="samlIDPSSODescriptorArtifactResolutionServiceArtifact"
            />
          </Accordion>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {t("samlAttributeAuthorityDescriptor")}
          </AccordionSummary>
          <SamlServiceForm
            value={
              config.samlAttributeAuthorityDescriptorAttributeServiceSOAP ||
              attributes.samlAttributeAuthorityDescriptorAttributeServiceSOAP
                .default
            }
            fieldName={"samlAttributeAuthorityDescriptorAttributeServiceSOAP"}
            updateFunc={<K extends keyof llngConfig>(e: {
              param: K;
              value: llngConfig[K];
            }) => dispatch(updateConfigParams(e))}
          />
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
