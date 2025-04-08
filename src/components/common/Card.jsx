import React from "react";

const Card = ({
  children,
  title,
  footer,
  className = "",
  bodyClassName = "",
  titleClassName = "",
  footerClassName = "",
}) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {title && (
        <div
          className={`px-4 py-5 border-b border-gray-200 sm:px-6 ${titleClassName}`}
        >
          {typeof title === "string" ? (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
          ) : (
            title
          )}
        </div>
      )}
      <div className={`px-4 py-5 sm:p-6 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div
          className={`px-4 py-4 border-t border-gray-200 sm:px-6 ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
