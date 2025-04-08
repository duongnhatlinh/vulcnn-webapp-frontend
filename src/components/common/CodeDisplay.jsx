import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeDisplay = ({
  code,
  language = "c",
  highlightedLines = [],
  lineNumbers = true,
  wrapLongLines = true,
}) => {
  const customStyle = {
    fontSize: "0.85rem",
    borderRadius: "0.375rem",
  };

  return (
    <div className="overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        showLineNumbers={lineNumbers}
        wrapLongLines={wrapLongLines}
        customStyle={customStyle}
        lineProps={(lineNumber) => {
          const style = { display: "block" };
          if (highlightedLines.includes(lineNumber)) {
            style.backgroundColor = "rgba(239, 68, 68, 0.4)"; // Red background for highlighted lines
            style.borderLeft = "3px solid #ef4444";
          }
          return { style };
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
