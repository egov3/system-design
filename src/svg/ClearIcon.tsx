import React from "react";

export const ClearIcon = ({
  fill = "none",
  pathFill = "#fff",
  width = 20,
  height = 20,
  ...props
}: React.SVGProps<SVGSVGElement> & { pathFill?: string }) => {
  return (
    <svg
      data-testid="Icons_CLEAR"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill={pathFill}
        fillRule="evenodd"
        d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666zM7.5 6.027L6.027 7.5l2.5 2.5-2.5 2.5L7.5 13.973l2.5-2.5 2.5 2.5 1.473-1.473-2.5-2.5 2.5-2.5L12.5 6.027l-2.5 2.5-2.5-2.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
