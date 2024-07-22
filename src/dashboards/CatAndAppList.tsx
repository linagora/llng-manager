import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { Button, IconButton, Link, TextField } from "@mui/material";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  moveApp,
  moveCat,
  newApplication,
  newCategory,
  renameCategory,
} from "../features/config/configSlice";
import "./CatAndAppList.css";

function CatCard({
  catId,
  cardIndex,
  dataLength,
  data,
  dispatch,
}: {
  catId: string;
  cardIndex: number;
  dataLength: number;
  data: Record<
    string,
    string | number | Record<string, string | number | Record<string, string>>
  >;
  dispatch: Function;
}) {
  const applications = Object.keys(data)
    .filter((key) => typeof data[key] === "object")
    .sort(
      (key1, key2) =>
        Number((data[key1] as Record<string, number>).order) -
        Number((data[key2] as Record<string, number>).order)
    );
  return (
    <div className="catCard">
      <div>
        <IconButton
          onClick={() =>
            dispatch(moveCat({ category: catId, direction: "up" }))
          }
          disabled={cardIndex === 0}
        >
          <ArrowUpwardOutlinedIcon />
        </IconButton>

        <TextField
          value={data.catname}
          onChange={(e) =>
            dispatch(renameCategory({ id: catId, newname: e.target.value }))
          }
        />
        <IconButton
          onClick={() =>
            dispatch(
              moveCat({
                category: catId,
                direction: "down",
              })
            )
          }
          disabled={cardIndex === dataLength - 1}
        >
          <ArrowDownwardOutlinedIcon />
        </IconButton>
      </div>
      <div className="applications">
        {applications.map((key, index) => {
          if (typeof data[key] === "object") {
            return (
              <div>
                <IconButton
                  onClick={() =>
                    dispatch(
                      moveApp({
                        category: catId,
                        appName: key,
                        direction: "up",
                      })
                    )
                  }
                  disabled={index === 0}
                >
                  <ArrowUpwardOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    dispatch(
                      moveApp({
                        category: catId,
                        appName: key,
                        direction: "down",
                      })
                    )
                  }
                  disabled={index === applications.length - 1}
                >
                  <ArrowDownwardOutlinedIcon />
                </IconButton>
                <Link>
                  {
                    (data[key] as Record<string, Record<string, string>>)
                      .options.name
                  }
                </Link>
              </div>
            );
          }
          return null;
        })}
        <Button onClick={() => dispatch(newApplication(catId))}>
          <AddOutlinedIcon color="secondary" />
        </Button>
      </div>
    </div>
  );
}

export function CatAndAppList() {
  const dispatch = useAppDispatch();
  const applicationList =
    useAppSelector((state) => state.config.data.config.applicationList) || {};
  const catList = Object.keys(applicationList)
    .filter((key) => typeof applicationList[key] === "object")
    .sort(
      (key1, key2) =>
        Number((applicationList[key1] as Record<string, number>).order) -
        Number((applicationList[key2] as Record<string, number>).order)
    );
  return (
    <div>
      <strong className="title"> {t("applicationList")} </strong>
      <div className="grid">
        {catList.map((key, index) => (
          <CatCard
            catId={key}
            cardIndex={index}
            dataLength={catList.length}
            data={applicationList[key]}
            dispatch={dispatch}
          />
        ))}
        <Button className="catCard" onClick={() => dispatch(newCategory())}>
          <AddOutlinedIcon fontSize="large" color="secondary" />
        </Button>
      </div>
    </div>
  );
}
