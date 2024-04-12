import axios from "axios";

export async function GenerateKeys() {
  try {
    const response = await axios.post("/manager.fcgi/confs//newRSAKey");
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}
