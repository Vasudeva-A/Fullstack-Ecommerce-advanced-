import React from "react";
import { ThreeDot } from "react-loading-indicators";
const Loader = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeDot
        variant="brick-stack"
        color="#317bcc"
        size="medium"
        text="Wait  a while .."
        textColor="#7f7474"
      />
    </div>
  );
};

export default Loader;
