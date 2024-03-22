import axios from "axios";

export function getMetadataConfig(num: any) {
  try {
    const response = axios.get(
      `http://manager.example.com/confs/${num ? num : "latest"}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("400");
  }
}

export function getConfig(num: number) {
  try {
    const response = axios.get(
      `http://manager.example.com/manager.fcgi/confs/${num}?full=1`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("400");
  }
}
