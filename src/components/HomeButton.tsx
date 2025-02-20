import { useAppDispatch } from "../app/hooks";
import "./SaveButton.css";
import HomeIcon from "@mui/icons-material/Home";
import { push } from "redux-first-history";
import { IconButton } from "@mui/material";
export default function HomeButton() {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      size="large"
      onClick={() => {
        dispatch(push(`#conf/latest`));
      }}
    >
      <HomeIcon />
    </IconButton>
  );
}
