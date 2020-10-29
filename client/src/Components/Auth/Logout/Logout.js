import React, { useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import { deleteCookie } from "../../Utility/cookies";

const Logout = (props) => {
  localStorage.removeItem("route");
  useEffect(() => {
    deleteCookie("token");
    setTimeout(() => {
      props.history.push("/auth");
      // window.location.reload();
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

export default Logout;
