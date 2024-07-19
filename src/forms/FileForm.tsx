import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, TextField } from "@mui/material";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { URLLoader } from "../components/managerComponents/URLLoader";
import { VisuallyHiddenInput } from "../components/managerComponents/VisuallyHiddenInput";
import attributes from "../static/attributes.json";
import { handleChangeFile } from "../utils/readFiles";
export default function FileForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: string;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];
  return (
    <>
      <th className="title2">{t(fieldName)}</th>
      <td>
        <div>
          <TextField
            size="small"
            margin="normal"
            variant="filled"
            multiline
            fullWidth
            rows={12}
            placeholder={fieldName}
            onChange={(e) => updateFunc(e.target.value)}
            value={value || ""}
          />
        </div>
        <div>
          <Button
            sx={{ margin: "5px" }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {t("upload")}
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  handleChangeFile(e as ChangeEvent<HTMLInputElement>).then(
                    (fileContent) => {
                      console.debug("File content:", fileContent);
                      updateFunc(fileContent);
                    }
                  );
                }
              }}
            />
          </Button>
        </div>
        <URLLoader appName={fieldName} loadFunction={updateFunc} />
      </td>
    </>
  );
}
