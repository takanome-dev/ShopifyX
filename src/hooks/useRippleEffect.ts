import { useEffect, useState } from 'react';

/**
 * @see {@link https://www.30secondsofcode.org/react/s/ripple-button}
 */

export default function useRippleEffect() {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else {
      setIsRippling(false);
    }
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  function handleCoords(
    e: React.ChangeEvent<HTMLButtonElement> &
      React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const rect = e.target.getBoundingClientRect();
    console.log({ rect, clientX: e.clientX, clientY: e.clientY });
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return { coords, isRippling, handleCoords };
}
