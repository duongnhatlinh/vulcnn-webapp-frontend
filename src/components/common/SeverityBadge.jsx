import React from "react";

const SeverityBadge = ({ severity }) => {
  let bgColor = "";
  let textColor = "";

  switch (severity.toLowerCase()) {
    case "high":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    case "medium":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    case "low":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
  }

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}
    >
      {severity}
    </span>
  );
};

export default SeverityBadge;
