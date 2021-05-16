import { useEffect, useRef, useState } from "react";

const useLoadPagination = <T extends unknown>(
  request?: (count: number, offset: number) => Promise<T[]>,
  pageCount = 10,
  timeout?: number
) => {
  const [state, setState] = useState({
    offset: 0,
    loading: false,
    error: null as Error | null,
    items: [] as T[],
    hasMore: true,
    dispatchIndex: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      hasMore: true,
      items: [],
      offset: 0,
      dispatchIndex: state.dispatchIndex + 1,
    });
  }, [request, pageCount]);

  useEffect(() => {
    let unmounted = false;
    if (!state.hasMore)
      return;
    setState({
      ...state,
      loading: true,
      error: null,
    });
    setTimeout(() => {
      if (unmounted)
        return;
      request?.(pageCount, state.offset)
        .then((res) => {
          if (unmounted) return;
          setState({
            ...state,
            items: [...state.items, ...res],
            hasMore: res.length === pageCount,
            loading: false,
            offset: state.offset + res.length,
          });
        })
        .catch((error) => {
          if (unmounted) return;
          setState({ ...state, error });
        });
    }, timeout ?? 0);
    return () => {
      unmounted = true;
    };
  }, [state.dispatchIndex]);

  const dispatch = useRef<Function | null>(null);
  useEffect(() => {
    dispatch.current = () => {
      if (!state.loading && state.hasMore) {
        setState({ ...state, dispatchIndex: state.dispatchIndex + 1 });
      }
    }
  })

  return {
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    items: state.items,
    dispatch: () => dispatch?.current?.()
  };
};

export default useLoadPagination;
