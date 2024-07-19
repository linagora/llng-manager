import axios from "axios";

export function sendTestMail(dest: string) {
  try {
    const response = axios.post("/manager.fcgi/confs//sendTestMail", { dest });
    return response;
  } catch (error) {
    throw new Error("400");
  }
}
