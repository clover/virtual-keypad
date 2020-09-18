import { useEffect } from 'react';

export default ({ ms = 500 } = {}) =>
  useEffect(() => {
    let expires = 0;
    const handler = event => {
      if (event.touches.length === 1) {
        const now = Date.now();
        if (event.touches.length === 1 && now > expires) {
          event.preventDefault();
          // Trigger a fake click for the tap we just prevented
          event.target.click();
        }
        expires = now + ms;
      }
    };

    document.body.addEventListener('touchstart', handler, { passive: false });

    return () => document.body.removeEventListener('touchstart', handler, { passive: false });
  }, [ms]);
