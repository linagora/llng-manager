import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { treeFormat } from "../../dashboards/recursTree";
import { changeElementInConf } from "../../dashboards/searchIntree";
import attributes from "../../static/attributes.json";
import { MetaData, llngConfig } from "../../utils/types";
import { getConfig, getMetadataConfig, saveConfig } from "./configAPI";

export interface ConfigState {
  loading: boolean;
  error: { has: boolean; errorContent: string };
  data: { metadata: MetaData; config: llngConfig };
  saveResponse?: Record<string, Array<Record<string, string>>>;
}

export const initialState: ConfigState = {
  loading: true,
  error: { has: false, errorContent: "" },
  data: { metadata: {} as MetaData, config: {} as llngConfig },
};

export const getConfigAsync = createAsyncThunk(
  "config/fetchConfig",
  async (num?: number): Promise<Object> => {
    const configlatestMetadata = await getMetadataConfig();
    if (num && num <= configlatestMetadata.data.cfgNum) {
      const configMetadata = await getMetadataConfig(num ? num : undefined);
      const response = await getConfig(num ? num : configMetadata.data.cfgNum);
      return { metadata: configMetadata.data, config: response.data };
    } else {
      const response = await getConfig(configlatestMetadata.data.cfgNum);
      return { metadata: configlatestMetadata.data, config: response.data };
    }
  }
);
export const saveConfigAsync = createAsyncThunk(
  "config/saveConfig",
  async (config: llngConfig): Promise<Object> => {
    const response = await saveConfig(config);
    return response.data;
  }
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error.errorContent = action.payload;
    },
    removeError(state) {
      state.error.has = false;
    },
    toggleMaintenance(state, action: PayloadAction<string>) {
      if (!state.data.config.vhostOptions) {
        state.data.config.vhostOptions = {};
      }
      if (state.data.config.vhostOptions[action.payload]) {
        state.data.config.vhostOptions[action.payload].vhostMaintenance =
          !state.data.config.vhostOptions[action.payload].vhostMaintenance;
      } else {
        state.data.config.vhostOptions[action.payload] = {
          vhostMaintenance: true,
        };
      }
    },
    toggleSAML(state) {
      state.data.config.issuerDBSAMLActivation =
        1 - Number(state.data.config.issuerDBSAMLActivation);
    },
    toggleOIDC(state) {
      state.data.config.issuerDBOpenIDConnectActivation =
        1 - Number(state.data.config.issuerDBOpenIDConnectActivation);
    },
    toggleCAS(state) {
      state.data.config.issuerDBCASActivation =
        1 - Number(state.data.config.issuerDBCASActivation);
    },
    toggleOID2(state) {
      state.data.config.issuerDBOpenIDActivation =
        1 - Number(state.data.config.issuerDBOpenIDActivation);
    },
    toggleGET(state) {
      state.data.config.issuerDBGetActivation =
        1 - Number(state.data.config.issuerDBGetActivation);
    },
    saveOIDCPrivSig(state, action: PayloadAction<string>) {
      state.data.config.oidcServicePrivateKeySig = action.payload;
    },
    saveOIDCPrivIdSig(state, action: PayloadAction<string>) {
      state.data.config.oidcServiceKeyIdSig = action.payload;
    },
    saveOIDCPubSig(state, action: PayloadAction<string>) {
      state.data.config.oidcServicePublicKeySig = action.payload;
    },
    saveSAMLPrivSig(state, action: PayloadAction<string>) {
      state.data.config.samlServicePrivateKeySig = action.payload;
    },
    saveSAMLPrivIdSig(state, action: PayloadAction<string>) {
      state.data.config.samlServicePrivateKeySigPwd = action.payload;
    },
    saveSAMLPubSig(state, action: PayloadAction<string>) {
      state.data.config.samlServicePublicKeySig = action.payload;
    },
    updateLocationRule(
      state,
      action: PayloadAction<{
        appName: string;
        locationRules: Record<string, string>;
      }>
    ) {
      if (!state.data.config.locationRules) {
        state.data.config.locationRules = {};
      }
      state.data.config.locationRules[action.payload.appName] =
        action.payload.locationRules;
    },
    updateDefaultLocationRule(
      state,
      action: PayloadAction<{ appName: string; rule: string }>
    ) {
      if (!state.data.config.locationRules) {
        state.data.config.locationRules = {};
      }
      state.data.config.locationRules[action.payload.appName].default =
        action.payload.rule;
    },
    newLocationRule(state, action: PayloadAction<string>) {
      if (!state.data.config.locationRules) {
        state.data.config.locationRules = {};
      }
      state.data.config.locationRules[action.payload] = {
        ...state.data.config.locationRules[action.payload],
        "(?#New rule)^/new": "accept",
      };
    },
    delLocationRule(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.locationRules) {
        delete state.data.config.locationRules[action.payload.name][
          action.payload.key
        ];
      }
    },
    newVhostHeaders(state, action: PayloadAction<string>) {
      if (!state.data.config.exportedHeaders) {
        state.data.config.exportedHeaders = {};
      }
      if (!state.data.config.exportedHeaders[action.payload]) {
        state.data.config.exportedHeaders[action.payload] = {};
      }
      state.data.config.exportedHeaders[action.payload] = {
        ...state.data.config.exportedHeaders[action.payload],
        new: "",
      };
    },

    delVhostHeader(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.exportedHeaders) {
        delete state.data.config.exportedHeaders[action.payload.name][
          action.payload.key
        ];
      }
    },
    updateVhostHeaders(
      state,
      action: PayloadAction<{
        name: string;
        data: Record<string, string>;
      }>
    ) {
      if (!state.data.config.exportedHeaders) {
        state.data.config.exportedHeaders = {};
      }
      if (!state.data.config.exportedHeaders[action.payload.name]) {
        state.data.config.exportedHeaders[action.payload.name] = {};
      }
      state.data.config.exportedHeaders[action.payload.name] =
        action.payload.data;
    },
    newVhostPost(state, action: PayloadAction<string>) {
      if (!state.data.config.post) {
        state.data.config.post = {};
      }
      state.data.config.post[action.payload] = {
        ...state.data.config.post[action.payload],
        "/absolute/path/to/form": {},
      };
    },

    delVhostPost(state, action: PayloadAction<{ name: string; key: string }>) {
      if (state.data.config.post) {
        delete state.data.config.post[action.payload.name][action.payload.key];
      }
    },
    updateVhostPost(
      state,
      action: PayloadAction<{
        appName: string;
        post: Record<string, Record<string, string>>;
      }>
    ) {
      if (!state.data.config.post) {
        state.data.config.post = {};
      }
      state.data.config.post[action.payload.appName] = action.payload.post;
    },
    updateVhostOptions(
      state,
      action: PayloadAction<{
        name: string;
        option: string;
        value: boolean | number | string;
      }>
    ) {
      if (!state.data.config.vhostOptions) {
        state.data.config.vhostOptions = {};
      }
      state.data.config.vhostOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
    },
    changeAppName(
      state,
      action: PayloadAction<{ name: string; newName: string }>
    ) {
      for (const key of Object.keys(state.data.config) as Array<
        keyof llngConfig
      >) {
        const value = state.data.config[key];
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          for (const name of Object.keys(value)) {
            if (name === action.payload.name) {
              value[action.payload.newName] = value[action.payload.name];
              delete value[action.payload.name];
            }
          }
        }
      }
    },
    dupApp(
      state,
      action: PayloadAction<{ oldName: string; newAppName: string }>
    ) {
      for (const key of Object.keys(state.data.config) as Array<
        keyof llngConfig
      >) {
        const value = state.data.config[key];
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          for (const name of Object.keys(value)) {
            if (name === action.payload.oldName) {
              value[action.payload.newAppName] = value[action.payload.oldName];
            }
          }
        }
      }
    },
    delApp(state, action: PayloadAction<string>) {
      for (const key of Object.keys(state.data.config) as Array<
        keyof llngConfig
      >) {
        const value = state.data.config[key];
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          for (const name of Object.keys(value)) {
            if (name === action.payload) {
              delete value[name];
            }
          }
        }
      }
    },
    newApp(state, action: PayloadAction<{ name: string; type: string }>) {
      switch (action.payload.type) {
        case "native":
          if (!state.data.config.locationRules) {
            state.data.config.locationRules = {};
          }
          state.data.config.locationRules[action.payload.name] =
            attributes.locationRules.default;
          if (!state.data.config.vhostOptions) {
            state.data.config.vhostOptions = {};
          }
          state.data.config.vhostOptions[action.payload.name] = {};
          if (!state.data.config.exportedHeaders) {
            state.data.config.exportedHeaders = {};
          }
          state.data.config.exportedHeaders[action.payload.name] = {};
          if (!state.data.config.post) {
            state.data.config.post = {};
          }
          state.data.config.post[action.payload.name] = {};
          break;
        case "saml":
          if (!state.data.config.samlSPMetaDataXML) {
            state.data.config.samlSPMetaDataXML = {};
          }
          state.data.config.samlSPMetaDataXML[action.payload.name] = {
            samlSPMetaDataXML: "",
          };
          if (!state.data.config.samlSPMetaDataOptions) {
            state.data.config.samlSPMetaDataOptions = {};
          }
          state.data.config.samlSPMetaDataOptions[action.payload.name] = {};
          break;
        case "oidc":
          if (!state.data.config.oidcRPMetaDataOptions) {
            state.data.config.oidcRPMetaDataOptions = {};
          }
          state.data.config.oidcRPMetaDataOptions[action.payload.name] = {
            oidcRPMetaDataOptionsAccessTokenClaims:
              attributes.oidcRPMetaDataOptionsAccessTokenClaims.default,
            oidcRPMetaDataOptionsAccessTokenJWT:
              attributes.oidcRPMetaDataOptionsAccessTokenJWT.default,
            oidcRPMetaDataOptionsAccessTokenSignAlg:
              attributes.oidcRPMetaDataOptionsAccessTokenSignAlg.default,
            oidcRPMetaDataOptionsAllowClientCredentialsGrant:
              attributes.oidcRPMetaDataOptionsAllowClientCredentialsGrant
                .default,
            oidcRPMetaDataOptionsAllowOffline:
              attributes.oidcRPMetaDataOptionsAllowOffline.default,
            oidcRPMetaDataOptionsAllowPasswordGrant:
              attributes.oidcRPMetaDataOptionsAllowPasswordGrant.default,
            oidcRPMetaDataOptionsBypassConsent:
              attributes.oidcRPMetaDataOptionsBypassConsent.default,
            oidcRPMetaDataOptionsIDTokenForceClaims:
              attributes.oidcRPMetaDataOptionsIDTokenForceClaims.default,
            oidcRPMetaDataOptionsIDTokenSignAlg:
              attributes.oidcRPMetaDataOptionsIDTokenSignAlg.default,
            oidcRPMetaDataOptionsLogoutSessionRequired:
              attributes.oidcRPMetaDataOptionsLogoutSessionRequired.default,
            oidcRPMetaDataOptionsLogoutType:
              attributes.oidcRPMetaDataOptionsLogoutType.default,
            oidcRPMetaDataOptionsPublic:
              attributes.oidcRPMetaDataOptionsPublic.default,
            oidcRPMetaDataOptionsRedirectUris: "",
            oidcRPMetaDataOptionsRefreshToken:
              attributes.oidcRPMetaDataOptionsRefreshToken.default,
            oidcRPMetaDataOptionsRequirePKCE:
              attributes.oidcRPMetaDataOptionsRequirePKCE.default,
          };
          if (!state.data.config.oidcRPMetaDataExportedVars) {
            state.data.config.oidcRPMetaDataExportedVars = {};
          }
          state.data.config.oidcRPMetaDataExportedVars[action.payload.name] =
            attributes.oidcRPMetaDataExportedVars.default;
          if (!state.data.config.oidcRPMetaDataMacros) {
            state.data.config.oidcRPMetaDataMacros = {};
          }
          state.data.config.oidcRPMetaDataMacros[action.payload.name] =
            attributes.oidcRPMetaDataMacros.default;
          break;
        case "cas":
          if (!state.data.config.casAppMetaDataOptions) {
            state.data.config.casAppMetaDataOptions = {};
          }
          state.data.config.casAppMetaDataOptions[action.payload.name] = {
            casAppMetaDataOptionsService: "",
            casAppMetaDataOptionsLogout:
              attributes.casAppMetaDataOptionsLogout.default,
          };
          if (!state.data.config.casAppMetaDataMacros) {
            state.data.config.casAppMetaDataMacros = {};
          }
          state.data.config.casAppMetaDataMacros[action.payload.name] =
            attributes.casAppMetaDataMacros.default;
          if (!state.data.config.casAppMetaDataExportedVars) {
            state.data.config.casAppMetaDataExportedVars = {};
          }
          state.data.config.casAppMetaDataExportedVars[action.payload.name] =
            attributes.casAppMetaDataExportedVars.default;
          break;
        default:
          break;
      }
    },
    updateOIDCclientID(
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) {
      if (!state.data.config.oidcRPMetaDataOptions) {
        state.data.config.oidcRPMetaDataOptions = {};
      }
      state.data.config.oidcRPMetaDataOptions[
        action.payload.name
      ].oidcRPMetaDataOptionsClientID = action.payload.id;
    },
    updateOIDCPrivateClient(
      state,
      action: PayloadAction<{ name: string; privateClient: string }>
    ) {
      if (!state.data.config.oidcRPMetaDataOptions) {
        state.data.config.oidcRPMetaDataOptions = {};
      }
      state.data.config.oidcRPMetaDataOptions[
        action.payload.name
      ].oidcRPMetaDataOptionsClientSecret = action.payload.privateClient;
    },
    updateOIDCPublicClient(
      state,
      action: PayloadAction<{ name: string; publicClient: number }>
    ) {
      if (!state.data.config.oidcRPMetaDataOptions) {
        state.data.config.oidcRPMetaDataOptions = {};
      }
      state.data.config.oidcRPMetaDataOptions[
        action.payload.name
      ].oidcRPMetaDataOptionsPublic = action.payload.publicClient;
    },
    updateCASexportedVars(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.casAppMetaDataExportedVars) {
        state.data.config.casAppMetaDataExportedVars = {};
      }
      state.data.config.casAppMetaDataExportedVars[action.payload.name] =
        action.payload.data;
    },
    newCASexportedVars(state, action: PayloadAction<string>) {
      if (!state.data.config.casAppMetaDataExportedVars) {
        state.data.config.casAppMetaDataExportedVars = {};
      }
      state.data.config.casAppMetaDataExportedVars[action.payload] = {
        ...state.data.config.casAppMetaDataExportedVars[action.payload],
        new: "",
      };
    },

    delCASexportedVars(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.casAppMetaDataExportedVars) {
        delete state.data.config.casAppMetaDataExportedVars[
          action.payload.name
        ][action.payload.key];
      }
    },
    newCASAppMetaDataMacros(state, action: PayloadAction<string>) {
      if (!state.data.config.casAppMetaDataMacros) {
        state.data.config.casAppMetaDataMacros = {};
      }
      state.data.config.casAppMetaDataMacros[action.payload] = {
        ...state.data.config.casAppMetaDataMacros[action.payload],
        new: "",
      };
    },
    updateCASAppMetaDataMacros(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.casAppMetaDataMacros) {
        state.data.config.casAppMetaDataMacros = {};
      }
      state.data.config.casAppMetaDataMacros[action.payload.name] =
        action.payload.data;
    },
    delCASAppMetaDataMacros(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.casAppMetaDataMacros) {
        delete state.data.config.casAppMetaDataMacros[action.payload.name][
          action.payload.key
        ];
      }
    },
    updateCASOptions(
      state,
      action: PayloadAction<{
        name: string;
        option: string;
        value: boolean | number | string;
      }>
    ) {
      if (!state.data.config.casAppMetaDataOptions) {
        state.data.config.casAppMetaDataOptions = {};
      }
      state.data.config.casAppMetaDataOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
    },
    updateSamlSPMetadata(
      state,
      action: PayloadAction<{ name: string; data: string }>
    ) {
      if (!state.data.config.samlSPMetaDataXML) {
        state.data.config.samlSPMetaDataXML = {};
      }
      state.data.config.samlSPMetaDataXML[
        action.payload.name
      ].samlSPMetaDataXML = action.payload.data;
    },
    newSAMLSPMetaDataMacros(state, action: PayloadAction<string>) {
      if (!state.data.config.samlSPMetaDataMacros) {
        state.data.config.samlSPMetaDataMacros = {};
      }
      state.data.config.samlSPMetaDataMacros[action.payload] = {
        ...state.data.config.samlSPMetaDataMacros[action.payload],
        new: "",
      };
    },
    updateSAMLSPMetaDataMacros(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.samlSPMetaDataMacros) {
        state.data.config.samlSPMetaDataMacros = {};
      }
      state.data.config.samlSPMetaDataMacros[action.payload.name] =
        action.payload.data;
    },
    delSAMLSPMetaDataMacros(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.samlSPMetaDataMacros) {
        delete state.data.config.samlSPMetaDataMacros[action.payload.name][
          action.payload.key
        ];
      }
    },
    updateSamlMetadataExportedAttribute(
      state,
      action: PayloadAction<{
        appName: string;
        data: Record<string, string>;
        fieldName: string;
      }>
    ) {
      if (!state.data.config[action.payload.fieldName as keyof llngConfig]) {
        (state.data.config[
          action.payload.fieldName as keyof llngConfig
        ] as any) = {};
      }
      (state.data.config[action.payload.fieldName as keyof llngConfig] as any)[
        action.payload.appName
      ] = action.payload.data;
    },
    newSamlMetadataExportedAttribute(
      state,
      action: PayloadAction<{ appName: string; fieldName: string }>
    ) {
      if (!state.data.config[action.payload.fieldName as keyof llngConfig]) {
        (state.data.config[
          action.payload.fieldName as keyof llngConfig
        ] as any) = {};
      }
      (state.data.config[action.payload.fieldName as keyof llngConfig] as any)[
        action.payload.appName
      ] = {
        ...(
          state.data.config[action.payload.fieldName as keyof llngConfig] as any
        )[action.payload.appName],
        new: "0;New;urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
      };
    },
    delSamlMetadataExportedAttribute(
      state,
      action: PayloadAction<{ appName: string; key: string; fieldName: string }>
    ) {
      if (state.data.config[action.payload.fieldName as keyof llngConfig]) {
        delete (
          state.data.config[action.payload.fieldName as keyof llngConfig] as any
        )[action.payload.appName][action.payload.key];
      }
    },
    updateSamlMetaDataOptions(
      state,
      action: PayloadAction<{
        name: string;
        option: string;
        value: string | number;
      }>
    ) {
      if (!state.data.config.samlSPMetaDataOptions) {
        state.data.config.samlSPMetaDataOptions = {};
      }
      if (!state.data.config.samlSPMetaDataOptions[action.payload.name]) {
        state.data.config.samlSPMetaDataOptions[action.payload.name] = {};
      }
      state.data.config.samlSPMetaDataOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
    },
    newOIDCRPMetaDataMacros(state, action: PayloadAction<string>) {
      if (!state.data.config.oidcRPMetaDataMacros) {
        state.data.config.oidcRPMetaDataMacros = {};
      }
      state.data.config.oidcRPMetaDataMacros[action.payload] = {
        ...state.data.config.oidcRPMetaDataMacros[action.payload],
        new: "",
      };
    },
    updateOIDCRPMetaDataMacros(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.oidcRPMetaDataMacros) {
        state.data.config.oidcRPMetaDataMacros = {};
      }
      state.data.config.oidcRPMetaDataMacros[action.payload.name] =
        action.payload.data;
    },
    delOIDCRPMetaDataMacros(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.oidcRPMetaDataMacros) {
        delete state.data.config.oidcRPMetaDataMacros[action.payload.name][
          action.payload.key
        ];
      }
    },
    updateOidcRPMetaDataExportedVars(
      state,
      action: PayloadAction<{ appName: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.oidcRPMetaDataExportedVars) {
        state.data.config.oidcRPMetaDataExportedVars = {};
      }
      state.data.config.oidcRPMetaDataExportedVars[action.payload.appName] =
        action.payload.data;
    },
    newOidcRPMetaDataExportedVars(state, action: PayloadAction<string>) {
      if (!state.data.config.oidcRPMetaDataExportedVars) {
        state.data.config.oidcRPMetaDataExportedVars = {};
      }
      state.data.config.oidcRPMetaDataExportedVars[action.payload] = {
        ...state.data.config.oidcRPMetaDataExportedVars[action.payload],
        new: "",
      };
    },
    delOidcRPMetaDataExportedVars(
      state,
      action: PayloadAction<{ appName: string; key: string }>
    ) {
      if (state.data.config.oidcRPMetaDataExportedVars) {
        delete state.data.config.oidcRPMetaDataExportedVars[
          action.payload.appName
        ][action.payload.key];
      }
    },
    updateOidcMetaDataOptions(
      state,
      action: PayloadAction<{
        name: string;
        option: string;
        value: string | number;
      }>
    ) {
      if (!state.data.config.oidcRPMetaDataOptions) {
        state.data.config.samlSPMetaDataOptions = {};
      }
      if (!state.data.config.oidcRPMetaDataOptions) {
        state.data.config.oidcRPMetaDataOptions = {};
      }
      state.data.config.oidcRPMetaDataOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
    },
    updateOidcRPMetaDataOptionsExtraClaims(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.oidcRPMetaDataOptionsExtraClaims) {
        state.data.config.oidcRPMetaDataOptionsExtraClaims = {};
      }
      state.data.config.oidcRPMetaDataOptionsExtraClaims[action.payload.name] =
        action.payload.data;
    },
    newOidcRPMetaDataOptionsExtraClaims(state, action: PayloadAction<string>) {
      if (!state.data.config.oidcRPMetaDataOptionsExtraClaims) {
        state.data.config.oidcRPMetaDataOptionsExtraClaims = {};
      }
      state.data.config.oidcRPMetaDataOptionsExtraClaims[action.payload] = {
        ...state.data.config.oidcRPMetaDataOptionsExtraClaims[action.payload],
        new: "",
      };
    },
    delOidcRPMetaDataOptionsExtraClaims(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.oidcRPMetaDataOptionsExtraClaims) {
        delete state.data.config.oidcRPMetaDataOptionsExtraClaims[
          action.payload.name
        ][action.payload.key];
      }
    },
    updateOidcRPMetaDataScopeRules(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.oidcRPMetaDataScopeRules) {
        state.data.config.oidcRPMetaDataScopeRules = {};
      }
      state.data.config.oidcRPMetaDataScopeRules[action.payload.name] =
        action.payload.data;
    },
    newOidcRPMetaDataScopeRules(state, action: PayloadAction<string>) {
      if (!state.data.config.oidcRPMetaDataScopeRules) {
        state.data.config.oidcRPMetaDataScopeRules = {};
      }
      state.data.config.oidcRPMetaDataScopeRules[action.payload] = {
        ...state.data.config.oidcRPMetaDataScopeRules[action.payload],
        new: "",
      };
    },
    delOidcRPMetaDataScopeRules(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.oidcRPMetaDataScopeRules) {
        delete state.data.config.oidcRPMetaDataScopeRules[action.payload.name][
          action.payload.key
        ];
      }
    },
    updateOidcRPMetaDataOptionsJwks(
      state,
      action: PayloadAction<{ name: string; data: string }>
    ) {
      if (!state.data.config.oidcRPMetaDataOptions) {
        state.data.config.oidcRPMetaDataOptions = {};
      }
      state.data.config.oidcRPMetaDataOptions[
        action.payload.name
      ].oidcRPMetaDataOptionsJwks = action.payload.data;
    },
    updateAuthParams(
      state,
      action: PayloadAction<{ param: string; value: string }>
    ) {
      switch (action.payload.param) {
        case "authentication":
          state.data.config.authentication = action.payload.value;
          break;
        case "registerDB":
          state.data.config.registerDB = action.payload.value;
          break;
        case "passwordDB":
          state.data.config.passwordDB = action.payload.value;
          break;
        case "userDB":
          state.data.config.userDB = action.payload.value;
          break;
        default:
          break;
      }
    },
    updateConfigParams<K extends keyof llngConfig>(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<{ param: K; value: llngConfig[K] }>
    ) {
      state.data.config[action.payload.param] = action.payload.value;
    },
    newCombParam(state) {
      if (!state.data.config.combModules) {
        state.data.config.combModules = {};
      }

      state.data.config.combModules["new"] = { for: "0", type: "LDAP" };
    },
    updateCombParam(
      state,
      action: PayloadAction<
        Record<string, Record<string, string | Record<string, string | number>>>
      >
    ) {
      if (!state.data.config.combModules) {
        state.data.config.combModules = {};
      }

      state.data.config.combModules = action.payload;
    },
    delCombParam(state, action: PayloadAction<string>) {
      if (state.data.config.combModules) {
        delete state.data.config.combModules[action.payload];
      }
    },
    newCombOverParam(state, action: PayloadAction<string>) {
      if (!state.data.config.combModules) {
        state.data.config.combModules = {};
      }
      if (!state.data.config.combModules[action.payload].over) {
        state.data.config.combModules[action.payload].over = {};
      }
      const id: string = `new${
        Object.keys(state.data.config.combModules[action.payload].over).length +
        1
      }`;

      (
        state.data.config.combModules[action.payload].over as unknown as Record<
          string,
          number | string
        >
      )[id] = "";
    },
    updateCombOverParam(
      state,
      action: PayloadAction<{
        name: string;
        data: Record<string, string>;
      }>
    ) {
      if (!state.data.config.combModules) {
        state.data.config.combModules = {};
      }

      state.data.config.combModules[action.payload.name].over =
        action.payload.data;
    },
    delCombOverParam(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.combModules) {
        delete (
          state.data.config.combModules[action.payload.name]
            .over as unknown as Record<string, number | string>
        )[action.payload.key];
      }
    },
    newChoiceParam(state) {
      if (!state.data.config.authChoiceModules) {
        state.data.config.authChoiceModules = {};
      }

      state.data.config.authChoiceModules["1_Key"] = "Null;Null;Null;;;{}";
    },
    updateChoiceParam(state, action: PayloadAction<Record<string, string>>) {
      if (!state.data.config.authChoiceModules) {
        state.data.config.authChoiceModules = {};
      }

      state.data.config.authChoiceModules = action.payload;
    },
    delChoiceParam(state, action: PayloadAction<string>) {
      if (state.data.config.authChoiceModules) {
        delete state.data.config.authChoiceModules[action.payload];
      }
    },
    newChoiceOverParam(state, action: PayloadAction<string>) {
      if (!state.data.config.authChoiceModules) {
        state.data.config.authChoiceModules = {};
      }
      if (!state.data.config.authChoiceModules[action.payload]) {
        state.data.config.authChoiceModules[action.payload] = "";
      }

      const value =
        state.data.config.authChoiceModules[action.payload].split(";");
      const choiceOver: Record<string, string> = JSON.parse(value[5]);
      const id: string = `new${Object.keys(choiceOver).length + 1}`;
      choiceOver[id] = "";
      value[5] = JSON.stringify(choiceOver);
      state.data.config.authChoiceModules[action.payload] = value.join(";");
    },
    updateChoiceOverParam(
      state,
      action: PayloadAction<{
        name: string;
        data: Record<string, string>;
      }>
    ) {
      if (!state.data.config.authChoiceModules) {
        state.data.config.authChoiceModules = {};
      }
      if (!state.data.config.authChoiceModules[action.payload.name]) {
        state.data.config.authChoiceModules[action.payload.name] = "";
      }

      const value =
        state.data.config.authChoiceModules[action.payload.name].split(";");
      value[5] = JSON.stringify(action.payload.data);
      state.data.config.authChoiceModules[action.payload.name] =
        value.join(";");
    },
    delChoiceOverParam(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.authChoiceModules) {
        if (state.data.config.authChoiceModules[action.payload.name]) {
          const value =
            state.data.config.authChoiceModules[action.payload.name].split(";");
          const choiceOver: Record<string, string> = JSON.parse(value[5]);
          delete choiceOver[action.payload.key];
          value[5] = JSON.stringify(choiceOver);
          state.data.config.authChoiceModules[action.payload.name] =
            value.join(";");
        }
      }
    },
    newModuleOpt<K extends keyof llngConfig>(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<K>
    ) {
      if (!state.data.config[action.payload]) {
        state.data.config[action.payload] = {} as llngConfig[K];
      }
      if (typeof state.data.config[action.payload] === "object") {
        (state.data.config[action.payload] as Record<string, string>)["new"] =
          "";
      }
    },
    updateModuleOpt<K extends keyof llngConfig>(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<{ name: K; data: Record<string, string> }>
    ) {
      if (!state.data.config[action.payload.name]) {
        state.data.config[action.payload.name] = {} as llngConfig[K];
      }
      state.data.config[action.payload.name] = action.payload
        .data as llngConfig[K];
    },
    delModuleOpt<K extends keyof llngConfig>(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<{ name: K; key: string }>
    ) {
      if (state.data.config[action.payload.name]) {
        if (typeof state.data.config[action.payload.name] === "object") {
          delete (
            state.data.config[action.payload.name] as Record<string, string>
          )[action.payload.key];
        }
      }
    },
    updateGetParamHostname(
      state,
      action: PayloadAction<Record<string, Record<string, string>>>
    ) {
      if (!state.data.config.issuerDBGetParameters) {
        state.data.config.issuerDBGetParameters = {};
      }
      state.data.config.issuerDBGetParameters = action.payload;
    },
    delGetParam(state, action: PayloadAction<string>) {
      if (!state.data.config.issuerDBGetParameters) {
        state.data.config.issuerDBGetParameters = {};
      }
      delete state.data.config.issuerDBGetParameters[action.payload];
    },
    newGetParam(state) {
      if (!state.data.config.issuerDBGetParameters) {
        state.data.config.issuerDBGetParameters = {};
      }
      state.data.config.issuerDBGetParameters["new"] = {};
    },
    updateGetParamOption(
      state,
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.issuerDBGetParameters) {
        state.data.config.issuerDBGetParameters = {};
      }
      state.data.config.issuerDBGetParameters[action.payload.name] =
        action.payload.data;
    },
    delGetParamOption(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (!state.data.config.issuerDBGetParameters) {
        state.data.config.issuerDBGetParameters = {};
      }
      delete state.data.config.issuerDBGetParameters[action.payload.name][
        action.payload.key
      ];
    },
    newGetParamOption(state, action: PayloadAction<string>) {
      if (!state.data.config.issuerDBGetParameters) {
        state.data.config.issuerDBGetParameters = {};
      }
      state.data.config.issuerDBGetParameters[action.payload]["new"] = "";
    },
    changeConf(
      state,
      action: PayloadAction<{ node: treeFormat; newValue: any }>
    ) {
      console.debug("launched func");
      changeElementInConf(
        state.data.config,
        action.payload.node,
        action.payload.newValue
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfigAsync.pending, (state: ConfigState) => {
        state.loading = true;
      })
      .addCase(
        getConfigAsync.fulfilled,
        (state: ConfigState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        getConfigAsync.rejected,
        (
          state: ConfigState,
          action: PayloadAction<
            unknown,
            string,
            {
              arg: number | undefined;
              requestId: string;
              requestStatus: "rejected";
              aborted: boolean;
              condition: boolean;
            } & (
              | { rejectedWithValue: true }
              | ({ rejectedWithValue: false } & {})
            ),
            SerializedError
          >
        ) => {
          state.loading = false;
          state.error.has = true;
          state.error.errorContent =
            action.error.code +
            " : " +
            action.error.name +
            action.error.message;
        }
      )
      .addCase(saveConfigAsync.pending, (state: ConfigState) => {
        state.loading = true;
      })
      .addCase(
        saveConfigAsync.fulfilled,
        (state: ConfigState, action: PayloadAction<any>) => {
          state.loading = false;
          state.saveResponse = action.payload.details;
        }
      )
      .addCase(
        saveConfigAsync.rejected,
        (state: ConfigState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error.has = true;
          if (action.payload instanceof Error) {
            state.error.errorContent = action.payload.message;
          }
        }
      );
  },
});

export const {
  setError,
  removeError,
  toggleMaintenance,
  toggleCAS,
  toggleOIDC,
  toggleSAML,
  toggleGET,
  toggleOID2,
  saveOIDCPrivSig,
  saveOIDCPrivIdSig,
  saveOIDCPubSig,
  saveSAMLPrivIdSig,
  saveSAMLPrivSig,
  saveSAMLPubSig,
  updateLocationRule,
  updateDefaultLocationRule,
  newLocationRule,
  delLocationRule,
  newVhostHeaders,
  delVhostHeader,
  updateVhostHeaders,
  updateVhostPost,
  delVhostPost,
  newVhostPost,
  updateVhostOptions,
  changeAppName,
  delApp,
  dupApp,
  newApp,
  updateOIDCclientID,
  updateOIDCPrivateClient,
  updateOIDCPublicClient,
  updateCASexportedVars,
  newCASexportedVars,
  delCASexportedVars,
  delCASAppMetaDataMacros,
  updateCASAppMetaDataMacros,
  newCASAppMetaDataMacros,
  updateCASOptions,
  updateSamlSPMetadata,
  newSAMLSPMetaDataMacros,
  updateSAMLSPMetaDataMacros,
  delSAMLSPMetaDataMacros,
  updateSamlMetadataExportedAttribute,
  newSamlMetadataExportedAttribute,
  delSamlMetadataExportedAttribute,
  updateSamlMetaDataOptions,
  newOIDCRPMetaDataMacros,
  updateOIDCRPMetaDataMacros,
  delOIDCRPMetaDataMacros,
  updateOidcRPMetaDataExportedVars,
  newOidcRPMetaDataExportedVars,
  delOidcRPMetaDataExportedVars,
  updateOidcMetaDataOptions,
  delOidcRPMetaDataOptionsExtraClaims,
  newOidcRPMetaDataOptionsExtraClaims,
  updateOidcRPMetaDataOptionsExtraClaims,
  newOidcRPMetaDataScopeRules,
  delOidcRPMetaDataScopeRules,
  updateOidcRPMetaDataScopeRules,
  updateOidcRPMetaDataOptionsJwks,
  updateAuthParams,
  updateConfigParams,
  delCombParam,
  newCombParam,
  updateCombParam,
  newCombOverParam,
  delCombOverParam,
  updateCombOverParam,
  newChoiceParam,
  delChoiceParam,
  updateChoiceParam,
  newChoiceOverParam,
  delChoiceOverParam,
  updateChoiceOverParam,
  newModuleOpt,
  delModuleOpt,
  updateModuleOpt,
  updateGetParamHostname,
  delGetParam,
  updateGetParamOption,
  newGetParam,
  delGetParamOption,
  newGetParamOption,
  changeConf,
} = configSlice.actions;
export default configSlice.reducer;
