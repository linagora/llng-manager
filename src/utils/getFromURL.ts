export async function getFromURL(url: string) {
  try {
    const response = await fetch("/prx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data from URL:", error);
    throw new Error(JSON.stringify(error));
  }
}
