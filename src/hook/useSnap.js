import { useState, useEffect, useRef } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);
  const isSnapEmbedded = useRef(false);

  useEffect(() => {
    const midtransScriptUrl = `${import.meta.env.VITE_MIDTRANS_URL}`;
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = `${import.meta.env.VITE_MIDTRANS_CLIENT_KEY}`;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    scriptTag.onload = () => {
      setSnap(window.snap);
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
      isSnapEmbedded.current = false;
    };
  }, []);

  const snapEmbed = (snap_token, embedId) => {
    if (snap && !isSnapEmbedded.current) {
      snap.embed(snap_token, { embedId });
      isSnapEmbedded.current = true;
    }
  };

  return { snap, snapEmbed };
};

export default useSnap;
