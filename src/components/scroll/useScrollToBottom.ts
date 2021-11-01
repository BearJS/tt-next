import {SyntheticEvent, useEffect} from 'react';

interface Params {
  handleScrolledToBottom: () => void;
  dep?: unknown[];
}

const useScrollToBottom = ({handleScrolledToBottom, dep}: Params) => {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const el = e.target as HTMLDocument;

      if (
        el.documentElement.scrollHeight - el.documentElement.scrollTop ===
        el.documentElement.clientHeight
      ) {
        handleScrolledToBottom();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, dep || []);
};

export default useScrollToBottom;
