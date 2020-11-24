import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import MyCard from "../../../UI/MyCard/MyCard";
import { axiosInstance } from "../../../Utility/axiosInstance";
import EachInvite from "./EachInvite/EachInvite";
import "./Requests.css";

const Requests = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [received, setReceived] = useState(true);

  // request_sent, request_received

  var indicator, activeRoute, navItems;

  useEffect(() => {
    indicator = document.querySelector(".my-indicator");
    activeRoute = document.querySelector(".my-active");
    navItems = document.querySelectorAll(".my-nav-item");
    let width = activeRoute.scrollWidth;
    let height = activeRoute.scrollHeight;
    indicator.style.width = width + 20 + "px";
    indicator.style.height = height + 20 + "px";
    let top = activeRoute.offsetTop - 10;
    let left = activeRoute.offsetLeft + 50;
    indicator.style.position = "absolute";
    indicator.style.top = top + "px";
    indicator.style.left = left + "px";

    setLoading(true);
    axiosInstance
      .post("/request_received")
      .then((res) => {
        setLoading(false);
        setData([...res.data]);
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
      });
  }, []);

  const onClick = (event, url) => {
    indicator = document.querySelector(".my-indicator");
    navItems = document.querySelectorAll(".my-nav-item");
    navItems.forEach((el) => el.classList.remove("my-active"));
    event.target.classList.add("my-active");
    let element = document.querySelector(".my-active");
    let top = element.offsetTop - 10;
    let left = element.offsetLeft - 10;
    indicator.style.position = "absolute";
    indicator.style.top = top + "px";
    indicator.style.left = left + "px";

    setReceived((prev) => !prev);
    setLoading(true);
    axiosInstance
      .post(url)
      .then((res) => {
        setLoading(false);
        setData([...res.data]);
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
      });
  };

  const afterSuccess = (index) => {
    setData((prev) => [...prev.filter((el, ind) => ind !== index)]);
  };

  return (
    <div>
      <MyCard className="flex-column flex-center requests brief-card-requests">
        <div className="flex-row request-nav-container">
          <div
            onClick={(event) => onClick(event, "/request_received")}
            className="my-active my-nav-item white"
          >
            Recieved
          </div>
          <div
            onClick={(event) => onClick(event, "/request_sent")}
            className="my-nav-item white"
          >
            Sent
          </div>
          <div className="my-indicator"></div>
        </div>
        <br />
        <div className="white req-content">
          {loading ? (
            <div style={{ margin: "auto", width: "fit-content" }}>
              <Spinner />
            </div>
          ) : data.length === 0 ? (
            <h4 className="white text-center">No Data !</h4>
          ) : (
            data.map((el, index) => (
              <EachInvite
                afterSuccess={afterSuccess}
                data={el}
                key={index}
                index={index}
                received={received}
              />
            ))
          )}
        </div>
      </MyCard>
    </div>
  );
};

export default Requests;
