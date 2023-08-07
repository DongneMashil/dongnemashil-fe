import React from 'react';
export const WriteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <g filter="url(#filter0_d_321_950)">
        <circle
          cx="40"
          cy="38"
          r="30"
          fill="#F7F6F6"
          fillOpacity="0.8"
          shapeRendering="crispEdges"
        />
        <circle
          cx="40"
          cy="38"
          r="29"
          stroke="#9A7B9A"
          strokeWidth="2"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_321_950"
          x="0"
          y="0"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_321_950"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_321_950"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
