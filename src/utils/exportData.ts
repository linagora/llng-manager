export const exportData = (
  data: "full" | "samlMetadata" | "oidcMetadata",
  num: number
) => {
  const link = document.createElement("a");
  link.href = `/confs/${num}?${data}=1`;
  link.download = `${data}-Conf-${num}.json`;
  link.click();
};
