const retryFetch = (url, { retries = 3, ...options }) =>
  fetch(url, options).catch(e => {
    if (retries > 1) return retryFetch(url, { retries: retries - 1, ...options });
    throw e;
  });

export default retryFetch;
