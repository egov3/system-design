import type React from "react";

export const CardWrapperItem = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      minHeight: "100px",
    }}
  >
    <div
      style={{
        backgroundColor: "bisque",
        padding: "9px",
        display: "flex",
        width: "80%",
        flexDirection: "column",
        borderRadius: "20px",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </div>
);
