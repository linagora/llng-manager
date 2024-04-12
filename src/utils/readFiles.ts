import { ChangeEvent } from "react";

export function handleChangeFile(
  e: ChangeEvent<HTMLInputElement>
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0], "UTF-8");
      reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent?.target?.result) {
          const fileContent = readerEvent.target.result as string;
          resolve(fileContent);
        } else {
          reject("Failed to read the file.");
        }
      };
      reader.onerror = () => {
        reject("Error reading the file.");
      };
    } else {
      reject("No file selected.");
    }
  });
}
