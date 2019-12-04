import React from "react";

function CustomSvgImage(props) {
  const { src_url, size = 48, opacity = "100%", margin = 0 } = props;
  return (
    <img
      src={src_url}
      style={{ height: size, margin: margin, opacity: opacity, zIndex:2 }}
    />
  );
}

export default CustomSvgImage;
