export async function GenerateEcKeys() {
  try {
    const response = await fetch("/manager.fcgi/confs//newEcKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}
export async function NewCertificate(password?: string) {
  try {
    const body = password ? JSON.stringify({ password }) : undefined;

    const response = await fetch(`/manager.fcgi/confs//newCertificate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error generating keys:", error);
    throw error;
  }
}
