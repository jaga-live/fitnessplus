import React, { useState } from "react";
import { Input } from "reactstrap";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import MyCard from "../../../../UI/MyCard/MyCard";
import SelectInput from "../../../../UI/Select/Select";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import "./EachView.css";

const EachView = (props) => {
  const [formData, setFormData] = useState({ ...props.data });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    display: false,
    message: "afsafd ",
    color: null,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const submitData = props.entireData.map((el, index) => {
      if (index === props.index) {
        return {
          ...formData,
          date: formData.date.split("-").reverse().join("-"),
          time: new Date(...formData.date.split("-")).getTime(),
        };
      }
      return el;
    });
    axiosInstance
      .post("/addchallenge", submitData)
      .then((res) => {
        setLoading(false);
        setMessage({ display: true, message: "Success", color: "#4fb664" });
      })
      .catch((err) => {
        setLoading(false);
        setMessage({ display: true, message: "Error", color: "tomato" });
      });
  };

  const valid = () => {
    return props.edit
      ? Object.values(formData).every((el) => el.toString().trim() !== "")
      : true;
  };

  return (
    <div className="white">
      <MyCard
        className="bg-black-half-opacity box-shadow-none"
        style={{ maxWidth: "80%", margin: "auto" }}
        titleCenter
      >
        <form onSubmit={submitHandler}>
          {props.edit ? (
            <SelectInput
              className="select"
              name="workoutName"
              value={formData.workoutName}
              onChange={(value) => {
                setMessage({ display: false, message: " ", color: "red" });
                setFormData((prev) => ({ ...prev, workoutName: value }));
              }}
              placeholder="Choose Workout"
              options={[
                "Push Ups",
                "Pull Ups",
                "Squats",
                "Lunges",
                "Planks",
                "Dumbles",
              ]}
            />
          ) : (
            <Input disabled value={formData.workoutName} />
          )}
          <br />
          <Input
            type="number"
            disabled={!props.edit}
            name="count"
            placeholder="Count"
            value={formData.count}
            onChange={(event) => {
              setMessage({ display: false, message: " ", color: "red" });
              setFormData((prev) => ({
                ...prev,
                count: event.target.value < 0 ? 0 : event.target.value,
              }));
            }}
            className="my-input"
          />
          <br />
          <Input
            type="date"
            name="date"
            disabled={!props.edit}
            min={
              new Date(
                new Date().getDate() +
                  "-" +
                  (parseInt(new Date().getMonth()) + 1) +
                  "-" +
                  new Date().getFullYear()
              )
            }
            placeholder="Date"
            value={formData.date}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                date: event.target.value,
              }))
            }
            className="my-input"
          />
          <br />
          <div className="flex-row">
            {props.edit ? (
              <AsyncButton
                className="box-shadow-none bg-green"
                style={{ background: "#4fb664", color: "white" }}
                disabled={!valid()}
                loading={loading}
                type="submit"
              >
                {message.display ? message.message : "Add"}
                {/* <FormInfo info={message.message} color="white" /> */}
              </AsyncButton>
            ) : null}
            <AsyncButton
              className="box-shadow-none bg-green"
              style={{ background: props.edit ? "red" : "#4fb664" }}
              type="button"
              onClick={() => props.onClick(props.index)}
            >
              {props.edit ? "Cancel" : "Edit"}
            </AsyncButton>
          </div>
        </form>
      </MyCard>
    </div>
  );
};

export default EachView;
