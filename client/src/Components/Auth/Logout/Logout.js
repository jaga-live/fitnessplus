import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginFailure } from "../../Store/actions";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import { deleteCookie } from "../../Utility/cookies";

const Logout = (props) => {
  localStorage.removeItem("route");
  useEffect(() => {
    deleteCookie("token");
    props.loginFailure();
    window.location.reload();
    setTimeout(() => {
      props.history.replace("/auth");
      // axiosInstance.post("/logout");
    }, 2000);
  }, []);
  // useEffect(() => {
  // }, []);
  return (
    <div className="full-page-wrapper flex-center flex-column">
      <Spinner />
      <h4>Logging out...</h4>
    </div>
  );

  // <Redirect to="/auth/signin" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginFailure: () => dispatch(loginFailure()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
