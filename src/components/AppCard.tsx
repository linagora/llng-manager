import React from "react";

function AppCard({
  info,
  issuer,
  issue,
}: {
  info: any;
  issuer: boolean;
  issue: boolean;
}) {
  return (
    <div className={`card ${!issuer || issue ? "issue" : ""}`} key={info.name}>
      <p>
        <strong>{info.name}</strong>
      </p>
      <p>
        description mais pour l'instant c'est pas les vrais données parce que
        c'est moche
      </p>
    </div>
  );
}

export default AppCard;
