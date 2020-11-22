import React from "react";

const Audio = (props, { path }) => (
  <audio muted={false} {...props} autoPlay src={path} />
);

export default Audio;
