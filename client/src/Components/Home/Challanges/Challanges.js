import React, { useState } from "react";
import "./Challanges.css";
import Progress from "./progress";

const Challanges = (props) => {
  const [daily, setDaily] = useState([
    { name: "Pushups", count: 30, total: 30, percentage: 0 },
    { name: "Pullups", count: 5, total: 20, percentage: 0 },
  ]);
  const [weekly, setWeekly] = useState([
    { name: "Pushups", count: 210, total: 330, percentage: 0 },
    { name: "Pullups", count: 165, total: 220, percentage: 0 },
  ]);

  return (
    <div>
      <div className="white h4">
        Today's <span className="h2 red">Challanges</span>
      </div>
      <div className="flex-column challanges-container">
        <div className="white h4 text-left">
          Challanges - <span className="h2 red">Daily</span>
        </div>
        <div className="bars flex-column">
          {daily.map((el, index) => (
            <div
              key={index}
              className="my-each-challange flex-row flex-wrap bg-grey bg-half-opacity"
            >
              <h4 className="challange-name text-left">{el.name}</h4>
              <div className="counts flex-center flex-row flex-wrap">
                <div className="flex-column progress-container">
                  <div className="text-left">
                    {((el.count / el.total) * 100).toFixed(0) + "%"}
                  </div>
                  <div className="progress">
                    <Progress progress={(el.count / el.total) * 100} />
                  </div>
                </div>
                <h4 className="count">{el.count + "/" + el.total}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="seperator"></div>
      <div className="flex-column challanges-container">
        <div className="white h4 text-left">
          Challanges - <span className="h2 red">Weekly</span>
        </div>
        <div className="bars flex-column">
          {weekly.map((el, index) => (
            <div
              key={index}
              className="my-each-challange flex-row flex-wrap bg-grey bg-half-opacity"
            >
              <h4 className="challange-name text-left">{el.name}</h4>
              <div className="counts flex-center flex-row flex-wrap">
                <div className="flex-column progress-container">
                  <div className="text-left">
                    {((el.count / el.total) * 100).toFixed(0) + "%"}
                  </div>
                  <div className="progress">
                    <Progress progress={(el.count / el.total) * 100} />
                  </div>
                </div>
                <h4 className="count">{el.count + "/" + el.total}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challanges;
