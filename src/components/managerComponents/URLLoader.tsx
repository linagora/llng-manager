import { t } from "i18next";
import { useState } from "react";
import { getFromURL } from "../../utils/getFromURL";
import { useAppDispatch } from "../../app/hooks";
import { Button } from "@mui/material";

export function URLLoader({
  appName,
  loadFunction,
}: {
  appName?: string;
  loadFunction: Function;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div>
      <label>{t("url")}</label>
      <input type="url" onChange={(e) => setUrl(e.target.value)} />
      <Button
        variant="outlined"
        onClick={async () => {
          try {
            setLoading(true);
            setError(false);
            const data = await getFromURL(url);
            console.log(data);
            dispatch(
              loadFunction({
                name: appName ? appName : "",
                data: data.data.content,
              })
            );
          } catch (error) {
            setError(true);
          } finally {
            setLoading(false);
          }
        }}
      >
        {t("load")}
      </Button>
      {loading && <div>{t("loading")}</div>}
      {error && <div>{t("badUrl")}</div>}
    </div>
  );
}
