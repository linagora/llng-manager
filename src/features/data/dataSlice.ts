import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetadataConfig, getConfig } from "./dataAPI";

export interface DataState {
  loading: boolean;
  error: boolean;
  data: any;
}

const initialState: DataState = { loading: true, error: false, data: {} };

export const getDataAsync = createAsyncThunk(
  "data/fetchData",
  async (): Promise<Object> => {
    const configMetadata = await getMetadataConfig(null);
    const response = await getConfig(configMetadata.data.cfgNum);
    console.log(response);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleMaintenance(state, action: PayloadAction<string>) {
      state.data.vhostOptions[action.payload].vhostMaintenance =
        !state.data.vhostOptions[action.payload].vhostMaintenance;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.pending, (state: DataState) => {
        state.loading = true;
      })
      .addCase(
        getDataAsync.fulfilled,
        (state: DataState, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getDataAsync.rejected, (state: DataState) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { toggleMaintenance } = dataSlice.actions;
export default dataSlice.reducer;
