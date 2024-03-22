import { createSlice } from "@reduxjs/toolkit";

export interface IssuerState {
  SAML: boolean;
  OIDC: boolean;
  CAS: boolean;
}

const initialState: IssuerState = { SAML: false, OIDC: false, CAS: false };

const issuerSlice = createSlice({
  name: "issuers",
  initialState,
  reducers: {
    toggleSAML(state) {
      state.SAML = !state.SAML;
    },
    toggleOIDC(state) {
      state.OIDC = !state.OIDC;
    },
    toggleCAS(state) {
      state.CAS = !state.CAS;
    },
  },
});

export const { toggleSAML, toggleOIDC, toggleCAS } = issuerSlice.actions;
export default issuerSlice.reducer;
