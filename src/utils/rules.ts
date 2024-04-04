import {
  CasAppMetaDataOptions,
  VhostOption,
  oidcRPMetaDataOptions,
  samlSPMetaDataXML,
} from "./types";

export function ruleSAML(samlData: samlSPMetaDataXML): boolean {
  return samlData.samlSPMetaDataXML ? true : false;
}
export function ruleOIDC(oidcData: oidcRPMetaDataOptions): boolean {
  return (
    (oidcData.oidcRPMetaDataOptionsClientID ? true : false) &&
    (oidcData.oidcRPMetaDataOptionsPublic
      ? true
      : false || oidcData.oidcRPMetaDataOptionsClientSecret
      ? true
      : false)
  );
}

export function ruleCAS(casData: CasAppMetaDataOptions): boolean {
  return true;
}

export function getBrokenRule(
  type: string,
  data:
    | samlSPMetaDataXML
    | oidcRPMetaDataOptions
    | CasAppMetaDataOptions
    | VhostOption
) {
  switch (type) {
    case "saml":
      const samlData = data as samlSPMetaDataXML;
      return samlData.samlSPMetaDataXML ? "" : "samlSPMetaDataXML missing";
    case "oidc":
      const oidcData = data as oidcRPMetaDataOptions;
      return (
        (oidcData.oidcRPMetaDataOptionsClientID
          ? ""
          : "oidcRPMetaDataOptionsClientID missing\n") +
        (oidcData.oidcRPMetaDataOptionsPublic
          ? ""
          : oidcData.oidcRPMetaDataOptionsClientSecret
          ? ""
          : "oidcRPMetaDataOptionsPublic or oidcRPMetaDataOptionsClientSecret missing\n")
      );
    case "cas":
      // const casData = data as CasAppMetaDataOptions;
      return "no problem yet\n";

    default:
      return "";
  }
}
