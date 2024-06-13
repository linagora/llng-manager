import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import "../i18n";

import { MemoryRouter } from "react-router-dom";
import type { AppStore, RootState } from "../app/store";
import { setupStore } from "../app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {
      config: {
        loading: false,
        error: { has: false, errorContent: "" },
        data: {
          metadata: {
            prev: 13,
            cfgNum: 14,
            cfgLog: "",
            cfgDate: 1711110492,
            cfgAuthor: "anonymous",
            cfgVersion: "2.0.13",
            cfgAuthorIP: "172.30.0.1",
          },
          config: {
            authentication: "Demo",
            userDB: "Same",
            registerDB: "Demo",
            passwordDB: "Demo",
            casAppMetaDataOptions: {
              cas_test: {
                casAppMetaDataOptionsService: "https://google.com",
              },
            },
            issuerDBCASActivation: 0,
            issuerDBOpenIDActivation: 0,
            issuerDBOpenIDConnectActivation: 1,
            issuerDBSAMLActivation: false,

            locationRules: {
              "native.example.com": {
                "(?#checkUser)^/checkuser": 'inGroup("timelords")',
                "(?#errors)^/lmerror/": "accept",
                default: "accept",
              },
            },
            oidcRPMetaDataOptions: {
              oidc_test: {
                oidcRPMetaDataOptionsAccessTokenClaims: 0,
                oidcRPMetaDataOptionsAccessTokenJWT: 0,
                oidcRPMetaDataOptionsAccessTokenSignAlg: "RS256",
                oidcRPMetaDataOptionsAllowClientCredentialsGrant: 0,
                oidcRPMetaDataOptionsAllowOffline: 0,
                oidcRPMetaDataOptionsAllowPasswordGrant: 0,
                oidcRPMetaDataOptionsBypassConsent: 0,
                oidcRPMetaDataOptionsClientID: "abab",
                oidcRPMetaDataOptionsIDTokenForceClaims: 0,
                oidcRPMetaDataOptionsIDTokenSignAlg: "HS512",
                oidcRPMetaDataOptionsLogoutSessionRequired: 0,
                oidcRPMetaDataOptionsLogoutType: "front",
                oidcRPMetaDataOptionsPublic: 0,
                oidcRPMetaDataOptionsRedirectUris: "https://google.com",
                oidcRPMetaDataOptionsRefreshToken: 0,
                oidcRPMetaDataOptionsRequirePKCE: 0,
              },
            },
            samlSPMetaDataXML: {
              saml_test: {
                samlSPMetaDataXML:
                  '<?xml version="1.0"?>\n<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata"\n    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"\n    xmlns:ds="http://www.w3.org/2000/09/xmldsig#"\n    entityID="http://auth.example.com/saml/metadata">\n\n  \n  <IDPSSODescriptor\n      WantAuthnRequestsSigned="true"\n      protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n    <KeyDescriptor use="signing">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEf1XT0DANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1MVoXDTQ0MDMxMzEyMjI1MVow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBANwhWP2KS2l7Istki7c2JzM9W4UiC2PwVMhwPZhP1tqyKd4L\nBPrvi8x9OPQ7jBYBOfwAIIU/k0WA3esyHFO1TwYqeIsGm221Z85NSxq9MG4eZ5CD\nmqICeUWHftOiLt2gTPZYI3gzxTWA6KPEP2/nEZl3Fi04Gpi6DlW59FMFjQxBf0uJ\n121==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <KeyDescriptor use="encryption">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEZM==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <ArtifactResolutionService\n      isDefault="true"\n      index="0"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/artifact" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/singleLogoutSOAP" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n      Location="http://auth.example.com/saml/singleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/singleLogoutReturn"\n      />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/singleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/singleLogoutReturn"\n      />\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:entity</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>\n    <SingleSignOnService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n      Location="http://auth.example.com/saml/singleSignOn"\n      />\n    <SingleSignOnService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/singleSignOn"\n      />\n    <SingleSignOnService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"\n      Location="http://auth.example.com/saml/singleSignOnArtifact"\n      />\n  </IDPSSODescriptor>\n  \n\n  \n  <SPSSODescriptor\n      AuthnRequestsSigned="true"\n      WantAssertionsSigned="true"\n      protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n    <KeyDescriptor use="signing">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <KeyDescriptor use="encryption">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEZM+BSzANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1N1oXDTQ0MDMxMzEyMjI1N1ow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALozLzVIWgM19AlWXNTDzv3hB54yCLCBnWwRHIYfiT1b4qX8\nuVroHCo7q60Y29hWvlPMbLuqcIkriWm3DrPG8653xbQym6a1JxbqFXid6gQhGG5K\nz5rH9zG/AFIUwdu1hHk9MGj1dBEcMI0vrsp470xk5lt7Q0wjXbkQRGBhgCuQUW+A\ns01WmwZ7ZQ5Olo4GGkcXmlje2hVWwFjnkKJ/tPSC+1JBI/YzUyxTWoxQqo+Vx9f9\nss5FJqB4PepZIjrATBrZO3CCUt+CcuWkXcfA+szPVy524dj9k970jsoG9fOy/nENKpLTe\ntsh5gHFkvic+nZ55A/N3l3HysSJ+MSTO9GoyXIDzlbTgBxumFXnbjJxNRmk8l3rz\nAhfc9YFP3MaC+ijBfTmBVAHwTFxPnT7IpTYMiQ8TUkRjKW4bojRab2phwp5bKJJG\nNw5EqgPyztTiyHdVJpQAkYZI1RkNfSBsu0F+e5vWthkZlAcz/NVXl2hTWfQlSe4l\nfTGclW0j1CVM7npnGeBKJbqsqqnnRj5fcW1IA5YUupr9A/jeWsueY2MOt74PpC9B\nxfYLtEyY9Tc0UqtLGTKEeol63lFVJQ==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <ArtifactResolutionService\n      isDefault="true"\n      index="0"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/artifact" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/proxySingleLogoutSOAP" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n      Location="http://auth.example.com/saml/proxySingleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/proxySingleLogoutReturn"\n      />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/proxySingleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/proxySingleLogoutReturn"\n      />\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:entity</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>\n    <AssertionConsumerService\n      isDefault="true"\n      index="0"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"\n      Location="http://auth.example.com/saml/proxySingleSignOnArtifact" />\n    <AssertionConsumerService\n      isDefault="false"\n      index="1"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/proxySingleSignOnPost" />\n  </SPSSODescriptor>\n  \n\n  \n  <AttributeAuthorityDescriptor\n    protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n    <KeyDescriptor use="signing">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEf1XT0DANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1MVoXDTQ0MDMxMzEyMjI1MVow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBANwhWP2KS2l7Istki7c2JzM9W4UiC2PwVMhwPZhP1tqyKd4L\nBPrvi8x9OPQ7jBYBOfwAIIU/k0WA3esyHFO1TwYqeIsGm221Z85NSxq9MG4eZ5CD\nmqICeUWHftOiLt2gTPZYI3gzxTWA6KPEP2/nEZl3Fi04Gpi6DlW59FMFjQxBf0uJ\n121/hqMyUXAjQ95F4fH1oz04VHMd3TpxNnSXfyURWrkNas9nTCGhEfqWkOLgnyLq\n0P1gPOgATnq+FA0urfg+Nh/PeZEZ3WwX/T7IuooVlp0/G2NzvXB/0FQi5lQQV6X+\nob4JU7ea5QSgPUFnJGaUWbejqfsMQKsxFV1+Qtx/VWwQWsmXLQ\nWhk47LiUcnr++wjc\nT+wUeY70s8Iuu0J+Mr5LP0i1tzDP4nUg5JzkQ/bxjiEYbLL2ai0LRASAXQRXBzSo\nkEXfolkfYNzK6M7h7k1WIgt4u4/X53qTHMSu7Fx9nTatuvd7eDlmO8gDPT6jwrjh\n9ckBz9sMPCsR80OLrSnsFRRpn5oHKg==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <KeyDescriptor use="encryption">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEZM+BSzANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1N1oXDTQ0MDMxMzEyMjI1N1ow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALozLzVIWgM19AlWXNTDzv3hB54yCLCBnWwRHIYfiT1b4qX8\nuVroHCo7q60Y29hWvlPMbLuqcIkriWm3DrPG8653xbQym6a1JxbqFXid6gQhGG5K\nz5rH9zG/AFIUwdu1hHk9MGj1dBEcMI0vrsp470xk5lt7Q0wjXbkQRGBhgCuQUW+A\ns01WmwZ7ZQ5Olo4GGkcXmlje2hVWwFjnkKJ/tPSC+1JBI/YzUyxTWoxQqo+Vx9f9\nss5FJqB4PepZIjrATBrZO3CCUt+CcuWkXcfA+IZedILaN9EbZKo+bl77NXuEEvSj\nnt22h9LkbfoOPBsXf6xoh+KGatkdrqmS9J6ecTUCAwEAATANBgkqhkiG9w0BAQsF\nAAOCAQEAc3rUcrC1STCkVb9MRE5YeNJ+szPVy524dj9k970jsoG9fOy/nENKpLTe\ntsh5gHFkvic+nZ55A/N3l3HysSJ+MSTO9GoyXIDzlbTgBxumFXnbjJxNRmk8l3rz\nAhfc9YFP3MaC+ijBfTmBVAHwTFxPnT7IpTYMiQ8TUkRjKW4bojRab2phwp5bKJJG\nNw5EqgPyztTiyHdVJpQAkYZI1RkNfSBsu0F+e5vWthkZlAcz/NVXl2hTWfQlSe4l\nfTGclW0j1CVM7npnGeBKJbqsqqnnRj5fcW1IA5YUupr9A/jeWsueY2MOt74PpC9B\nxfYLtEyY9Tc0UqtLGTKEeol63lFVJQ==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <AttributeService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/AA/SOAP"/>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:entity</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>\n  </AttributeAuthorityDescriptor>\n  \n\n  <Organization>\n    <OrganizationName xml:lang="en">Example</OrganizationName>\n    <OrganizationDisplayName xml:lang="en">Example</OrganizationDisplayName>\n    <OrganizationURL xml:lang="en">http://www.example.com</OrganizationURL>\n  </Organization>\n</EntityDescriptor>\n\n',
              },
            },
            vhostOptions: {
              "native.example.com": {
                vhostAccessToTrace: "",
                vhostAliases: "",
                vhostHttps: -1,
                vhostMaintenance: 0,
                vhostPort: -1,
                vhostServiceTokenTTL: -1,
                vhostType: "Main",
              },
            },
          },
        },
      },
      router: {
        location: {
          pathname: "/manager.html",
          search: "",
          hash: "#conf/14",
          state: null,
          key: "o01z0jry",
        },
      },
    },

    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    useTranslation();
    return (
      <MemoryRouter initialEntries={["/manager.html"]}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
