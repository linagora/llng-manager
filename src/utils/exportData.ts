import axios from "axios";
export const exportData = async (
  data: "full" | "samlMetadata" | "oidcMetadata",
  num: number
) => {
  const response = await axios.get(`/confs/${num}?${data}=1`);
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(response.data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `${data}-Conf-${num}.${
    data === "samlMetadata" ? "xml" : "json"
  }`;
  link.click();
};

export const exportOidcMetadata = async (confNum: number) => {
  const response = await axios.get(
    `/manager.fcgi/confs/${confNum}?oidcMetadata=1`
  );
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(response.data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `oidcMetadata-${confNum}.json`;
  link.click();
};
export const exportSamlMetadata = async (confNum: number) => {
  const response = await axios.get(
    `/manager.fcgi/confs/${confNum}?samlMetadata=1`
  );
  const jsonString = `data:Application/octet-stream,${encodeURIComponent(
    response.data
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `samlMetadata-${confNum}.xml`;
  link.click();
};
