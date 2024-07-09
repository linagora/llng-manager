import { Button } from "@mui/material";
import { t } from "i18next";
import { exportSamlMetadata } from "../utils/exportData";

export default function DisplaySamlMetaDataForm({
  confNum,
}: {
  confNum: number;
}) {
  return (
    <>
      <Button
        onClick={async () => await exportSamlMetadata(confNum)}
        variant="contained"
      >
        {t("downloadMetadata")}
      </Button>
    </>
  );
}
