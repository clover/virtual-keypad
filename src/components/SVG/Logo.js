import React from 'react';
import { useTranslation } from 'react-i18next';

export default ({ size = 28 }) => {
  const { t } = useTranslation();
  return (
    <svg
      className="Logo"
      id="clover-logo-svg"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 33.15 33.15"
      aria-labelledby="svg-logo-title"
      role="image"
    >
      <title id="svg-logo-title">{t('Clover')}</title>
      <g id="clover-symbol-2" data-name="clover-symbol">
        <path d="M191.45,85.64A7.5,7.5,0,1,0,184,93.09h7.49V85.64Z" transform="translate(-176.46 -77.01)"></path>
        <path d="M193.61,85.64a7.5,7.5,0,1,1,7.49,7.45h-7.49V85.64Z" transform="translate(-176.46 -77.01)"></path>
        <path d="M193.61,102.7a7.5,7.5,0,1,0,7.49-7.45h-7.49v7.45Z" transform="translate(-176.46 -77.01)"></path>
        <path
          d="M191.46,102.7A7.5,7.5,0,1,1,184,95.25h7.49v7.45Zm-7.5,5.35a5.38,5.38,0,0,0,5.4-5.35V97.36H184a5.35,5.35,0,1,0,0,10.7h0Z"
          transform="translate(-176.46 -77.01)"
        ></path>
      </g>
    </svg>
  );
};
