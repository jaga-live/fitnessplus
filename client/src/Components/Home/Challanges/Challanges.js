import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import "./Challanges.css";
import Progress from "./progress";

const Challanges = (props) => {
  const [loading, setLoading] = useState(false);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    setLoading(true);
    console.log({
      date:
        new Date().getDate() +
        "-" +
        (parseInt(new Date().getMonth()) + 1) +
        "-" +
        new Date().getFullYear(),
    });
    axiosInstance
      .post("/viewchallenge", {
        date:
          new Date().getDate() +
          "-" +
          (parseInt(new Date().getMonth()) + 1) +
          "-" +
          new Date().getFullYear(),
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setDaily([
          ...res.data.map((el) => ({
            ...el,
            count: el.count > el.total ? el.total : el.count,
          })),
        ]);
      })
      .catch((err) => {
        setLoading(false);
        setDaily([]);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : daily.length === 0 ? (
    <h4 className="white">
      No <span className="red"> Challanges </span>
    </h4>
  ) : (
    <div>
      <div className="white h4">
        Today's <span className="h2 red">Challenges</span>
      </div>
      <div className="flex-column challanges-container">
        <div className="white h4 text-left">
          Challenges - <span className="h2 red">Daily</span>
        </div>
        <div className="bars flex-column">
          {daily.map((el, index) => (
            <div
              key={index}
              className="my-each-challange flex-row flex-wrap bg-grey bg-half-opacity"
            >
              <div className="challange-name text-left vertical-flex-center">
                <h4>{el.name}</h4>
              </div>
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
