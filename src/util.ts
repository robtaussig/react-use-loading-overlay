import { loadingOverlayInlineStyle, textNodeInlineStyle } from './inlineStyles';

export const generateLoadingOverlay = () => {
  const loadingOverlay = document.createElement('div');
  Object.entries(loadingOverlayInlineStyle).forEach(([key, value]) => {
    loadingOverlay.style[(key as any)] = value;
  });

  const loader = document.createElement('div');
  loader.classList.add('react-use-loading-overlay--loader');

  const outer = document.createElement('div');
  outer.classList.add('react-use-loading-overlay--outer');

  const middle = document.createElement('div');
  middle.classList.add('react-use-loading-overlay--middle');
  
  const inner = document.createElement('div');
  inner.classList.add('react-use-loading-overlay--inner');

  loader.appendChild(outer);
  loader.appendChild(middle);
  loader.appendChild(inner);
  loadingOverlay.appendChild(loader);

  return loadingOverlay;
};

export const generateTextNode = (loadingText: string) => {
  const textNode = document.createElement('span');
  Object.entries(textNodeInlineStyle).forEach(([key, value]) => {
    textNode.style[(key as any)] = value;
  });
  textNode.innerText = loadingText;
  
  return textNode;
};
