import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 border border-transparent",
    secondary:
      "text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 border border-gray-300",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent",
    success:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent",
    warning:
      "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 border border-transparent",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles =
    disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
