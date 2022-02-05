import './styles.css';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { generateLoadingOverlay, generateTextNode } from './util';

const useLoadingOverlay = (
  containerRef: MutableRefObject<HTMLDivElement>,
) => {
  const textNode = useRef<any>(null);
  const wakeLock = useRef<WakeLockSentinel | null>();
  const loadingOverlay = useRef<HTMLDivElement>(null);

  const setLoading = useCallback((loadingText?: string) => {
    textNode.current?.remove();
    loadingOverlay.current?.remove();

    loadingOverlay.current = generateLoadingOverlay();

    if (loadingText) {
      textNode.current = generateTextNode(loadingText);
      loadingOverlay.current.appendChild(textNode.current);
    }

    containerRef.current?.appendChild(loadingOverlay.current);

    if ('wakeLock' in navigator) {
      try {
        wakeLock.current?.release();
        navigator.wakeLock.request('screen')
          .then((lock) => {
            wakeLock.current = lock;
          });
      } catch (e) {
        wakeLock.current = null;
      }
    }
  }, [loadingOverlay, containerRef, textNode, wakeLock]);

  const stopLoading = useCallback(() => {
    if (textNode.current) {
      loadingOverlay.current.removeChild(textNode.current);
      textNode.current = null;
    }
    containerRef.current.removeChild(loadingOverlay.current);
    loadingOverlay.current = null;

    wakeLock.current?.release()
      .then(() => wakeLock.current = null);
  }, [loadingOverlay, containerRef, textNode, wakeLock]);

  const updateText = useCallback((updatedText: string) => {
    textNode.current?.remove();

    textNode.current = generateTextNode(updatedText);
    loadingOverlay.current.appendChild(textNode.current);
  }, [loadingOverlay, containerRef, textNode, wakeLock]);

  useEffect(() => () => {
    wakeLock.current?.release();
  }, []);

  return { setLoading, stopLoading, updateText };
};


export default useLoadingOverlay;
