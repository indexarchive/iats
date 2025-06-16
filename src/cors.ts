export const isInBrowser = () => {
  return !(typeof window === "undefined");
};

// instance of lib/cors-proxy.js
const CORS_PROXY = "https://iajs-cors.rchrd2.workers.dev";

export const corsWorkAround = (url: string) => {
  if (isInBrowser()) {
    return `${CORS_PROXY}/${url}`;
  }
  return url;
};
