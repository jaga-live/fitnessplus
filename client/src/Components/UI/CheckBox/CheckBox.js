import React from "react";
import "./CheckBox.css";

const CheckBox = (props) => {
  return (
    <div className="round">
      <input
        type="checkbox"
        id={props.name}
        onChange={props.onChange}
        name={props.name}
        checked={props.checked}
      />
      <label htmlFor={props.name}></label>
      <span style={{ marginLeft: "28px" }}>{props.displayName}</span>
    </div>
  );
};

export default CheckBox;
