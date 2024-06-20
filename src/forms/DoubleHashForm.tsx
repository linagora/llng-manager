import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
  IconButton,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { TableVars } from "../components/applicationsComponents/TableVars";
import attributes from "../static/attributes.json";
export default function DoubleHashForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: Record<string, Record<string, string>>;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];
  let i = 0;
  return (
    <table id="getParams">
      <thead>
        <tr>
          <th colSpan={2}>{t("hostname")}</th>
          <th>
            <IconButton className="plus" onClick={() => updateFunc()}>
              <AddCircleIcon color="success" />
            </IconButton>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(value ? value : {}).map((key: string) => {
          i++;
          return (
            <tr key={i} className="getParamRow">
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  onChange={() => updateFunc()}
                  type="text"
                  value={key}
                />
              </td>

              <td>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {t("params")}
                  </AccordionSummary>
                  <table id={`getParams${i}`}>
                    <thead>
                      <tr>
                        <th>{t("keys")}</th>
                        <th>{t("values")}</th>
                        <th>
                          <IconButton
                            className="plus"
                            onClick={() => updateFunc()}
                          >
                            <AddCircleIcon color="success" />
                          </IconButton>
                        </th>
                      </tr>
                    </thead>
                    <TableVars
                      tableID={`getParams${i}`}
                      vars={value ? value[key] : {}}
                      delFunction={console.log}
                      appName={key}
                      updateFunction={console.log}
                      dispatch={console.log}
                    />
                  </table>
                </Accordion>
              </td>
              <td>
                <IconButton
                  onClick={() => {
                    updateFunc();
                  }}
                  className="minus"
                >
                  <RemoveCircleIcon color="error" />
                </IconButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
