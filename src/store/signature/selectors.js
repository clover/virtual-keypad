import { createSelector } from 'reselect';

export const selectSignature = state => state.signature;

export const selectSignatureBounds = createSelector(selectSignature, ({ strokes }) => {
  const bounds = strokes
    .map(({ points }) => points)
    .flat()
    .reduce(
      ({ x, X, y, Y }, point) => ({
        x: Math.min(x, point.x),
        X: Math.max(X, point.x),
        y: Math.min(y, point.y),
        Y: Math.max(Y, point.y),
      }),
      { x: Infinity, X: -Infinity, y: Infinity, Y: -Infinity }
    );
  return [bounds.x, bounds.y, bounds.X - bounds.x, bounds.Y - bounds.y].join(' ');
});

export const selectSignatureLines = createSelector(selectSignature, ({ strokes }) =>
  strokes.map(({ points }) => points.map(({ x, y }) => `${x},${y}`).join(' '))
);
