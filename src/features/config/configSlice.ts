import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import attributes from "../../static/attributes.json";
import { treeFormat } from "../../utils/recursTree";
import { changeElementInConf } from "../../utils/searchIntree";
import { MetaData, llngConfig } from "../../utils/types";
import {
  getConfig,
  getMetadataConfig,
  getPartialConfig,
  saveConfig,
  savePartialConfig,
} from "./configAPI";

export interface ConfigState {
  loading: boolean;
  error: { has: boolean; errorContent: string };
  data: { metadata: MetaData; config: llngConfig };
  saveResponse?: Record<string, Record<string, Array<Record<string, string>>>>;
}

export const initialState: ConfigState = {
  loading: true,
  error: { has: false, errorContent: "" },
  data: { metadata: {} as MetaData, config: {} as llngConfig },
};

export const getConfigAsync = createAsyncThunk(
  "config/fetchConfig",
  async (num?: number): Promise<Object> => {
    const latestMetaresponse = await getMetadataConfig();
    if (latestMetaresponse.redirected) {
      window.location.assign(latestMetaresponse.url);
    }
    const configlatestMetadata = await latestMetaresponse.json();
    if (num && num <= configlatestMetadata.cfgNum) {
      const metaresponse = await getMetadataConfig(num ? num : undefined);
      if (metaresponse.redirected) {
        window.location.assign(metaresponse.url);
      }
      const configMetadata = await metaresponse.json();
      const response = await getConfig(num ? num : configMetadata.cfgNum);
      if (response.redirected) {
        window.location.assign(response.url);
      }
      return { metadata: configMetadata, config: await response.json() };
    } else {
      const response = await getConfig(configlatestMetadata.cfgNum);
      if (response.redirected) {
        window.location.assign(response.url);
      }
      return {
        metadata: await configlatestMetadata,
        config: await response.json(),
      };
    }
  }
);

export const getPartialConfigAsync = createAsyncThunk(
  "config/fetchPartialConfig",
  async (): Promise<Object> => {
    const response = await getPartialConfig();
    if (response.redirected) {
      window.location.assign(response.url);
    }
    const partialConf = await response.json();
    const metadata = {
      cfgAuthor: partialConf.cfgAuthor,
      cfgAuthorIP: partialConf.cfgAuthorIP,
      cfgDate: partialConf.cfgDate,
      cfgLog: partialConf.cfgLog,
      cfgNum: partialConf.cfgNum,
      cfgVersion: partialConf.cfgVersion,
      prev: partialConf.prev,
      next: partialConf.next,
    };
    return { metadata, config: partialConf };
  }
);

export const saveConfigAsync = createAsyncThunk(
  "config/saveConfig",
  async (config: llngConfig): Promise<Object> => {
    const response = await saveConfig(config);
    if (response.redirected) {
      window.location.assign(response.url);
    }
    return response.json();
  }
);

export const savePartialConfigAsync = createAsyncThunk(
  "config/savePartialConfig",
  async (config: llngConfig): Promise<Object> => {
    const response = await savePartialConfig(config);
    if (response.redirected) {
      window.location.assign(response.url);
    }
    return response.json();
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
          Number(
            !state.data.config.vhostOptions[action.payload].vhostMaintenance
          );
      } else {
        state.data.config.vhostOptions[action.payload] = {
          vhostMaintenance: 1,
        };
      }
    },
    toggleSAML(state) {
      if (!state.data.config.issuerDBSAMLActivation) {
        state.data.config.issuerDBSAMLActivation = 0;
      }
      state.data.config.issuerDBSAMLActivation =
        1 - Number(state.data.config.issuerDBSAMLActivation);
    },
    toggleOIDC(state) {
      if (!state.data.config.issuerDBOpenIDConnectActivation) {
        state.data.config.issuerDBOpenIDConnectActivation = 0;
      }
      state.data.config.issuerDBOpenIDConnectActivation =
        1 - Number(state.data.config.issuerDBOpenIDConnectActivation);
    },
    toggleCAS(state) {
      if (!state.data.config.issuerDBCASActivation) {
        state.data.config.issuerDBCASActivation = 0;
      }
      state.data.config.issuerDBCASActivation =
        1 - Number(state.data.config.issuerDBCASActivation);
    },
    toggleOID2(state) {
      if (!state.data.config.issuerDBOpenIDActivation) {
        state.data.config.issuerDBOpenIDActivation = 0;
      }
      state.data.config.issuerDBOpenIDActivation =
        1 - Number(state.data.config.issuerDBOpenIDActivation);
    },
    toggleGET(state) {
      if (!state.data.config.issuerDBGetActivation) {
        state.data.config.issuerDBGetActivation = 0;
      }
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
    delApp(state, action: PayloadAction<{ name: string; type: string }>) {
      switch (action.payload.type) {
        case "native":
          if (state.data.config.locationRules) {
            delete state.data.config.locationRules[action.payload.name];
          }
          if (state.data.config.vhostOptions) {
            delete state.data.config.vhostOptions[action.payload.name];
          }
          if (state.data.config.exportedHeaders) {
            delete state.data.config.exportedHeaders[action.payload.name];
          }
          if (state.data.config.post) {
            delete state.data.config.post[action.payload.name];
          }
          break;
        case "SPsaml":
          if (state.data.config.samlSPMetaDataXML) {
            delete state.data.config.samlSPMetaDataXML[action.payload.name];
          }
          if (state.data.config.samlSPMetaDataOptions) {
            delete state.data.config.samlSPMetaDataOptions[action.payload.name];
          }
          break;
        case "IdPsaml":
          if (state.data.config.samlIDPMetaDataXML) {
            delete state.data.config.samlIDPMetaDataXML[action.payload.name];
          }
          if (state.data.config.samlIDPMetaDataOptions) {
            delete state.data.config.samlIDPMetaDataOptions[
              action.payload.name
            ];
          }
          break;
        case "RPoidc":
          if (state.data.config.oidcRPMetaDataOptions) {
            delete state.data.config.oidcRPMetaDataOptions[action.payload.name];
          }
          if (state.data.config.oidcRPMetaDataExportedVars) {
            delete state.data.config.oidcRPMetaDataExportedVars[
              action.payload.name
            ];
          }
          if (state.data.config.oidcRPMetaDataMacros) {
            delete state.data.config.oidcRPMetaDataMacros[action.payload.name];
          }
          break;
        case "OPoidc":
          if (state.data.config.oidcOPMetaDataOptions) {
            delete state.data.config.oidcOPMetaDataOptions[action.payload.name];
          }
          if (state.data.config.oidcOPMetaDataExportedVars) {
            delete state.data.config.oidcOPMetaDataExportedVars[
              action.payload.name
            ];
          }
          if (state.data.config.oidcOPMetaDataJSON) {
            delete state.data.config.oidcOPMetaDataJSON[action.payload.name];
          }

          if (state.data.config.oidcOPMetaDataJWKS) {
            delete state.data.config.oidcOPMetaDataJWKS[action.payload.name];
          }
          break;
        case "AppCas":
          if (state.data.config.casAppMetaDataOptions) {
            delete state.data.config.casAppMetaDataOptions[action.payload.name];
          }

          if (state.data.config.casAppMetaDataMacros) {
            delete state.data.config.casAppMetaDataMacros[action.payload.name];
          }

          if (state.data.config.casAppMetaDataExportedVars) {
            delete state.data.config.casAppMetaDataExportedVars[
              action.payload.name
            ];
          }
          break;
        case "SrvCas":
          if (state.data.config.casSrvMetaDataOptions) {
            delete state.data.config.casSrvMetaDataOptions[action.payload.name];
          }
          if (state.data.config.casSrvMetaDataExportedVars) {
            delete state.data.config.casSrvMetaDataExportedVars[
              action.payload.name
            ];
          }
          break;
        default:
          break;
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
        case "SPsaml":
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
        case "IdPsaml":
          if (!state.data.config.samlIDPMetaDataXML) {
            state.data.config.samlIDPMetaDataXML = {};
          }
          state.data.config.samlIDPMetaDataXML[action.payload.name] = {
            samlIDPMetaDataXML: "",
          };
          if (!state.data.config.samlIDPMetaDataOptions) {
            state.data.config.samlIDPMetaDataOptions = {};
          }
          state.data.config.samlIDPMetaDataOptions[action.payload.name] = {};
          break;
        case "RPoidc":
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
        case "OPoidc":
          if (!state.data.config.oidcOPMetaDataOptions) {
            state.data.config.oidcOPMetaDataOptions = {};
          }
          state.data.config.oidcOPMetaDataOptions[action.payload.name] = {};
          if (!state.data.config.oidcOPMetaDataExportedVars) {
            state.data.config.oidcOPMetaDataExportedVars = {};
          }
          state.data.config.oidcOPMetaDataExportedVars[action.payload.name] =
            attributes.oidcOPMetaDataExportedVars.default;
          if (!state.data.config.oidcOPMetaDataJSON) {
            state.data.config.oidcOPMetaDataJSON = {};
          }
          state.data.config.oidcOPMetaDataJSON[action.payload.name] = "";
          if (!state.data.config.oidcOPMetaDataJWKS) {
            state.data.config.oidcOPMetaDataJWKS = {};
          }
          state.data.config.oidcOPMetaDataJWKS[action.payload.name] = "";
          break;
        case "AppCas":
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
        case "SrvCas":
          if (!state.data.config.casSrvMetaDataOptions) {
            state.data.config.casSrvMetaDataOptions = {};
          }
          state.data.config.casSrvMetaDataOptions[action.payload.name] = {};
          if (!state.data.config.casSrvMetaDataExportedVars) {
            state.data.config.casSrvMetaDataExportedVars = {};
          }
          state.data.config.casSrvMetaDataExportedVars[action.payload.name] =
            attributes.casSrvMetaDataExportedVars.default;
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
      action: PayloadAction<{ name: K; data: llngConfig[K] }>
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
    newSfExtraOverParam(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<string>
    ) {
      if (!state.data.config.sfExtra) {
        state.data.config.sfExtra = {};
      }
      if (!state.data.config.sfExtra[action.payload]) {
        state.data.config.sfExtra[action.payload] = {};
      }
      if (!state.data.config.sfExtra[action.payload].over) {
        state.data.config.sfExtra[action.payload].over = {};
      }
      const length =
        Object.keys(
          state.data.config.sfExtra[action.payload].over as Record<
            string,
            string | number
          >
        ).length + 1;
      (
        state.data.config.sfExtra[action.payload].over as Record<
          string,
          string | number
        >
      )[`new${length}`] = "";
    },
    updateSfExtraOverParam(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<{ name: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.sfExtra) {
        state.data.config.sfExtra = {};
      }
      if (!state.data.config.sfExtra[action.payload.name]) {
        state.data.config.sfExtra[action.payload.name] = {};
      }
      if (!state.data.config.sfExtra[action.payload.name].over) {
        state.data.config.sfExtra[action.payload.name].over = {};
      }

      state.data.config.sfExtra[action.payload.name].over = action.payload.data;
    },
    deleteSfExtraOverParam(
      state: {
        data: { config: llngConfig; metadata: MetaData };
      },
      action: PayloadAction<{ name: string; key: string }>
    ) {
      if (state.data.config.sfExtra) {
        if (state.data.config.sfExtra[action.payload.name]) {
          if (state.data.config.sfExtra[action.payload.name].over) {
            delete (
              state.data.config.sfExtra[action.payload.name].over as Record<
                string,
                string | number
              >
            )[action.payload.key];
          }
        }
      }
    },
    newCategory(state) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      const maxOrder = Math.max(
        ...Object.keys(state.data.config.applicationList)
          .map((key) =>
            state.data.config.applicationList
              ? (
                  state.data.config.applicationList as Record<
                    string,
                    Record<string, number>
                  >
                )[key].order
              : 0
          )
          .filter((el) => typeof el === "number"),
        0
      );
      state.data.config.applicationList[
        `new_category${Object.keys(state.data.config.applicationList).length}`
      ] = {
        catname: "New category",
        order: (maxOrder ? maxOrder : 0) + 1,
        type: "category",
      };
    },
    renameCategory(
      state,
      action: PayloadAction<{ id: string; newname: string }>
    ) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      state.data.config.applicationList[action.payload.id].catname =
        action.payload.newname;
    },
    delCategory(state, action: PayloadAction<string>) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      delete state.data.config.applicationList[action.payload];
    },
    newApplication(state, action: PayloadAction<string>) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      if (!state.data.config.applicationList[action.payload]) {
        state.data.config.applicationList[action.payload] = {};
      }
      const maxOrder = Math.max(
        ...Object.keys(state.data.config.applicationList[action.payload])
          .map((key) =>
            state.data.config.applicationList
              ? (
                  state.data.config.applicationList[action.payload] as Record<
                    string,
                    Record<string, number>
                  >
                )[key].order
              : 0
          )
          .filter((el) => typeof el === "number"),
        0
      );
      state.data.config.applicationList[action.payload][
        `new_application${
          Object.keys(state.data.config.applicationList[action.payload]).length
        }`
      ] = {
        options: { name: "New Application" },
        order: (maxOrder ? maxOrder : 0) + 1,
        type: "application",
      };
    },
    changeApplicationField(
      state,
      action: PayloadAction<{
        catid: string;
        id: string;
        field: string;
        value: string;
      }>
    ) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      (
        (
          state.data.config.applicationList[action.payload.catid] as Record<
            string,
            object
          >
        )[action.payload.id] as Record<string, Record<string, string>>
      ).options[action.payload.field] = action.payload.value;
    },
    delApplication(
      state,
      action: PayloadAction<{ catid: string; id: string }>
    ) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      delete (
        state.data.config.applicationList[action.payload.catid] as Record<
          string,
          object
        >
      )[action.payload.id];
    },
    moveCat(
      state,
      action: PayloadAction<{ category: string; direction: string }>
    ) {
      if (!state.data.config.applicationList) {
        state.data.config.applicationList = {};
      }
      let categories = Object.keys(state.data.config.applicationList)
        .filter((key: string) =>
          state.data.config.applicationList
            ? (
                state.data.config.applicationList as Record<
                  string,
                  Record<string, number>
                >
              )[key].order
              ? 1
              : 0
            : 0
        )
        .sort((key1, key2) => {
          if (state.data.config.applicationList) {
            return (
              (
                state.data.config.applicationList as Record<
                  string,
                  Record<string, number>
                >
              )[key1].order -
              (
                state.data.config.applicationList as Record<
                  string,
                  Record<string, number>
                >
              )[key2].order
            );
          }
          return 0;
        });
      const appIndex = categories.findIndex(
        (el) => el === action.payload.category
      );
      const order = (
        state.data.config.applicationList as Record<
          string,
          Record<string, number>
        >
      )[action.payload.category].order;
      if (appIndex === -1) return;
      if (action.payload.direction === "up" && appIndex > 0) {
        (
          state.data.config.applicationList as Record<
            string,
            Record<string, number>
          >
        )[action.payload.category].order = (
          state.data.config.applicationList as Record<
            string,
            Record<string, number>
          >
        )[categories[appIndex - 1]].order;
        (
          state.data.config.applicationList as Record<
            string,
            Record<string, number>
          >
        )[categories[appIndex - 1]].order = order;
      } else if (
        action.payload.direction === "down" &&
        appIndex < categories.length - 1
      ) {
        (
          state.data.config.applicationList as Record<
            string,
            Record<string, number>
          >
        )[action.payload.category].order = (
          state.data.config.applicationList as Record<
            string,
            Record<string, number>
          >
        )[categories[appIndex + 1]].order;
        (
          state.data.config.applicationList as Record<
            string,
            Record<string, number>
          >
        )[categories[appIndex + 1]].order = order;
      }
    },
    moveApp(
      state,
      action: PayloadAction<{
        category: string;
        appName: string;
        direction: string;
      }>
    ) {
      if (state.data.config.applicationList) {
        let apps = Object.keys(
          state.data.config.applicationList[action.payload.category]
        )
          .filter((key: string) =>
            state.data.config.applicationList
              ? (
                  state.data.config.applicationList[
                    action.payload.category
                  ] as Record<string, Record<string, number>>
                )[key].order
                ? 1
                : 0
              : 0
          )
          .sort((key1, key2) => {
            if (state.data.config.applicationList) {
              return (
                (
                  state.data.config.applicationList[
                    action.payload.category
                  ] as Record<string, Record<string, number>>
                )[key1].order -
                (
                  state.data.config.applicationList[
                    action.payload.category
                  ] as Record<string, Record<string, number>>
                )[key2].order
              );
            }
            return 0;
          });

        const appIndex = apps.findIndex((el) => el === action.payload.appName);
        const order = (
          state.data.config.applicationList[action.payload.category] as Record<
            string,
            Record<string, number>
          >
        )[action.payload.appName].order;

        if (appIndex === -1) return;
        if (action.payload.direction === "up" && appIndex > 0) {
          (
            state.data.config.applicationList[
              action.payload.category
            ] as Record<string, Record<string, number>>
          )[action.payload.appName].order = (
            state.data.config.applicationList[
              action.payload.category
            ] as Record<string, Record<string, number>>
          )[apps[appIndex - 1]].order;
          (
            state.data.config.applicationList[
              action.payload.category
            ] as Record<string, Record<string, number>>
          )[apps[appIndex - 1]].order = order;
        } else if (
          action.payload.direction === "down" &&
          appIndex < apps.length - 1
        ) {
          (
            state.data.config.applicationList[
              action.payload.category
            ] as Record<string, Record<string, number>>
          )[action.payload.appName].order = (
            state.data.config.applicationList[
              action.payload.category
            ] as Record<string, Record<string, number>>
          )[apps[appIndex + 1]].order;
          (
            state.data.config.applicationList[
              action.payload.category
            ] as Record<string, Record<string, number>>
          )[apps[appIndex + 1]].order = order;
        }
      }
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
          state.saveResponse = action.payload;
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
      )
      .addCase(getPartialConfigAsync.pending, (state: ConfigState) => {
        state.loading = true;
      })
      .addCase(
        getPartialConfigAsync.fulfilled,
        (state: ConfigState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
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
  newSfExtraOverParam,
  updateSfExtraOverParam,
  deleteSfExtraOverParam,
  newCategory,
  renameCategory,
  delCategory,
  newApplication,
  changeApplicationField,
  delApplication,
  moveCat,
  moveApp,
} = configSlice.actions;
export default configSlice.reducer;
