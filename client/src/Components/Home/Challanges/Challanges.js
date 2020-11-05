import React, { useState } from "react";
import "./Challanges.css";

const Challanges = (props) => {
  const [daily, setDaily] = useState([
    { name: "Pushups", count: 30, total: 30 },
    { name: "Pullups", count: 5, total: 20 },
  ]);
  const [weekly, setWeekly] = useState([
    { name: "Pushups", count: 210, total: 330 },
    { name: "Pullups", count: 165, total: 220 },
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
          {daily.map((el) => (
            <div className="my-each-challange flex-row flex-wrap bg-grey bg-half-opacity">
              <h4 className="challange-name text-left">{el.name}</h4>
              <div className="counts flex-center flex-row flex-wrap">
                <div className="flex-column progress-container">
                  <div className="text-left">
                    {((el.count / el.total) * 100).toFixed(0) + "%"}
                  </div>
                  <div className="progress">
                    <div
                      style={{ width: (el.count / el.total) * 100 + "%" }}
                    ></div>
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
          {weekly.map((el) => (
            <div className="my-each-challange flex-row flex-wrap bg-grey bg-half-opacity">
              <h4 className="challange-name text-left">{el.name}</h4>
              <div className="counts flex-center flex-row flex-wrap">
                <div className="flex-column progress-container">
                  <div className="text-left">
                    {((el.count / el.total) * 100).toFixed(0) + "%"}
                  </div>
                  <div className="progress">
                    <div
                      style={{ width: (el.count / el.total) * 100 + "%" }}
                    ></div>
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
