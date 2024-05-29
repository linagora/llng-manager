import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import definitions from "../../static/definitions.json";
import { llngConfig } from "../../utils/types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function IssuerOption({
  open,
  setOpen,
  type,
}: {
  open: boolean;
  setOpen: Function;
  type: string;
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const config = useAppSelector((state) => state.config.data.config);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {t(type)}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <Tooltip
            title={
              <Markdown>
                {(definitions[(type + "Activation") as keyof typeof definitions]
                  ? definitions[
                      (type + "Activation") as keyof typeof definitions
                    ]
                  : "") + ""}
              </Markdown>
            }
          >
            <strong className="title3">{t(type + "Activation")}</strong>
          </Tooltip>
          <FormControl>
            <RadioGroup
              row
              value={
                config[(type + "Activation") as keyof llngConfig] ? true : false
              }
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={t("on")}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={t("off")}
              />
            </RadioGroup>
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem>
          <Tooltip
            title={
              <Markdown>
                {(definitions[(type + "Path") as keyof typeof definitions]
                  ? definitions[(type + "Path") as keyof typeof definitions]
                  : "") + ""}
              </Markdown>
            }
          >
            <strong className="title3">{t(type + "Path")}</strong>
          </Tooltip>
          <FormControl>
            <TextField value={config[(type + "Path") as keyof llngConfig]} />
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem>
          <Tooltip
            title={
              <Markdown>
                {(definitions[(type + "Rule") as keyof typeof definitions]
                  ? definitions[(type + "Rule") as keyof typeof definitions]
                  : "") + ""}
              </Markdown>
            }
          >
            <strong className="title3">{t(type + "Rule")}</strong>
          </Tooltip>
          <FormControl>
            <RadioGroup row>
              <FormControlLabel value={1} control={<Radio />} label={t("on")} />
              <FormControlLabel
                value={0}
                control={<Radio />}
                label={t("off")}
              />
              <FormControlLabel
                value={-1}
                control={<Radio />}
                label={t("specialRule")}
              />
            </RadioGroup>
            <TextField
              sx={{ visibility: type ? "visible" : "hidden" }}
              size="small"
              margin="normal"
              multiline
              variant="filled"
              fullWidth
              rows={3}
            />
          </FormControl>
        </ListItem>
        <Divider />
      </List>
    </Dialog>
  );
}
