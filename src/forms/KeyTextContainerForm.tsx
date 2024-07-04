import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { TableVars } from "../components/applicationsComponents/TableVars";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function KeyTextContainerForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: Record<string, string>;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];

  return (
    <>
      <th className="title2">{t(fieldName)}</th>
      <td>
        <table id="exportedVars">
          <thead>
            <tr>
              <th>{t("keys")}</th>
              <Tooltip
                title={
                  <Markdown>{definitions.casAppMetaDataExportedVars}</Markdown>
                }
              >
                <th>{t("values")}</th>
              </Tooltip>
              <th>
                <IconButton className="plus">
                  <AddCircleIcon color="success" />
                </IconButton>
              </th>
            </tr>
          </thead>
          <TableVars
            appName={"test"}
            vars={value || {}}
            tableID={"exportedVars"}
            dispatch={console.log}
            delFunction={console.log}
            updateFunction={console.log}
          />
        </table>
        <IconButton className="plus">
          <AddCircleIcon color="success" />
        </IconButton>
      </td>
    </>
  );
}
