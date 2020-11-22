import React, { Fragment, useEffect, useState } from "react";
import { axiosInstance } from "../../../Utility/axiosInstance";
import { getImage } from "../../Profile/getImage";
import { Spinner } from "reactstrap";
import "./Detail.css";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";

const Detail = (props) => {
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    avatar: null,
    activityPoint: "",
    private: false,
    outgoing: false,
    isFriend: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .post("/viewsingleperson", { friendId: props.data._id })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setData({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setData(null);
      });
  };

  const sendRequest = () => {
    setSubmitLoading(true);
    axiosInstance
      .post("/sendrequest", {
        friendId: props.data._id,
        date:
          new Date().getDate() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getFullYear(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
      })
      .then((res) => {
        console.log(res.data);
        setSubmitLoading(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoading(false);
        fetchData();
      });
  };

  return (
    <div className="flex-center white flex-column brief">
      {loading ? (
        <Spinner />
      ) : data === null ? (
        <h4>Something is Wrong !</h4>
      ) : (
        <Fragment>
          <img
            className="brief-avatar"
            src={getImage(data.avatar === null ? 0 : data.avatar)}
          />
          <br />
          <div className="text-center white">
            {data.name}
            <br />
            <br />
            {data.private && !data.isFriend ? (
              <div className="text-center white">Account is Private 🔒</div>
            ) : (
              `Activity Point: ${data.activityPoint}`
            )}
            <br />
            <br />
          </div>
          {data.isFriend ? (
            <div className="text-center">
              Friends <span className="#4fb664">✔</span>
            </div>
          ) : (
            <AsyncButton
              loading={submitLoading}
              style={{ backgroundColor: "#4fb664", fontSize: 15 }}
              disabled={submitLoading}
              onClick={data.outgoing ? () => {} : () => sendRequest()}
              className="bg-green box-shadow-none"
            >
              {data.outgoing ? "Pending" : "+Request"}
            </AsyncButton>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Detail;
