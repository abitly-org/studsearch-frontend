import { useEffect, useState } from "react";

const useLoadPagination = <T extends unknown>(
  request: (count: number, offset: number) => Promise<T[]>
) => {
  let count = 10;
  let unmounted = false;
  const [state, setState] = useState({
    offset: 0,
    loading: false,
    error: null as Error | null,
    items: [] as T[],
    hasMore: false,
    dispatchIndex: 0
  });

  useEffect(() => {
    setState({
      ...state,
      items: [],
      offset: 0,
      dispatchIndex: state.dispatchIndex + 1
    });
  }, [ request ]);

  useEffect(() => {
    setState({
      ...state,
      loading: true,
      error: null
    });
    request(count, state.offset)
      .then((res) => {
        if (unmounted) return;
        setState({
          ...state,
          items: [...state.items, ...res],
          hasMore: res.length >= count,
          loading: false,
          offset: state.offset + res.length
        })
      })
      .catch(error => {
        if (unmounted) return;
        setState({ ...state, error });
      });
    return () => {
      unmounted = true;
    };
  }, [state.dispatchIndex]);

  return {
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    items: state.items,
    dispatch: () => {
      console.log('dispatch(): loading=', state.loading);
      if (!state.loading)
        setState({ ...state, dispatchIndex: state.dispatchIndex + 1 });
    },
  };
};

export default useLoadPagination;
