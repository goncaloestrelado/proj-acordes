import React from "react";
import "./CircleOfFifths.css";

const CircleOfFifths = ({ selectedKey, onKeySelect }) => {
  const majorKeys = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
  const minorKeys = ["Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "Bbm", "Fm", "Cm", "Gm", "Dm"];
  const accidentals = ["", "1#", "2#", "3#", "4#", "5#", "6#", "5♭", "4♭", "3♭", "2♭", "1♭"];

  const angleStep = 360 / 12;
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  const getPosition = (index) => {
    const angle = (index * angleStep - 90) * (Math.PI / 180); // Start from top
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div className="circle-container">
      <svg width="300" height="300" viewBox="0 0 300 300" className="circle-svg" preserveAspectRatio="xMidYMid meet">
        {/* Outer circle */}
        <circle cx={centerX} cy={centerY} r={radius + 20} fill="none" stroke="#dee2e6" strokeWidth="2" />

        {/* Inner circle */}
        <circle cx={centerX} cy={centerY} r={radius - 40} fill="none" stroke="#dee2e6" strokeWidth="2" />

        {/* Major keys */}
        {majorKeys.map((key, index) => {
          const pos = getPosition(index);
          const isSelected = selectedKey === key;

          return (
            <g key={`major-${key}`} className="key-group">
              <circle
                cx={pos.x}
                cy={pos.y}
                r="25"
                fill={isSelected ? "#007bff" : "#f8f9fa"}
                stroke={isSelected ? "#0056b3" : "#dee2e6"}
                strokeWidth="2"
                className="key-circle major-key"
                onClick={() => onKeySelect(key)}
                style={{ cursor: "pointer" }}
              />
              <text
                x={pos.x}
                y={pos.y - 5}
                textAnchor="middle"
                className="key-text"
                fill={isSelected ? "white" : "#495057"}
                fontSize="14"
                fontWeight="600"
                onClick={() => onKeySelect(key)}
                style={{ cursor: "pointer", pointerEvents: "auto", userSelect: "none" }}
              >
                {key}
              </text>
              <text
                x={pos.x}
                y={pos.y + 10}
                textAnchor="middle"
                className="accidental-text"
                fill={isSelected ? "white" : "#6c757d"}
                fontSize="10"
                onClick={() => onKeySelect(key)}
                style={{ cursor: "pointer", pointerEvents: "auto", userSelect: "none" }}
              >
                {accidentals[index]}
              </text>
            </g>
          );
        })}

        {/* Minor keys */}
        {minorKeys.map((key, index) => {
          const innerPos = {
            x: centerX + (radius - 40) * Math.cos((index * angleStep - 90) * (Math.PI / 180)),
            y: centerY + (radius - 40) * Math.sin((index * angleStep - 90) * (Math.PI / 180)),
          };
          const isSelected = selectedKey === key;

          return (
            <g key={`minor-${key}`} className="key-group">
              <circle
                cx={innerPos.x}
                cy={innerPos.y}
                r="20"
                fill={isSelected ? "#dc3545" : "#6c757d"}
                stroke={isSelected ? "#bd2130" : "#495057"}
                strokeWidth="2"
                className="key-circle minor-key"
                onClick={() => onKeySelect(key)}
                style={{ cursor: "pointer" }}
              />
              <text
                x={innerPos.x}
                y={innerPos.y + 3}
                textAnchor="middle"
                className="key-text"
                fill="white"
                fontSize="11"
                fontWeight="500"
                onClick={() => onKeySelect(key)}
                style={{ cursor: "pointer", pointerEvents: "auto", userSelect: "none" }}
              >
                {key}
              </text>
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="center-text"
          fill="#495057"
          fontSize="16"
          fontWeight="600"
        >
          Circle of
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          className="center-text"
          fill="#495057"
          fontSize="16"
          fontWeight="600"
        >
          Fifths
        </text>
      </svg>
    </div>
  );
};

export default CircleOfFifths;
