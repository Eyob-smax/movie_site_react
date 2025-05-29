import { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "1px",
};

export default function StarRating({
  maxRating = 10,
  color = "#fcc419",
  size = 48 / 1.5,
  className = "",
  desc = [],
  defaultRating = 0,
  onSetRating = () => {},
  counter,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
    counter.current++;
  }
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size}px`,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => {
          return (
            <Star
              onClick={() => handleRating(index + 1)}
              key={index}
              full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
              onHoverIn={() => setTempRating(index + 1)}
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {desc.length === maxRating
          ? desc[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
