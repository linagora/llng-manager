import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton } from "@mui/material";
import { t } from "i18next";
import {
  delApplication,
  delCategory,
  moveApp,
  moveCat,
  newApplication,
  renameCategory,
} from "../features/config/configSlice";
import TextForm from "./TextForm";

export default function MenuCatForm({
  values,
  id,
  dispatch,
}: {
  values: Record<
    string,
    string | Record<string, number | Record<string, string>>
  >;
  id: string;
  dispatch: Function;
}) {
  return (
    <>
      <div>
        <h3> {t("menuCategory")}</h3>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <IconButton
                onClick={() =>
                  dispatch(moveCat({ category: id, direction: "up" }))
                }
              >
                <ArrowUpwardOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  dispatch(moveCat({ category: id, direction: "down" }))
                }
              >
                <ArrowDownwardOutlinedIcon />
              </IconButton>
            </td>
            <TextForm
              value={typeof values.catname === "string" ? values.catname : ""}
              fieldName="categoryName"
              updateFunc={(e: string) =>
                dispatch(renameCategory({ id: id, newname: e }))
              }
            />
            <td>
              <IconButton
                onClick={() => dispatch(delCategory(id))}
                className="minus"
              >
                <RemoveCircleIcon color="error" />
              </IconButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h4> {t("appsInThisCat")}</h4>
        <ul>
          {Object.keys(values)
            .filter((key) => typeof values[key] === "object")
            .sort((key1, key2) => {
              const order1 = (values[key1] as Record<string, number>).order;
              const order2 = (values[key2] as Record<string, number>).order;
              return (order1 ?? 0) - (order2 ?? 0);
            })
            .map((key) =>
              typeof values[key] === "object" ? (
                <li>
                  <IconButton
                    size="small"
                    onClick={() =>
                      dispatch(
                        moveApp({ category: id, appName: key, direction: "up" })
                      )
                    }
                  >
                    <ArrowUpwardOutlinedIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      dispatch(
                        moveApp({
                          category: id,
                          appName: key,
                          direction: "down",
                        })
                      )
                    }
                  >
                    <ArrowDownwardOutlinedIcon />
                  </IconButton>
                  <span>
                    {
                      (values[key] as Record<string, Record<string, string>>)
                        .options.name
                    }
                  </span>
                  <IconButton
                    onClick={() =>
                      dispatch(delApplication({ catid: id, id: key }))
                    }
                    className="minus"
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </li>
              ) : (
                <></>
              )
            )}
        </ul>
        <IconButton
          className="plus"
          onClick={() => dispatch(newApplication(id))}
        >
          <AddCircleIcon color="success" />
        </IconButton>
      </div>
    </>
  );
}
