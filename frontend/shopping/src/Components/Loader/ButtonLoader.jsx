import React from "react";
import { ThreeDot } from "react-loading-indicators";

const ButtonLoader = () => {
  return (
    <div
      style={{
        transform: "scale(0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20px",
      }}
    >
      <ThreeDot
        variant="brick-stack"
        color="#fff"
      />
    </div>
  );
};

export default ButtonLoader;