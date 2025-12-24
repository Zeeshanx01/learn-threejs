'use client'

import { useEffect, useRef } from 'react';

export default function PlayCanvasGame() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Focus the iframe when it loads
    const iframe = iframeRef.current;
    if (iframe) {
      const onLoad = () => iframe.contentWindow.focus();
      iframe.addEventListener('load', onLoad);
      return () => iframe.removeEventListener('load', onLoad);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }} onClick={() => iframeRef.current?.contentWindow.focus()}>
      <iframe
        ref={iframeRef}
        src="/scene9/game/index.html"
        width="100%"
        height="100%"
        allowFullScreen
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}
