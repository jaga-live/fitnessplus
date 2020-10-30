import React, { useState } from "react";
import { Col, Input } from "reactstrap";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import MyCard from "../../UI/MyCard/MyCard";
import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import { getImage } from "../Profile/getImage";
import "./Activity.css";

const Activity = (props) => {
  const [data, setData] = useState([
    { name: "El Primo", count: "89" },
    { name: "Piper", count: "70" },
    { name: "Colt", count: "759" },
    { name: "Ninja", count: "2398" },
    { name: "Ninja", count: "2398" },
    { name: "Ninja", count: "2398" },
    { name: "Ninja", count: "2398" },
    { name: "Ninja", count: "2398" },
  ]);

  const [workoutData, setWorkoutData] = useState({
    name: "",
    count: "",
  });
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [show, setShow] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setWorkoutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const add = (event) => {
    event.preventDefault();
    setAddLoading(true);

    setTimeout(() => {
      setData((prev) => [...prev, { ...workoutData }]);
      setWorkoutData({ name: "", count: "" });
      setAddLoading(false);
      setShow(false);
    }, 2000);
  };

  const valid = () => {
    return Object.values(workoutData).every((el) => el.trim() !== "");
  };

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <Modal show={show} onClick={() => setShow(false)}>
        <MyCard
          title="Add New Workout"
          className="fit-content"
          titleStyle={{ fontSize: "15px" }}
        >
          <form onSubmit={add}>
            <Input
              value={workoutData.name}
              required
              name="name"
              placeholder="Workout Name"
              onChange={changeHandler}
            />
            <br />
            <Input
              value={workoutData.count}
              required
              name="count"
              type="number"
              placeholder="Workout Count"
              onChange={changeHandler}
            />
            <br />
            <AsyncButton disabled={!valid()} loading={addLoading} type="submit">
              Add
            </AsyncButton>
          </form>
        </MyCard>
      </Modal>
      <div className="d-flex justify-content-between each-activity vertical-flex-center">
        <div className="empty"></div>
        <h4>
          Activity <span className="h2">Today</span>
        </h4>
        <h6 className="remove-para-margin cursor-pointer">
          Activity Points : 47
        </h6>
      </div>
      <br />
      <div className="flex-column">
        <div className="flex-row flex-wrap activities-container">
          {data.map((el, index) => (
            <Col
              key={index}
              className="cursor-pointer hover-shrink margin-10 activity-card"
            >
              <MyCard
                titleStyle={{ color: "white", textTransform: "uppercase" }}
                title={el.name}
                className="bg-blue"
              >
                <h4 className="text-center break-word white">{el.count}</h4>
              </MyCard>
            </Col>
          ))}
        </div>
        <div>
          <br />
          <AsyncButton
            onClick={() => setShow(true)}
            className="sm bg-transparent box-shadow-none margin-auto"
          >
            {" "}
            <p className="blue remove-para-margin">+ Add More Workout</p>{" "}
          </AsyncButton>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Activity;
