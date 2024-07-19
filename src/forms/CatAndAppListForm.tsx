import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { newCategory } from "../features/config/configSlice";

export default function CatAndAppListForm({
  values,
  dispatch,
}: {
  values: Record<
    string,
    Record<string, string | Record<string, Record<string, string> | number>>
  >;
  dispatch: Function;
}) {
  return (
    <tr>
      <td>
        {Object.keys(values)
          .sort((key1, key2) => {
            return (
              Number(
                (
                  values[key1] as Record<
                    string,
                    string | Record<string, Record<string, string> | number>
                  >
                ).order
              ) -
              Number(
                (
                  values[key2] as Record<
                    string,
                    string | Record<string, Record<string, string> | number>
                  >
                ).order
              )
            );
          })
          .map((key) => (
            <ul key={key}>
              <li>
                {typeof values[key].catname === "string"
                  ? (values[key].catname as string)
                  : ""}
              </li>
              <ul>
                {Object.keys(values[key])
                  .filter((el) => typeof values[key][el] === "object")
                  .sort((key1, key2) => {
                    const order1 = (values[key][key1] as Record<string, number>)
                      .order;
                    const order2 = (values[key][key2] as Record<string, number>)
                      .order;
                    return (order1 ?? 0) - (order2 ?? 0);
                  })
                  .map((el) =>
                    typeof values[key][el] === "object" ? (
                      <li key={el}>
                        {
                          (
                            values[key][el] as Record<
                              string,
                              Record<string, string>
                            >
                          ).options.name
                        }
                      </li>
                    ) : (
                      <></>
                    )
                  )}
              </ul>
            </ul>
          ))}
        <IconButton className="plus" onClick={() => dispatch(newCategory())}>
          <AddCircleIcon color="success" />
        </IconButton>
      </td>
    </tr>
  );
}
