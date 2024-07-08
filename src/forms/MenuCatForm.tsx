import { t } from "i18next";
import TextForm from "./TextForm";

export default function MenuCatForm({
  values,
}: {
  values: Record<string, string | Record<string, Record<string, string>>>;
}) {
  return (
    <>
      <div>
        <h3> {t("menuCategory")}</h3>
      </div>
      <table>
        <tr>
          <TextForm
            value={typeof values.catname === "string" ? values.catname : ""}
            fieldName="categoryName"
            updateFunc={console.log}
          />
        </tr>
      </table>
      <div>
        <h4> {t("appsInThisCat")}</h4>
        <ul>
          {Object.keys(values).map((key) =>
            typeof values[key] === "object" ? (
              <li>
                {
                  (values[key] as Record<string, Record<string, string>>)
                    .options.name
                }
              </li>
            ) : (
              <></>
            )
          )}
        </ul>
      </div>
    </>
  );
}
