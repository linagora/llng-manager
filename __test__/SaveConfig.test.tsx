import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";
import { SavePopup } from "../src/components/SavePopup";
import { HomePage } from "../src/dashboards/HomePage";
import { ConfigState } from "../src/features/config/configSlice";
import { renderWithProviders } from "../src/utils/test-utils";
jest.mock("axios");
jest.mock("../src/app/hooks");

const mockConfig = {
  data: {
    metadata: {
      cfgNum: 14,
      cfgAuthor: "John Doe",
      cfgAuthorIP: "192.168.1.1",
      cfgDate: 1634024400,
      cfgLog: "",
      cfgVersion: "0.00.1",
      prev: 13,
    },
    config: {
      authentication: "Demo",
      casAppMetaDataOptions: {
        cas_test: {
          casAppMetaDataOptionsService: "https://google.com",
        },
      },
      issuerDBCASActivation: 1,
      issuerDBOpenIDActivation: 0,
      issuerDBGetActivation: 0,
      issuerDBOpenIDConnectActivation: 1,
      issuerDBSAMLActivation: 1,
      locationRules: {
        "native.example.com": {
          "(?#checkUser)^/checkuser": 'inGroup("timelords")',
          "(?#errors)^/lmerror/": "accept",
          default: "accept",
        },
      },
      oidcRPMetaDataOptions: {},
      passwordDB: "Demo",
      registerDB: "Demo",
      samlSPMetaDataXML: {
        saml_test: {
          samlSPMetaDataXML:
            '<?xml version="1.0"?>\n<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata"\n    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"\n    xmlns:ds="http://www.w3.org/2000/09/xmldsig#"\n    entityID="http://auth.example.com/saml/metadata">\n\n  \n  <IDPSSODescriptor\n      WantAuthnRequestsSigned="true"\n      protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n    <KeyDescriptor use="signing">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEf1XT0DANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1MVoXDTQ0MDMxMzEyMjI1MVow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBANwhWP2KS2l7Istki7c2JzM9W4UiC2PwVMhwPZhP1tqyKd4L\nBPrvi8x9OPQ7jBYBOfwAIIU/k0WA3esyHFO1TwYqeIsGm221Z85NSxq9MG4eZ5CD\nmqICeUWHftOiLt2gTPZYI3gzxTWA6KPEP2/nEZl3Fi04Gpi6DlW59FMFjQxBf0uJ\n121==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <KeyDescriptor use="encryption">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEZM==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <ArtifactResolutionService\n      isDefault="true"\n      index="0"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/artifact" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/singleLogoutSOAP" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n      Location="http://auth.example.com/saml/singleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/singleLogoutReturn"\n      />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/singleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/singleLogoutReturn"\n      />\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:entity</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>\n    <SingleSignOnService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n      Location="http://auth.example.com/saml/singleSignOn"\n      />\n    <SingleSignOnService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/singleSignOn"\n      />\n    <SingleSignOnService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"\n      Location="http://auth.example.com/saml/singleSignOnArtifact"\n      />\n  </IDPSSODescriptor>\n  \n\n  \n  <SPSSODescriptor\n      AuthnRequestsSigned="true"\n      WantAssertionsSigned="true"\n      protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n    <KeyDescriptor use="signing">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <KeyDescriptor use="encryption">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEZM+BSzANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1N1oXDTQ0MDMxMzEyMjI1N1ow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALozLzVIWgM19AlWXNTDzv3hB54yCLCBnWwRHIYfiT1b4qX8\nuVroHCo7q60Y29hWvlPMbLuqcIkriWm3DrPG8653xbQym6a1JxbqFXid6gQhGG5K\nz5rH9zG/AFIUwdu1hHk9MGj1dBEcMI0vrsp470xk5lt7Q0wjXbkQRGBhgCuQUW+A\ns01WmwZ7ZQ5Olo4GGkcXmlje2hVWwFjnkKJ/tPSC+1JBI/YzUyxTWoxQqo+Vx9f9\nss5FJqB4PepZIjrATBrZO3CCUt+CcuWkXcfA+szPVy524dj9k970jsoG9fOy/nENKpLTe\ntsh5gHFkvic+nZ55A/N3l3HysSJ+MSTO9GoyXIDzlbTgBxumFXnbjJxNRmk8l3rz\nAhfc9YFP3MaC+ijBfTmBVAHwTFxPnT7IpTYMiQ8TUkRjKW4bojRab2phwp5bKJJG\nNw5EqgPyztTiyHdVJpQAkYZI1RkNfSBsu0F+e5vWthkZlAcz/NVXl2hTWfQlSe4l\nfTGclW0j1CVM7npnGeBKJbqsqqnnRj5fcW1IA5YUupr9A/jeWsueY2MOt74PpC9B\nxfYLtEyY9Tc0UqtLGTKEeol63lFVJQ==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <ArtifactResolutionService\n      isDefault="true"\n      index="0"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/artifact" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/proxySingleLogoutSOAP" />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"\n      Location="http://auth.example.com/saml/proxySingleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/proxySingleLogoutReturn"\n      />\n    <SingleLogoutService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/proxySingleLogout"\n      \n      ResponseLocation="http://auth.example.com/saml/proxySingleLogoutReturn"\n      />\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:entity</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>\n    <AssertionConsumerService\n      isDefault="true"\n      index="0"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"\n      Location="http://auth.example.com/saml/proxySingleSignOnArtifact" />\n    <AssertionConsumerService\n      isDefault="false"\n      index="1"\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"\n      Location="http://auth.example.com/saml/proxySingleSignOnPost" />\n  </SPSSODescriptor>\n  \n\n  \n  <AttributeAuthorityDescriptor\n    protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">\n    <KeyDescriptor use="signing">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEf1XT0DANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1MVoXDTQ0MDMxMzEyMjI1MVow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBANwhWP2KS2l7Istki7c2JzM9W4UiC2PwVMhwPZhP1tqyKd4L\nBPrvi8x9OPQ7jBYBOfwAIIU/k0WA3esyHFO1TwYqeIsGm221Z85NSxq9MG4eZ5CD\nmqICeUWHftOiLt2gTPZYI3gzxTWA6KPEP2/nEZl3Fi04Gpi6DlW59FMFjQxBf0uJ\n121/hqMyUXAjQ95F4fH1oz04VHMd3TpxNnSXfyURWrkNas9nTCGhEfqWkOLgnyLq\n0P1gPOgATnq+FA0urfg+Nh/PeZEZ3WwX/T7IuooVlp0/G2NzvXB/0FQi5lQQV6X+\nob4JU7ea5QSgPUFnJGaUWbejqfsMQKsxFV1+Qtx/VWwQWsmXLQ\nWhk47LiUcnr++wjc\nT+wUeY70s8Iuu0J+Mr5LP0i1tzDP4nUg5JzkQ/bxjiEYbLL2ai0LRASAXQRXBzSo\nkEXfolkfYNzK6M7h7k1WIgt4u4/X53qTHMSu7Fx9nTatuvd7eDlmO8gDPT6jwrjh\n9ckBz9sMPCsR80OLrSnsFRRpn5oHKg==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <KeyDescriptor use="encryption">\n      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">\n          <ds:X509Data>\n\t<ds:X509Certificate>\n\tMIICsjCCAZqgAwIBAgIEZM+BSzANBgkqhkiG9w0BAQsFADAbMRkwFwYDVQQDDBBh\ndXRoLmV4YW1wbGUuY29tMB4XDTI0MDMxODEyMjI1N1oXDTQ0MDMxMzEyMjI1N1ow\nGzEZMBcGA1UEAwwQYXV0aC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALozLzVIWgM19AlWXNTDzv3hB54yCLCBnWwRHIYfiT1b4qX8\nuVroHCo7q60Y29hWvlPMbLuqcIkriWm3DrPG8653xbQym6a1JxbqFXid6gQhGG5K\nz5rH9zG/AFIUwdu1hHk9MGj1dBEcMI0vrsp470xk5lt7Q0wjXbkQRGBhgCuQUW+A\ns01WmwZ7ZQ5Olo4GGkcXmlje2hVWwFjnkKJ/tPSC+1JBI/YzUyxTWoxQqo+Vx9f9\nss5FJqB4PepZIjrATBrZO3CCUt+CcuWkXcfA+IZedILaN9EbZKo+bl77NXuEEvSj\nnt22h9LkbfoOPBsXf6xoh+KGatkdrqmS9J6ecTUCAwEAATANBgkqhkiG9w0BAQsF\nAAOCAQEAc3rUcrC1STCkVb9MRE5YeNJ+szPVy524dj9k970jsoG9fOy/nENKpLTe\ntsh5gHFkvic+nZ55A/N3l3HysSJ+MSTO9GoyXIDzlbTgBxumFXnbjJxNRmk8l3rz\nAhfc9YFP3MaC+ijBfTmBVAHwTFxPnT7IpTYMiQ8TUkRjKW4bojRab2phwp5bKJJG\nNw5EqgPyztTiyHdVJpQAkYZI1RkNfSBsu0F+e5vWthkZlAcz/NVXl2hTWfQlSe4l\nfTGclW0j1CVM7npnGeBKJbqsqqnnRj5fcW1IA5YUupr9A/jeWsueY2MOt74PpC9B\nxfYLtEyY9Tc0UqtLGTKEeol63lFVJQ==\n</ds:X509Certificate>\n</ds:X509Data>\n      </ds:KeyInfo>\n    </KeyDescriptor>\n    <AttributeService\n      Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"\n      Location="http://auth.example.com/saml/AA/SOAP"/>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:entity</NameIDFormat>\n    <NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat>\n  </AttributeAuthorityDescriptor>\n  \n\n  <Organization>\n    <OrganizationName xml:lang="en">Example</OrganizationName>\n    <OrganizationDisplayName xml:lang="en">Example</OrganizationDisplayName>\n    <OrganizationURL xml:lang="en">http://www.example.com</OrganizationURL>\n  </Organization>\n</EntityDescriptor>\n\n',
        },
      },
      samlServicePrivateKeySig: "private",
      samlServicePrivateKeySigPwd: "hash",
      samlServicePublicKeySig: "public",
      userDB: "Same",
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
  loading: false,
  error: { has: false, errorContent: "" },
} as ConfigState;
it("should restore the configuration when a valid file is uploaded", async () => {
  const file = new File(
    [JSON.stringify(mockConfig.data.metadata)],
    "file.txt",
    {
      type: "text/plain",
    }
  );
  (axios.post as jest.Mock).mockResolvedValueOnce(mockConfig.data.metadata);
  (useAppSelector as jest.Mock).mockReturnValue(mockConfig);
  const dispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  renderWithProviders(<HomePage />);
  fireEvent.change(screen.getAllByLabelText(t("restore"))[0], {
    target: { files: [file] },
  });
  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});

it("should lauch search for number", async () => {
  (useAppSelector as jest.Mock).mockReturnValue(mockConfig);
  const dispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  renderWithProviders(<HomePage />);
  fireEvent.change(screen.getAllByPlaceholderText(t("search config num"))[0], {
    target: { value: 2 },
  });
  fireEvent.click(screen.getByText("go"));
  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});

it("should go to latest", async () => {
  (useAppSelector as jest.Mock).mockReturnValueOnce(mockConfig);
  const dispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

  renderWithProviders(<HomePage />);

  fireEvent.click(screen.getAllByRole("button")[2]);
  await waitFor(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

it("save popup", async () => {
  (useAppSelector as jest.Mock).mockReturnValue(mockConfig);
  const dispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  const setOpenSavePopup = jest.fn();
  renderWithProviders(
    <SavePopup
      config={{
        ...mockConfig,
        saveResponse: {
          __warnings__: [{ message: "warning" }],
          __errors__: [{ message: "error" }],
        },
      }}
      openSavePopup={true}
      setOpenSavePopup={setOpenSavePopup}
      dispatch={dispatch}
    />
  );
  expect(await screen.findByText("warning")).toBeDefined();
  expect(await screen.findByText("error")).toBeDefined();

  fireEvent.click(screen.getByText(t("close")));
  expect(dispatch).toHaveBeenCalled();
  expect(setOpenSavePopup).toHaveBeenCalled();
});
