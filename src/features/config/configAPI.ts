import { llngConfig } from "../../utils/types";

const baseUrl = "http://manager.example.com:19876"

export function getMetadataConfig(num?: number) {
  try {
    const response = window.fetch(`${baseUrl}/confs/${num ? num : "latest"}`);
    return response;
  } catch (error) {
    // console.error(error)
    throw new Error(JSON.stringify(error));
  }
}

export function getConfig(num: number) {
  try {
    const response = window.fetch(`${baseUrl}/manager.fcgi/confs/${num}?full=1`);
    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export function getPartialConfig(num: number) {
  try {
    const response = window.fetch(`${baseUrl}/partial`);
    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export function saveConfig(config: llngConfig) {
  try {

    const response = window.fetch(`${baseUrl}/manager.fcgi/confs/raw`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config),
        // credentials: "include"
      });
    return response;
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error));
  }
}

export function savePartialConfig(config: llngConfig) {
  try {

    const response = window.fetch(`${baseUrl}/partial/raw`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config),
        // credentials: "include"
      });
    return response;
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error));
  }
}
