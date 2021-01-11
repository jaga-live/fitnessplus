import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import { getImage } from "../Profile/getImage";
import "./Leaderboard.css";
import Gold from "../../../assets/gold.png";
import Silver from "../../../assets/silver.png";
import Bronze from "../../../assets/bronze.png";

const Leaderboard = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/viewleaderboard")
      .then((res) => {
        setLoading(false);
        setData([...res.data]);
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
      });
  }, []);

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <h4 className="white">
        Activity <span className="h2 red">LeaderBoard</span>
      </h4>
      <br />
      <div className="flex-column">
        {data.length === 0 ? (
          <h4 className="white">. . .</h4>
        ) : (
          data.map((el, index) => (
            <div
              key={index}
              className="d-flex justify-content-between bg-grey vertical-flex-center each-leaderboard bg-half-opacity"
            >
              <div className="fit-content flex-row vertical-flex-center">
                <div
                  className="small-logo margin-10"
                  style={{
                    backgroundImage:
                      "url('" +
                      getImage(el.avatar === null ? 0 : el.avatar) +
                      "')",
                  }}
                ></div>
                <div
                  className="category"
                  style={{
                    backgroundImage:
                      `url(` +
                      (index === 0
                        ? Gold
                        : index === 1
                        ? Silver
                        : index === 2
                        ? Bronze
                        : null) +
                      `)`,
                  }}
                ></div>
                <h4>{el.name}</h4>
              </div>
              <h4 className="fit-content margin-10">{el.activityPoint}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
