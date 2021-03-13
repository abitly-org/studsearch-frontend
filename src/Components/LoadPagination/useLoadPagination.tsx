import React, { useEffect, useState } from "react";

const useLoadPagination = <T extends unknown>(
  request: (count: number, offset: number, query:string) => Promise<T[]>,
  deps: React.DependencyList
) => {
  let count = 10;
  let unmounted = false;
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [dispatchIndex, setDispatchIndex] = useState(0);

  const [query, setQuery] = useState("");

  useEffect(() => {
      console.log(  "deps" + deps + "|" + deps.length)
       setOffset(0);
      setDispatchIndex(0);
  }, [deps]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    request(count, offset, query)
      .then((res) => {
        if (unmounted) return;
        setItems((prevList) => {
          return [...prevList, ...res];
        });
        setHasMore(res.length >= count);
        setLoading(false);
        setOffset(offset + count);
       
      })
      .catch();
    return () => {
      unmounted = true;
    };
  }, [dispatchIndex]);

  return {
    loading,
    error,
    hasMore,
    items,
    dispatch: () => {
      if (!loading) setDispatchIndex((i) => i + 1);
    },
  };
};

export default useLoadPagination;
