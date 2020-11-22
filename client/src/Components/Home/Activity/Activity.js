import React, { useEffect, useState } from "react";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import { removeDupicatesFromArrayOfObjects } from "../../Utility/removeDupicatesFromArrayOfObjects";
import "./Activity.css";
import EachActivity from "./EachActivity/EachActivity";

const Activity = (props) => {
  const [data, setData] = useState([
    { name: "Push Ups", count: 0, checked: true },
    { name: "Pull Ups", count: 0, checked: true },
    { name: "Squats", count: 0, checked: true },
  ]);
  const [dataCopy, setDataCopy] = useState([
    { name: "Push Ups", count: 0, checked: false },
    { name: "Pull Ups", count: 0, checked: false },
    { name: "Squats", count: 0, checked: false },
    { name: "Lunges", count: 0, checked: false },
    { name: "Planks", count: 0, checked: false },
    { name: "Dumbles", count: 0, checked: false },
  ]);
  const [activityPoint, setActivityPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [status, setStatus] = useState({ name: "", index: "" });
  const [show, setShow] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .post("/viewactivity", { time: Date.now() })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setActivityPoint(res.data.activityPoint);
        setData([...res.data.workouts.map((el) => ({ ...el, checked: true }))]);
        setDataCopy((prev) =>
          removeDupicatesFromArrayOfObjects(
            [
              ...res.data.workouts.map((el) => ({ ...el, checked: true })),
              ...prev.map((el) => ({ ...el, count: 0 })),
            ],
            "name"
          )
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeHandler = (event, index) => {
    event.preventDefault();
    let copy = dataCopy;
    copy[index].checked = !copy[index].checked;

    setDataCopy([...copy]);
  };

  const onUpdateCount = (updatedData, index) => {
    setStatus({ name: "loading", index: index });
    axiosInstance
      .post("/updateactivity", { workouts: updatedData, time: Date.now() })
      .then((res) => {
        console.log(res.data);
        setStatus({ name: "success", index: index });
        setTimeout(() => {
          setStatus({ name: "", index: index });
          fetchData();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ name: "failure", index: index });
        setTimeout(() => {
          setStatus({ name: "", index: index });
          fetchData();
        }, 1000);
      }, 2000);
  };

  const add = (event) => {
    event.preventDefault();
    setAddLoading(true);
    axiosInstance
      .post("/updateactivity", {
        workouts: dataCopy.filter((el) => el.checked === true),
        time: Date.now(),
      })
      .then((res) => {
        console.log(res.data);
        setAddLoading(false);
        setShow(false);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        setAddLoading(false);
      });

    // setTimeout(() => {
    //   setData((prev) => [
    //     ...dataCopy.map((el) => ({ ...el, count: el.checked ? el.count : 0 })),
    //   ]);
    //   setAddLoading(false);
    //   setShow(false);
    // }, 2000);
  };
  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <div className="d-flex justify-content-between each-activity vertical-flex-center">
        <div className="fit-content">
          <AsyncButton
            loading={addLoading}
            onClick={show ? (event) => add(event) : () => setShow(true)}
            className="sm bg-shade-green box-shadow-none"
          >
            <p className="white remove-para-margin">
              {show ? "Done" : "+ Edit Activity"}
            </p>{" "}
          </AsyncButton>
        </div>
        <h4 className="white">
          Activity <span className="h2 red">Today</span>
        </h4>
        <h5 className="remove-para-margin cursor-pointer white">
          Activity <span className="red">Points</span> :{" "}
          <span className="h4">{activityPoint}</span>
        </h5>
      </div>
      <br />
      {show ? (
        <div className="flex-column">
          <div className="flex-row flex-wrap activities-container">
            {dataCopy.map((el, index) => (
              <EachActivity
                key={index}
                show={show}
                changeHandler={(e) => changeHandler(e, index)}
                data={el}
                dataCopy={dataCopy[index]}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-column">
          <div className="flex-row flex-wrap activities-container">
            {data.map((el, index) =>
              el.checked ? (
                <EachActivity
                  status={status}
                  onUpdateCount={onUpdateCount}
                  originalData={data}
                  key={index}
                  show={show}
                  changeHandler={(e) => changeHandler(e, index)}
                  data={el}
                  dataCopy={dataCopy[index]}
                  index={index}
                />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// const mapStateToProps = state =>

export default Activity;
