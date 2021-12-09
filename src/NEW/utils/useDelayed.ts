import * as React from 'react';
const useDelayed = <T extends unknown>(value: T, delay: number = 250): T => {
  const [state, setState] = React.useState(value);
  React.useEffect(() => {
    const timeout = setTimeout(() => setState(value), delay);
    return () => clearTimeout(timeout);
  }, [ value ]);
  return state;
}
export default useDelayed;