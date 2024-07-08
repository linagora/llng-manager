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
        {Object.keys(values).map((key) => (
          <>
            <ul>
              <li>
                {typeof values[key].catname === "string"
                  ? (values[key].catname as string)
                  : ""}
              </li>
              <ul>
                {Object.keys(values[key]).map((el) =>
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
