import React, { useEffect } from 'react';

const useTitle = (title: string) =>
  useEffect(() => {
    document.title = title;
    document.querySelector('head meta[name="title"]')?.setAttribute?.('content', title);
    document.querySelector('head meta[property="og:title"]')?.setAttribute?.('content', title);
    document.querySelector('head meta[name="twitter:title"]')?.setAttribute?.('content', title);
  }, [ title ]);
export const useDescription = (description: string) =>
  useEffect(() => {
    document.querySelector('head meta[name="description"]')?.setAttribute?.('content', description);
    document.querySelector('head meta[property="og:description"]')?.setAttribute?.('content', description);
    document.querySelector('head meta[name="twitter:description"]')?.setAttribute?.('content', description);
  }, [ description ]);

export default useTitle;