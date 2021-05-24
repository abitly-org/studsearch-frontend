import React, { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    document.querySelector('head meta[name="title"]')?.setAttribute?.('content', title);
    document.querySelector('head meta[property="og:title"]')?.setAttribute?.('content', title);
    document.querySelector('head meta[property="twitter:title"]')?.setAttribute?.('content', title);
  }, [ title ]);
}

export default useTitle;