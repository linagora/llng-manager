import axios from "axios";

export async function GenerateKeys(type: string) {
  try {
    const response = await axios.post(
      `/manager.fcgi/confs//new${type === "EC" ? "Ec" : type}Key${
        type === "EC" ? "s" : ""
      }`
    );
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}
