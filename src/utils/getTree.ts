import axios from "axios";

export function getTree() {
  try {
    const response = axios.get("/static/nstruct.json");
    return response;
  } catch (error) {
    throw new Error("400");
  }
}
