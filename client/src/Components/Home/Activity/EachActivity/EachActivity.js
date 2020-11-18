import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import CheckBox from "../../../UI/CheckBox/CheckBox";
import MyCard from "../../../UI/MyCard/MyCard";
import { extractNumbers } from "../../../Utility/extractNumbers";
import "./EachActivity.css";

const EachActivity = (props) => {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  const changeHandler = (event) => {
    const inputValue = parseInt(event.target.value);
    setValue(
      extractNumbers(
        inputValue > 0
          ? inputValue > parseInt(props.data.count) && type === "sub"
            ? parseInt(props.data.count)
            : inputValue
          : 0
      )
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      props.status.name !== "loading" &&
      props.status.name !== "success" &&
      props.status.name !== "failure"
    ) {
      console.log("submitting");
      let updatedCount;
      if (type === "add") {
        updatedCount = parseInt(props.data.count) + parseInt(value);
      } else if (type === "sub") {
        updatedCount = parseInt(props.data.count) - parseInt(value);
      }
      let updatedData = [
        ...props.originalData.map((el, index) => {
          if (index === props.index) {
            return {
              ...el,
              count: updatedCount < 0 ? 0 : updatedCount,
            };
          }
          return el;
        }),
      ];
      props.onUpdateCount(updatedData, props.index);
    }
  };

  const addition = () => {
    setType("add");
    setEdit(true);
  };
  const subtraction = () => {
    let inputValue = value === "" ? 0 : parseInt(value);
    console.log(inputValue);
    setValue(
      inputValue > 0
        ? inputValue > parseInt(props.data.count)
          ? parseInt(props.data.count)
          : inputValue
        : 0
    );
    setType("sub");
    setEdit(true);
  };

  const valid = () => {
    if (value !== null && value !== undefined) {
      return value.toString().trim() !== "";
    }
    return false;
  };

  const toggleEdit = () => {
    setShowIcons((prev) => !prev);
    setEdit(false);
    setType("");
    setValue("");
  };
  return (
    <Col
      data-tip={"Tap to Edit"}
      style={{ outline: "none" }}
      tabindex="1"
      key={props.index}
      className={
        "cursor-pointer hover-shrink margin-10 activity-card " +
        (!props.show && !showIcons ? "tool" : "")
      }
    >
      <MyCard
        style={{ position: "relative" }}
        titleStyle={{
          color: "white",
          textTransform: "capitalize",
          textShadow: `-1px 1px 2px red,
                  1px 1px 2px red,
                  1px -1px 0 red,
                  -1px -1px 0 red`,
        }}
        title={props.data.name}
        className="bg-black-half-opacity box-shadow-none"
        onClick={(e) => {
          if (!props.show && !showIcons) {
            setShowIcons(true);
            setEdit(false);
            setType("");
            setValue("");
          }
          props.changeHandler(e, props.index);
        }}
      >
        {!props.show ? (
          <div
            className="edit-icon"
            onClick={
              (props.index === props.status.index &&
                props.status.name === "loading") ||
              (props.index === props.status.index &&
                props.status.name === "success") ||
              (props.index === props.status.index &&
                props.status.name === "failure")
                ? () => {}
                : () => toggleEdit()
            }
          >
            <i
              style={{
                opacity:
                  (props.index === props.status.index &&
                    props.status.name === "loading") ||
                  (props.index === props.status.index &&
                    props.status.name === "success") ||
                  (props.index === props.status.index &&
                    props.status.name === "failure")
                    ? 0.7
                    : showIcons
                    ? 1
                    : 0,
                color: showIcons ? "tomato" : "#4fb664",
              }}
              className={
                showIcons ? "fa fa-window-close" : "fa fa-pencil-square-o"
              }
              aria-hidden="true"
            ></i>
          </div>
        ) : (
          <div className="checkbox-card">
            <CheckBox
              checked={props.dataCopy.checked}
              value={props.dataCopy.checked}
              name={props.dataCopy.name}
              onChange={(e) => props.changeHandler(e, props.index)}
              type="checkbox"
            />
          </div>
        )}
        <div className="flex-column flex-center">
          <div className="d-flex flex-center each-activity-updator">
            {!props.show && showIcons ? (
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={addition}
                style={{ color: edit && type === "add" ? "#4fb664" : "white" }}
              ></i>
            ) : null}
            <h4 className="text-center break-word white">{props.data.count}</h4>
            {!props.show && showIcons ? (
              <i
                className="fa fa-minus"
                aria-hidden="true"
                onClick={subtraction}
                style={{ color: edit && type === "sub" ? "#4fb664" : "white" }}
              ></i>
            ) : null}
          </div>
          {!props.show && edit ? (
            <form onSubmit={submitHandler} className="flex-column flex-center">
              <input
                autoFocus
                className="count-input"
                value={value}
                onChange={changeHandler}
              />
              <br />
              <div
                style={{
                  animation:
                    props.index === props.status.index &&
                    props.status.name === "success"
                      ? "success-animation"
                      : props.index === props.status.index &&
                        props.status.name === "failure"
                      ? "failure-animation"
                      : null,
                }}
              >
                <AsyncButton
                  type="submit"
                  className="box-shadow-none bg-green"
                  disabled={!valid()}
                  onClick={submitHandler}
                  loading={
                    props.index === props.status.index &&
                    props.status.name === "loading"
                  }
                  style={{
                    background:
                      (props.index === props.status.index &&
                        props.status.name === "loading") ||
                      (props.index === props.status.index &&
                        props.status.name === "success")
                        ? "#4fb664"
                        : props.index === props.status.index &&
                          props.status.name === "failure"
                        ? "tomato"
                        : null,
                  }}
                >
                  {props.index === props.status.index &&
                  props.status.name === "success" ? (
                    <i
                      className="fa fa-check"
                      aria-hidden="true"
                      style={{ color: "white" }}
                    ></i>
                  ) : props.index === props.status.index &&
                    props.status.name === "failure" ? (
                    <i
                      aria-hidden="true"
                      style={{
                        color: "white",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      &times;
                    </i>
                  ) : (
                    <i
                      className="fa fa-check"
                      style={{ color: "white" }}
                      aria-hidden="true"
                    ></i>
                  )}
                </AsyncButton>
              </div>
            </form>
          ) : null}
        </div>
      </MyCard>
    </Col>
  );
};

export default EachActivity;
