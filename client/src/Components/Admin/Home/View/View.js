import React, { Fragment, useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { axiosInstance } from "../../../Utility/axiosInstance";
import EachView from "./EachView/EachView";
import "./View.css";

const View = (props) => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState({ display: false, data: {} });

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/admin_view_challenge", {
        date:
          new Date().getDate() +
          "-" +
          (parseInt(new Date().getMonth()) + 1) +
          "-" +
          new Date().getFullYear(),
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setFormData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setFormData([]);
      });
  }, []);

  const onEdit = (index) => {
    setEdit({ display: true, data: formData[index] });
  };
  const cancelEdit = (index) => {
    setEdit((prev) => ({ ...prev, display: false }));
  };

  return (
    <div className="white">
      {loading ? (
        <Spinner />
      ) : edit.display ? (
        <EachView
          data={edit.data}
          edit={false}
          onClick={cancelEdit}
          entireData={formData}
        />
      ) : formData.length === 0 ? (
        <h4 className="white">
          No <span className="red">Challanges</span>
        </h4>
      ) : (
        formData.map((el, index) => (
          <Fragment>
            <EachView
              data={el}
              key={index}
              edit={false}
              index={index}
              onClick={onEdit}
            />
            <br />
          </Fragment>
        ))
      )}
    </div>
  );
};

export default View;
