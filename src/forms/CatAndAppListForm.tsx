export default function CatAndAppListForm({
  values,
}: {
  values: Record<
    string,
    Record<string, string | Record<string, Record<string, string>>>
  >;
}) {
  return (
    <tr>
      <td>
        {Object.keys(values)
          .sort((key1, key2) => {
            console.log(key1, key2);
            return (
              Number(
                (
                  values[key1] as Record<
                    string,
                    string | Record<string, Record<string, string | number>>
                  >
                ).order
              ) -
              Number(
                (
                  values[key2] as Record<
                    string,
                    string | Record<string, Record<string, string | number>>
                  >
                ).order
              )
            );
          })
          .map((key) => (
            <>
              <ul>
                <li>
                  {typeof values[key].catname === "string"
                    ? (values[key].catname as string)
                    : ""}
                </li>
                <ul>
                  {Object.keys(values[key])
                    .sort((key1, key2) => {
                      console.log(key1, key2);
                      return (
                        Number(
                          (
                            values[key][key1] as Record<
                              string,
                              Record<string, string>
                            >
                          ).order
                        ) -
                        Number(
                          (
                            values[key][key2] as Record<
                              string,
                              Record<string, string>
                            >
                          ).order
                        )
                      );
                    })
                    .map((el) =>
                      typeof values[key][el] === "object" ? (
                        <li>
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
            </>
          ))}
      </td>
    </tr>
  );
}
