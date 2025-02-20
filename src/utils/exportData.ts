export const exportData = async (
  data: "full" | "samlMetadata" | "oidcMetadata",
  num: number
) => {
  const response = await fetch(`/confs/${num}?${data}=1`);
  const responseData =
    data === "samlMetadata" ? await response.text() : await response.json();
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    data === "samlMetadata" ? responseData : JSON.stringify(responseData)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${data}-Conf-${num}.${
    data === "samlMetadata" ? "xml" : "json"
  }`;
  link.click();
};

export const exportOidcMetadata = async (confNum: number) => {
  const response = await fetch(`/manager.fcgi/confs/${confNum}?oidcMetadata=1`);

  const responseData = await response.json();
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(responseData)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `oidcMetadata-${confNum}.json`;
  link.click();
};
export const exportSamlMetadata = async (confNum: number) => {
  const response = await fetch(`/manager.fcgi/confs/${confNum}?samlMetadata=1`);
  const responseData = await response.text();
  console.debug(responseData);
  const jsonString = `data:application/octet-stream,${encodeURIComponent(
    responseData
  )}`;

  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `samlMetadata-${confNum}.xml`;
  link.click();
};
