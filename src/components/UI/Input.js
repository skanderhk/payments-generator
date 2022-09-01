import React from "react";

function Input({ span, type, placeholder, onValueChange }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <span
        style={{
          fontSize: "small",
        }}
      >
        {span}
      </span>
      <input
        style={{
          padding: 10,
          borderRadius: 10,
          marginBlock: 10,
          border: "1px solid #001430",
          backgroundColor: "rgb(0,0,0,0)",
          color: "#001430",
        }}
        type={type}
        placeholder={placeholder || ""}
        onChange={onValueChange}
      />
    </div>
  );
}

export default Input;
