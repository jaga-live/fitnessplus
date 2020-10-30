import React, { Fragment, useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [show, setShow] = useState(props.show);
  return props.show ? (
    <Fragment>
      <div
        className="full-page-wrapper flex-center bg-half-opacity my-modal"
        onClick={props.onClick}
      ></div>
      <div className="my-modal-element fit-content">{props.children}</div>
    </Fragment>
  ) : null;
};

export default Modal;
