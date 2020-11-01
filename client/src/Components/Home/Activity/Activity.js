import React, { useState } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import MyCard from "../../UI/MyCard/MyCard";
import Spinner from "../../UI/Spinner/Spinner";
import "./Activity.css";

const Activity = (props) => {
  const [data, setData] = useState([
    { name: "Push Ups", count: "89", checked: true },
    { name: "Pull Ups", count: "70", checked: true },
    { name: "Squats", count: "759", checked: true },
    { name: "Lunges", count: "89", checked: false },
    { name: "Planks", count: "70", checked: false },
    { name: "Dumbbell", count: "759", checked: false },
  ]);

  const [dataCopy, setDataCopy] = useState([
    { name: "Push Ups", count: "89", checked: true },
    { name: "Pull Ups", count: "70", checked: true },
    { name: "Squats", count: "759", checked: true },
    { name: "Lunges", count: "89", checked: false },
    { name: "Planks", count: "70", checked: false },
    { name: "Dumbbell", count: "759", checked: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [show, setShow] = useState(false);

  const changeHandler = (event, index) => {
    // console.log(index);
    event.preventDefault();
    let copy = dataCopy;
    copy[index].checked = !copy[index].checked;

    setDataCopy([...copy]);
  };

  const add = (event) => {
    event.preventDefault();
    setAddLoading(true);

    setTimeout(() => {
      setData((prev) => [...dataCopy]);
      setAddLoading(false);
      setShow(false);
    }, 2000);
  };
  console.log(dataCopy);
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
        <h6 className="remove-para-margin cursor-pointer white">
          Activity Points : 47
        </h6>
      </div>
      <br />
      {show ? (
        <div className="flex-column">
          <div className="flex-row flex-wrap activities-container">
            {dataCopy.map((el, index) => (
              <Col
                key={index}
                className="cursor-pointer hover-shrink margin-10 activity-card"
              >
                <MyCard
                  titleStyle={{ color: "white", textTransform: "capitalize" }}
                  title={el.name}
                  className="bg-black-half-opacity box-shadow-none"
                  onClick={(e) => changeHandler(e, index)}
                >
                  <div className="checkbox-card">
                    <FormGroup check>
                      <Label check>
                        <Input
                          checked={dataCopy[index].checked}
                          value={dataCopy[index].checked}
                          name={dataCopy[index].name}
                          onChange={(e) => changeHandler(e, index)}
                          type="checkbox"
                        />
                        <span className="form-check-sign" />
                      </Label>
                    </FormGroup>
                  </div>
                  <h4 className="text-center break-word white">{el.count}</h4>
                </MyCard>
              </Col>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-column">
          <div className="flex-row flex-wrap activities-container">
            {data.map((el, index) =>
              el.checked ? (
                <Col
                  key={index}
                  className="cursor-pointer hover-shrink margin-10 activity-card"
                >
                  <MyCard
                    titleStyle={{ color: "white", textTransform: "capitalize" }}
                    title={el.name}
                    className="bg-black-half-opacity box-shadow-none"
                  >
                    <h4 className="text-center break-word white">{el.count}</h4>
                  </MyCard>
                </Col>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
