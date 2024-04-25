import axios from "axios";

export function getFromURL(url: string) {
  try {
    const response = axios.post("/prx", { url });
    return response;
  } catch (error) {
    throw new Error("400");
  }
}
