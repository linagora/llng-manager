export const exportData = (data: Object, num?: number) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = `lmConf-${num}.json`;
  link.click();
};
