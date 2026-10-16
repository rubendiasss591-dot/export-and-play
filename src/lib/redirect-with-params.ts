/** Keep the original query string byte-for-byte on every application redirect. */
export function redirectWithParams(destination: string) {
  const currentParams = window.location.search;

  if (!currentParams) {
    window.location.href = destination;
    return;
  }

  if (destination.includes("?")) {
    window.location.href = destination + "&" + currentParams.substring(1);
  } else {
    window.location.href = destination + currentParams;
  }
}

declare global {
  interface Window {
    redirectWithParams: typeof redirectWithParams;
  }
}

// Use this same definition on normal pages and the standalone error page.
export const redirectWithParamsScript = `window.redirectWithParams = ${redirectWithParams.toString()};`;