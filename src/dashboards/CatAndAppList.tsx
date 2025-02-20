import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  changeApplicationField,
  delApplication,
  delCategory,
  moveApp,
  moveCat,
  newApplication,
  newCategory,
  renameCategory,
} from "../features/config/configSlice";
import attributes from "../static/attributes.json";
import "./CatAndAppList.css";
import HomeButton from "../components/HomeButton";

const logoOptions = [
  "attach.png",
  "bell.png",
  "bookmark.png",
  "configure.png",
  "database.png",
  "demo.png",
  "docs.png",
  "folder.png",
  "gear.png",
  "help.png",
  "llng.png",
  "mailappt.png",
  "money.png",
  "network.png",
  "terminal.png",
  "thumbnail.png",
  "tools.png",
  "tux.png",
  "web.png",
  "wheels.png",
];

function MenuAppCard({
  app,
  cardIndex,
  catId,
  appIndex,
  portal,
  appKey,
  applications,
  dispatch,
}: {
  app: Record<string, Record<string, string>>;
  catId: string;
  portal: string;
  appKey: string;
  applications: string[];
  cardIndex: number;
  appIndex: number;
  dispatch: Function;
}) {
  const [display, setDisplay] = useState<string>("auto");
  useEffect(() => {
    setDisplay(
      app.options.display === "on" ||
        app.options.display === "off" ||
        app.options.display === "auto"
        ? app.options.display
        : "specialRule"
    );
  }, [app.options]);
  return (
    <Card key={`cat${cardIndex}app${appIndex}`}>
      <CardHeader
        avatar={
          <FormControl>
            <Select
              value={
                (app.options as Record<string, string>).logo || "network.png"
              }
              onChange={(e) =>
                dispatch(
                  changeApplicationField({
                    catid: catId,
                    id: appKey,
                    field: "logo",
                    value: e.target.value,
                  })
                )
              }
            >
              {logoOptions.map((option) => (
                <MenuItem value={option} key={option}>
                  <img
                    src={`${portal}/static/common/apps/${option}`}
                    height="30px"
                    width="30px"
                    alt={option}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        title={
          <>
            <TextField
              size="small"
              value={app.options.name}
              onChange={(e) =>
                dispatch(
                  changeApplicationField({
                    catid: catId,
                    id: appKey,
                    field: "name",
                    value: e.target.value,
                  })
                )
              }
            />
            <IconButton
              onClick={() =>
                dispatch(
                  moveApp({
                    category: catId,
                    appName: appKey,
                    direction: "up",
                  })
                )
              }
              disabled={appIndex === 0}
            >
              <ArrowUpwardOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch(
                  moveApp({
                    category: catId,
                    appName: appKey,
                    direction: "down",
                  })
                )
              }
              disabled={appIndex === applications.length - 1}
            >
              <ArrowDownwardOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch(delApplication({ catid: catId, id: appKey }))
              }
            >
              <RemoveOutlinedIcon />
            </IconButton>
          </>
        }
        subheader={
          <>
            <TextField
              size="small"
              rows={3}
              multiline
              fullWidth
              value={app.options.description}
              onChange={(e) =>
                dispatch(
                  changeApplicationField({
                    catid: catId,
                    id: appKey,
                    field: "description",
                    value: e.target.value,
                  })
                )
              }
            />
            <FormControl>
              <FormLabel>{t("applicationDisplay")}</FormLabel>
              <RadioGroup
                row
                value={display}
                onChange={(e) => {
                  dispatch(
                    changeApplicationField({
                      catid: catId,
                      id: appKey,
                      field: "display",
                      value: e.target.value,
                    })
                  );
                  setDisplay(e.target.value);
                }}
              >
                <FormControlLabel
                  value={"on"}
                  control={<Radio />}
                  label={t("on")}
                />
                <FormControlLabel
                  value={"off"}
                  control={<Radio />}
                  label={t("off")}
                />
                <FormControlLabel
                  value={"auto"}
                  control={<Radio />}
                  label={t("auto")}
                />
                <FormControlLabel
                  value={"specialRule"}
                  control={<Radio />}
                  label={t("specialRule")}
                />
              </RadioGroup>
            </FormControl>
            {display === "specialRule" && (
              <TextField
                size="small"
                fullWidth
                variant="filled"
                onChange={(e) =>
                  dispatch(
                    changeApplicationField({
                      catid: catId,
                      id: appKey,
                      field: "display",
                      value: e.target.value,
                    })
                  )
                }
                value={app.options.display}
              />
            )}
          </>
        }
      />
    </Card>
  );
}

function CatCard({
  catId,
  cardIndex,
  dataLength,
  data,
  dispatch,
  portal,
}: {
  catId: string;
  cardIndex: number;
  dataLength: number;
  data: Record<
    string,
    string | number | Record<string, string | number | Record<string, string>>
  >;
  dispatch: Function;
  portal: string;
}) {
  const applications = Object.keys(data)
    .filter((key) => typeof data[key] === "object")
    .sort(
      (key1, key2) =>
        Number((data[key1] as Record<string, number>).order) -
        Number((data[key2] as Record<string, number>).order)
    );
  return (
    <Card className="catCard">
      <CardHeader
        className="catHeader"
        title={
          <>
            <TextField
              size="small"
              value={data.catname}
              onChange={(e) =>
                dispatch(renameCategory({ id: catId, newname: e.target.value }))
              }
            />
            <>
              <IconButton
                onClick={() =>
                  dispatch(moveCat({ category: catId, direction: "up" }))
                }
                disabled={cardIndex === 0}
              >
                <ArrowUpwardOutlinedIcon />
              </IconButton>
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
              <IconButton onClick={() => dispatch(delCategory(catId))}>
                <RemoveOutlinedIcon />
              </IconButton>
            </>
          </>
        }
      />
      <CardContent className="applications">
        {applications.map((key, index) => {
          if (typeof data[key] === "object") {
            const app = data[key] as Record<string, Record<string, string>>;
            return (
              <MenuAppCard
                key={index}
                app={app}
                cardIndex={cardIndex}
                catId={catId}
                portal={portal}
                appKey={key}
                appIndex={index}
                applications={applications}
                dispatch={dispatch}
              />
            );
          }
          return null;
        })}
        <Button onClick={() => dispatch(newApplication(catId))}>
          <AddOutlinedIcon color="secondary" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function CatAndAppList() {
  const dispatch = useAppDispatch();
  const applicationList =
    useAppSelector((state) => state.config.data.config.applicationList) || {};
  const portal = useAppSelector((state) => state.config.data.config.portal);
  const catList = Object.keys(applicationList)
    .filter((key) => typeof applicationList[key] === "object")
    .sort(
      (key1, key2) =>
        Number((applicationList[key1] as Record<string, number>).order) -
        Number((applicationList[key2] as Record<string, number>).order)
    );
  return (
    <div>
      <div className="top">
        <HomeButton />
        <strong className="title">
          {t("applicationList")}
          <Button onClick={() => dispatch(newCategory())}>
            <AddOutlinedIcon fontSize="large" color="secondary" />
          </Button>
        </strong>
      </div>
      <div>
        {catList.map((key, index) => (
          <CatCard
            key={index}
            catId={key}
            cardIndex={index}
            dataLength={catList.length}
            data={applicationList[key]}
            dispatch={dispatch}
            portal={portal || attributes.portal.default}
          />
        ))}

        <Button onClick={() => dispatch(newCategory())}>
          <AddOutlinedIcon fontSize="large" color="secondary" />
        </Button>
      </div>
    </div>
  );
}
