import axios from "axios";

export async function GenerateEcKeys() {
  try {
    const response = await axios.post("/manager.fcgi/confs//newEcKeys");
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}
export async function NewCertificate(password?: string) {
  try {
    if (password) {
      const response = await axios.post(`/manager.fcgi/confs//newCertificate`, {
        password: password,
      });
      const result = response.data;
      return result;
    } else {
      const response = await axios.post(`/manager.fcgi/confs//newCertificate`);
      const result = response.data;
      return result;
    }
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}
