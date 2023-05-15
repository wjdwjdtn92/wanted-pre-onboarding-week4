import { useRef } from 'react';

function useFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  return { ref, setFocus };
}

export default useFocus;
