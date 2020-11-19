import React from "react";
import "./Mobile.css";
import Android from "../../../assets/android.png";
import Apple from "../../../assets/apple.png";

const Mobile = (props) => {
  return (
    <div>
      <div className="flex-center flex-column mobile-message">
        <div className="h2">
          Under <span className="red">Development</span>
        </div>
        <p className="bold">
          We are currently developing a mobile app which tracks your Health data
          directly from your iOS, Android devices and Smart Watch.
        </p>
        <div className="flex-row flex-center flex-wrap">
          <img src={Android} className="mobile-images" />
          <img src={Apple} className="mobile-images" />
        </div>
        <p className="bold">We will notify you once it is ready to use 😽</p>
      </div>
    </div>
  );
};

export default Mobile;
