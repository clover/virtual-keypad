import React from 'react';
import { useSelector } from 'react-redux';
import { selectSignatureBounds, selectSignatureLines } from '../../store';

export default ({ width = 250, ...other }) => {
  const bounds = useSelector(selectSignatureBounds);
  const lines = useSelector(selectSignatureLines);

  if (!lines.length) return null;

  return (
    <div className="Signature">
      <svg viewBox={bounds} width={width} {...other}>
        {lines.map((points, i) => (
          <polyline key={i} points={points} fill="none" stroke="black" />
        ))}
      </svg>
    </div>
  );
};
