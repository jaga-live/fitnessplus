import React, { useState } from "react";
import "./EachNotification.css";

const EachNotification = (props) => {
  return (
    <div
      className="white each-notification flex-column"
      onClick={() => props.onClick(props.data)}
    >
      <div className="flex-row">
        <div className="notification-message text-left">
          {props.data.message}
        </div>
        {props.data.notify ? (
          <div className="notification-indicator-container">
            <div></div>
          </div>
        ) : null}
      </div>
      <div className="date-time-container">
        <div className="notification-date text-left">{props.data.date}</div>
        <div className="notification-time text-left">{props.data.time}</div>
      </div>
    </div>
  );
};

export default EachNotification;
