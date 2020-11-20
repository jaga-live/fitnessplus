import React, { useState } from "react";
import { Input } from "reactstrap";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import FormInfo from "../../../UI/FormInfo/FormInfo";
import MyCard from "../../../UI/MyCard/MyCard";
import SelectInput from "../../../UI/Select/Select";
import { axiosInstance } from "../../../Utility/axiosInstance";
import "./Add.css";

const Add = (props) => {
  const [formData, setFormData] = useState({
    workoutName: "",
    count: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    display: false,
    message: "afsafd ",
    color: null,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const submitData = {
      ...formData,
      date: formData.date.split("-").reverse().join("-"),
      time: new Date(...formData.date.split("-")).getTime(),
    };
    axiosInstance
      .post("/addchallenge", submitData)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setFormData({
          workoutName: "",
          count: "",
          date: "",
        });
        setMessage({ display: true, message: "Success", color: "#4fb664" });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage({ display: true, message: "Error", color: "tomato" });
      });
  };

  const valid = () => {
    return Object.values(formData).every((el) => el.trim() !== "");
  };

  console.log(formData);

  return (
    <div className="white">
      <MyCard
        className="bg-black-half-opacity box-shadow-none"
        style={{ maxWidth: "80%", margin: "auto" }}
        titleCenter
        title="ADD CHALLENGE"
      >
        <form onSubmit={submitHandler}>
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
          <br />
          <Input
            type="number"
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
        </form>
      </MyCard>
    </div>
  );
};

export default Add;
