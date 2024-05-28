import axios from "axios";
import { llngConfig } from "../../utils/types";

export function getMetadataConfig(num?: number) {
  try {
    const response = axios.get(`/confs/${num ? num : "latest"}`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("400");
  }
}

export function getConfig(num: number) {
  try {
    const response = axios.get(`/manager.fcgi/confs/${num}?full=1`);
    return response;
  } catch (error) {
    throw new Error("400");
  }
}

export function saveConfig(config: llngConfig) {
  try {
    const response = axios.post("/manager.fcgi/confs/raw", config);
    return response;
  } catch (error) {
    throw new Error("400");
  }
}
