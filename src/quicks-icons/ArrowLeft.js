import React from "react";
const ArrowLeft = ({ color = "white", size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.9883 13.8304H10.6868L17.7152 6.80204L15.9298 5.02924L5.87134 15.0877L15.9298 25.1462L17.7026 23.3734L10.6868 16.345H25.9883V13.8304Z"
        fill={color}
      />
    </svg>
  );
};
export default ArrowLeft;