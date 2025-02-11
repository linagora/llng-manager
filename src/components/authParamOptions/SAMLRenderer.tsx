import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary
} from "@mui/material";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import SamlAssertionForm from "../../forms/SamlAssertionForm";
import SamlServiceForm from "../../forms/SamlServiceForm";
import attributes from "../../static/attributes.json";
import { llngConfig } from "../../utils/types";
import TextForm from "../../forms/TextForm";
import IntForm from "../../forms/IntForm";
import BoolForm from "../../forms/BoolForm";

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
                <TextForm
                  fieldName="samlNameIDFormatMapX509"
                  value={
                    config.samlNameIDFormatMapX509
                      ? config.samlNameIDFormatMapX509
                      : ""
                  }
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlNameIDFormatMapX509",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <TextForm
                  fieldName="samlNameIDFormatMapWindows"
                  value={
                    config.samlNameIDFormatMapWindows
                      ? config.samlNameIDFormatMapWindows
                      : ""
                  }
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlNameIDFormatMapWindows",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <TextForm
                  fieldName="samlNameIDFormatMapKerberos"
                  value={
                    config.samlNameIDFormatMapKerberos
                      ? config.samlNameIDFormatMapKerberos
                      : ""
                  }
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlNameIDFormatMapKerberos",
                        value: e,
                      })
                    )
                  }
                />
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
                <IntForm
                  fieldName="samlAuthnContextMapPassword"
                  value={Number(
                    config.samlAuthnContextMapPassword
                      ? config.samlAuthnContextMapPassword
                      : ""
                  )}
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlAuthnContextMapPassword",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                {" "}
                <IntForm
                  fieldName="samlAuthnContextMapPasswordProtectedTransport"
                  value={Number(
                    config.samlAuthnContextMapPasswordProtectedTransport
                      ? config.samlAuthnContextMapPasswordProtectedTransport
                      : ""
                  )}
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlAuthnContextMapPasswordProtectedTransport",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <IntForm
                  fieldName="samlAuthnContextMapKerberos"
                  value={Number(
                    config.samlAuthnContextMapKerberos
                      ? config.samlAuthnContextMapKerberos
                      : ""
                  )}
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlAuthnContextMapKerberos",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <IntForm
                  fieldName="samlAuthnContextMapTLSClient"
                  value={Number(
                    config.samlAuthnContextMapTLSClient
                      ? config.samlAuthnContextMapTLSClient
                      : ""
                  )}
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlAuthnContextMapTLSClient",
                        value: e,
                      })
                    )
                  }
                />
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
                <BoolForm
                  fieldName="samlMetadataForceUTF8"
                  value={Number(
                    config.samlMetadataForceUTF8 ||
                      attributes.samlMetadataForceUTF8.default
                  )}
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlMetadataForceUTF8",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <BoolForm
                  fieldName="samlRelayStateTimeout"
                  value={
                    config.samlRelayStateTimeout ||
                    attributes.samlRelayStateTimeout.default
                  }
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlRelayStateTimeout",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <BoolForm
                  fieldName="samlUseQueryStringSpecific"
                  value={Number(
                    config.samlUseQueryStringSpecific ||
                      attributes.samlUseQueryStringSpecific.default
                  )}
                  updateFunc={(e: number) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlUseQueryStringSpecific",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <TextForm
                  fieldName="samlFederationFiles"
                  value={config.samlFederationFiles || ""}
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "samlFederationFiles",
                        value: e,
                      })
                    )
                  }
                />
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
                  <BoolForm
                    fieldName="samlCommonDomainCookieActivation"
                    value={Number(
                      config.samlCommonDomainCookieActivation ||
                        attributes.samlCommonDomainCookieActivation.default
                    )}
                    updateFunc={(e: number) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlCommonDomainCookieActivation",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
                <tr>
                  <TextForm
                    fieldName="samlCommonDomainCookieDomain"
                    value={config.samlCommonDomainCookieDomain || ""}
                    updateFunc={(e: string) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlCommonDomainCookieDomain",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
                <tr>
                  {" "}
                  <TextForm
                    fieldName="samlCommonDomainCookieReader"
                    value={config.samlCommonDomainCookieReader || ""}
                    updateFunc={(e: string) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlCommonDomainCookieReader",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
                <tr>
                  {" "}
                  <TextForm
                    fieldName="samlCommonDomainCookieWriter"
                    value={config.samlCommonDomainCookieWriter || ""}
                    updateFunc={(e: string) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlCommonDomainCookieWriter",
                          value: e,
                        })
                      )
                    }
                  />
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
                  <BoolForm
                    fieldName="samlDiscoveryProtocolActivation"
                    value={Number(
                      config.samlDiscoveryProtocolActivation ||
                        attributes.samlDiscoveryProtocolActivation.default
                    )}
                    updateFunc={(e: number) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlDiscoveryProtocolActivation",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
                <tr>
                  <TextForm
                    fieldName="samlDiscoveryProtocolURL"
                    value={config.samlDiscoveryProtocolURL || ""}
                    updateFunc={(e: string) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlDiscoveryProtocolURL",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
                <tr>
                  <TextForm
                    fieldName="samlDiscoveryProtocolPolicy"
                    value={config.samlDiscoveryProtocolPolicy || ""}
                    updateFunc={(e: string) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlDiscoveryProtocolPolicy",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
                <tr>
                  <BoolForm
                    fieldName="samlDiscoveryProtocolIsPassive"
                    value={Number(
                      config.samlDiscoveryProtocolIsPassive ||
                        attributes.samlDiscoveryProtocolIsPassive.default
                    )}
                    updateFunc={(e: number) =>
                      dispatch(
                        updateConfigParams({
                          param: "samlDiscoveryProtocolIsPassive",
                          value: e,
                        })
                      )
                    }
                  />
                </tr>
              </tbody>
            </table>
          </Accordion>
        </Accordion>
      </div>
    </div>
  );
}
