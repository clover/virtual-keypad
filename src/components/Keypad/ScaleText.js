import React, { useEffect, useRef } from 'react';

const measure = (el, scale) => {
  const { fontSize } = el.style;
  el.style.fontSize = `${scale}em`; // eslint-disable-line no-param-reassign
  const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = el.parentElement;
  el.style.fontSize = fontSize; // eslint-disable-line no-param-reassign
  return Math.min(offsetWidth / scrollWidth, offsetHeight / scrollHeight) >= 1;
};

const resize = (el, [min, max], attempts = 10) => {
  if (attempts <= 0) return;
  const mid = (max + min) / 2;
  if (measure(el, mid)) {
    // eslint-disable-next-line no-param-reassign
    el.style.fontSize = `${mid}em`;
    resize(el, [mid, max], attempts - 1);
  } else {
    resize(el, [min, mid], attempts - 1);
  }
};

export default ({ children, minScale = 0.4, maxScale = 1 }) => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (el) {
      if (measure(el, maxScale)) {
        el.style.fontSize = `${maxScale}em`;
      } else {
        el.style.fontSize = `${minScale}em`;
        if (!measure(el, minScale)) {
          el.classList.add('text-truncate');
        } else {
          resize(el, [minScale, maxScale]);
        }
      }
    }
  }, [maxScale, minScale, ref]);

  return <span ref={ref}>{children}</span>;
};
