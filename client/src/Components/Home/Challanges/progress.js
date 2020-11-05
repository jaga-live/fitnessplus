import React, { useState } from "react";

const Progress = (props) => {
  const [myProgress, setMyProgress] = useState(0);
  setTimeout(() => {
    setMyProgress(props.progress);
  }, 200);
  return <div style={{ width: myProgress + "%" }}></div>;
};

export default Progress;
