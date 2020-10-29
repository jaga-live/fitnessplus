import React from "react";
import "./Alert.css";
import Success from "./Gifs/success2.gif";
import Error from "./Gifs/error.gif";

const Alert = (props) => {
  return props.show ? (
    <div className="alert-container" onClick={() => props.hideAlert()}>
      <div
        className={
          "alert-mini-container " +
          (props.type === "success"
            ? "success-bg"
            : props.type === "error"
            ? "error-bg"
            : "white-bg")
        }
      >
        <h4 className="alert-message">{props.message}</h4>
        <div
          className="alert"
          style={{
            backgroundImage:
              `url('` +
              (props.type === "success"
                ? Success
                : props.type === "error"
                ? Error
                : Error) +
              `')`,
          }}
        ></div>
        <button onClick={() => props.hideAlert()} className="alert-button">
          {props.confirmButtonText ? props.confirmButtonText : "OK"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Alert;
