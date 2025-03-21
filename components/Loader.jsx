import React from "react";
import { PropagateLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="loading">
      <PropagateLoader color="#09f603" />
    </div>
  );
}
