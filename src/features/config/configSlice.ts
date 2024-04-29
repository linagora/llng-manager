import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetadataConfig, getConfig, saveConfig } from "./configAPI";
import { MetaData, llngConfig } from "../../utils/types";
import attributes from "../../static/attributes.json";

export interface ConfigState {
  loading: boolean;
  error: boolean | any;
  data: { metadata: MetaData; config: llngConfig };
}

export const initialState: ConfigState = {
  loading: true,
  error: false,
  data: { metadata: {} as MetaData, config: {} as llngConfig },
};

export const getConfigAsync = createAsyncThunk(
  "config/fetchConfig",
  async (): Promise<Object> => {
    const configMetadata = await getMetadataConfig();
    const response = await getConfig(configMetadata.data.cfgNum);
    return { metadata: configMetadata.data, config: response.data };
  }
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    toggleMaintenance(state, action: PayloadAction<string>) {
      state.data.config.vhostOptions[action.payload].vhostMaintenance =
        !state.data.config.vhostOptions[action.payload].vhostMaintenance;
    },
    toggleSAML(state) {
      state.data.config.issuerDBSAMLActivation =
        !state.data.config.issuerDBSAMLActivation;
    },
    toggleOIDC(state) {
      state.data.config.issuerDBOpenIDConnectActivation =
        !state.data.config.issuerDBOpenIDConnectActivation;
    },
    toggleCAS(state) {
      state.data.config.issuerDBCASActivation =
        !state.data.config.issuerDBCASActivation;
    },
    toggleOID2(state) {
      state.data.config.issuerDBOpenIDActivation =
        !state.data.config.issuerDBOpenIDActivation;
    },
    toggleGET(state) {
      state.data.config.issuerDBGetActivation =
        !state.data.config.issuerDBGetActivation;
    },
    saveConfigCall(state) {
      saveConfig(state.data.config);
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
      state.data.config.locationRules[action.payload.appName] =
        action.payload.locationRules;
    },
    newLocationRule(state, action: PayloadAction<string>) {
      state.data.config.locationRules[action.payload] = {
        ...state.data.config.locationRules[action.payload],
        "(?#New rule)^/new": "accept",
      };
    },
    delLocationRule(
      state,
      action: PayloadAction<{ name: string; key: string }>
    ) {
      delete state.data.config.locationRules[action.payload.name][
        action.payload.key
      ];
    },
    newVhostHeaders(state, action: PayloadAction<string>) {
      if (!state.data.config.exportedHeaders) {
        state.data.config.exportedHeaders = {};
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
        appName: string;
        exportedHeaders: Record<string, string>;
      }>
    ) {
      if (!state.data.config.exportedHeaders) {
        state.data.config.exportedHeaders = {};
      }
      state.data.config.exportedHeaders[action.payload.appName] =
        action.payload.exportedHeaders;
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
      state.data.config.vhostOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
    },
    changeAppName(
      state,
      action: PayloadAction<{ name: string; newName: string }>
    ) {
      state.data.config = JSON.parse(
        JSON.stringify(state.data.config).replaceAll(
          action.payload.name,
          action.payload.newName
        )
      );
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
          state.data.config.locationRules[action.payload.name] =
            attributes.locationRules.default;
          state.data.config.vhostOptions[action.payload.name] = {
            vhostAccessToTrace: attributes.vhostAccessToTrace.default,
            vhostAliases: attributes.vhostAliases.default,
            vhostHttps: attributes.vhostHttps.default,
            vhostMaintenance: attributes.vhostMaintenance.default,
            vhostPort: attributes.vhostPort.default,
            vhostServiceTokenTTL: attributes.vhostServiceTokenTTL.default,
            vhostType: attributes.vhostType.default,
          };
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
          state.data.config.samlSPMetaDataXML[action.payload.name] = {
            samlSPMetaDataXML: "",
          };
          break;
        case "oidc":
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
          break;
        case "cas":
          state.data.config.casAppMetaDataOptions[action.payload.name] = {
            casAppMetaDataOptionsService: "",
          };
          break;
        default:
          break;
      }
    },
    updateOIDCclientID(
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) {
      state.data.config.oidcRPMetaDataOptions[
        action.payload.name
      ].oidcRPMetaDataOptionsClientID = action.payload.id;
    },
    updateOIDCPrivateClient(
      state,
      action: PayloadAction<{ name: string; privateClient: string }>
    ) {
      state.data.config.oidcRPMetaDataOptions[
        action.payload.name
      ].oidcRPMetaDataOptionsClientSecret = action.payload.privateClient;
    },
    updateOIDCPublicClient(
      state,
      action: PayloadAction<{ name: string; publicClient: number }>
    ) {
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
      state.data.config.casAppMetaDataOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
    },
    updateSamlSPMetadata(
      state,
      action: PayloadAction<{ name: string; data: string }>
    ) {
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
    updateSamlSPMetadataExportedAttribute(
      state,
      action: PayloadAction<{ appName: string; data: Record<string, string> }>
    ) {
      if (!state.data.config.samlSPMetaDataExportedAttributes) {
        state.data.config.samlSPMetaDataExportedAttributes = {};
      }
      state.data.config.samlSPMetaDataExportedAttributes[
        action.payload.appName
      ] = action.payload.data;
    },
    newSamlSPMetadataExportedAttribute(state, action: PayloadAction<string>) {
      if (!state.data.config.samlSPMetaDataExportedAttributes) {
        state.data.config.samlSPMetaDataExportedAttributes = {};
      }
      state.data.config.samlSPMetaDataExportedAttributes[action.payload] = {
        ...state.data.config.samlSPMetaDataExportedAttributes[action.payload],
        new: "0;New",
      };
    },
    delSamlSPMetadataExportedAttribute(
      state,
      action: PayloadAction<{ appName: string; key: string }>
    ) {
      if (state.data.config.samlSPMetaDataExportedAttributes) {
        delete state.data.config.samlSPMetaDataExportedAttributes[
          action.payload.appName
        ][action.payload.key];
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
      state.data.config.samlSPMetaDataOptions[action.payload.name][
        action.payload.option
      ] = action.payload.value;
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
        (state: ConfigState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  toggleMaintenance,
  toggleCAS,
  toggleOIDC,
  toggleSAML,
  toggleGET,
  toggleOID2,
  saveConfigCall,
  saveOIDCPrivSig,
  saveOIDCPrivIdSig,
  saveOIDCPubSig,
  saveSAMLPrivIdSig,
  saveSAMLPrivSig,
  saveSAMLPubSig,
  updateLocationRule,
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
  updateSamlSPMetadataExportedAttribute,
  newSamlSPMetadataExportedAttribute,
  delSamlSPMetadataExportedAttribute,
  updateSamlMetaDataOptions,
} = configSlice.actions;
export default configSlice.reducer;
