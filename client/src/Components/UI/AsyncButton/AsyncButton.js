import React, { Fragment } from "react";
import SmallSpinner from "../SmallSpinner/SmallSpinner";

const AsyncButton = (props) => {
  let styles = {
    ...props.style,
  };
  if (props.loading) {
    styles = {
      ...props.style,
      paddingTop: "10px",
      paddingBottom: "10px",
    };
  }
  return (
    <button
      style={{ ...props.style }}
      disabled={props.disabled}
      className={
        props.loading
          ? "loading-style " +
            (props.className ? props.className : "bg-green lg")
          : props.className
          ? props.className
          : "bg-green lg"
      }
      type={props.type ? props.type : "button"}
      onClick={props.loading ? () => {} : props.onClick}
    >
      {props.loading ? (
        <Fragment>
          <SmallSpinner />
        </Fragment>
      ) : (
        props.children
      )}
    </button>
  );
};

export default AsyncButton;
