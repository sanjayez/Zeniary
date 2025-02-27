import React from "react";
import classNames from "classnames";

interface CardDetailProps {
  title: string;
  description: string;
  className?: string;
  noMarginBottom?: boolean;
}

const CardDetail: React.FC<CardDetailProps> = ({
  title,
  description,
  className = "",
  noMarginBottom = false,
}) => {
  return (
    <div
      className={classNames(
        "max-w-sm mx-auto text-center md:text-left",
        !noMarginBottom && "mb-8",
        className
      )}
    >
      <h2 className="text-white text-lg md:text-xl font-semibold mb-1">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-400">{description}</p>
    </div>
  );
};

export default CardDetail;
