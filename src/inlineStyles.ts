import { CSSProperties } from 'react';

export const textNodeInlineStyle: CSSProperties = {
  top: 'calc(50% + 40px)',
  position: 'absolute',
  textShadow: '1px 1px 4px #000000',
  color: 'white',
  fontWeight: 600,
  textAlign: 'center',
};

export const loadingOverlayInlineStyle: CSSProperties = {
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  backgroundColor: 'gray',
  opacity: 0.9,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999999999,
};
