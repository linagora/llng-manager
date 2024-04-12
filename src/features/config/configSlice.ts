import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetadataConfig, getConfig, saveConfig } from "./configAPI";
import { MetaData, llngConfig } from "../../utils/types";

export interface ConfigState {
  loading: boolean;
  error: boolean | any;
  data: { metadata: MetaData; config: llngConfig };
}

const initialState: ConfigState = {
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
} = configSlice.actions;
export default configSlice.reducer;
