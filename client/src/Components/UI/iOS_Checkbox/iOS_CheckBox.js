import React from "react";
import "./iOS_Checkbox.css";

const iOS_Checkbox = (props) => {
  return (
    <div className={"toggleWrapper " + props.className}>
      <input
        type="checkbox"
        {...props}
        disabled={props.disabled || props.loading}
        className="mobileToggle"
      />

      <label for={props.id}></label>
    </div>
  );
};

export default iOS_Checkbox;
