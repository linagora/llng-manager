import { llngConfig } from "../../utils/types";

const baseUrl = process.env.REACT_APP_BASEURL;

export function getMetadataConfig(num?: number) {
  try {
    const response = fetch(`/confs/${num ? num : "latest"}`, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    // console.error(error)
    throw new Error(JSON.stringify(error));
  }
}

export function getConfig(num: number) {
  try {
    const response = fetch(`/manager.fcgi/confs/${num}?full=1`, {
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export function getPartialConfig() {
  try {
    const response = fetch(`/partial`, { credentials: "include" });
    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export function saveConfig(config: llngConfig) {
  try {
    const response = fetch(`/manager.fcgi/confs/raw`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(config),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
}

export function savePartialConfig(config: llngConfig) {
  try {
    const response = fetch(`/partial`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(config),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
}
