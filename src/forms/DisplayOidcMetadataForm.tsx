import { Button } from "@mui/material";
import { t } from "i18next";
import { exportOidcMetadata } from "../utils/exportData";

export default function DisplayOidcMetaDataForm({
  confNum,
}: {
  confNum: number;
}) {
  return (
    <>
      <Button
        onClick={async () => await exportOidcMetadata(confNum)}
        variant="contained"
      >
        {t("downloadMetadata")}
      </Button>
    </>
  );
}
