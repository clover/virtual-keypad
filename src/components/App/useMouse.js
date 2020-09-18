import { useState, useEffect } from 'react';

export default () => {
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    if (!mouse) {
      const onHover = () => setMouse(true);
      document.addEventListener('mouseover', onHover);
      return () => document.removeEventListener('mouseover', onHover);
    }
    return undefined;
  }, [mouse, setMouse]);

  return mouse;
};
