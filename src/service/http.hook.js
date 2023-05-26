import { useState, useCallback } from "react";

export const useHttp = () => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-type": "application/json" }
    ) => {
      setRequestLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        setRequestLoading(false);

        return data;
      } catch (e) {
        setRequestLoading(false);
        setRequestError(true);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setRequestError(null);
  }, []);

  return { requestLoading, requestError, request, clearError };
};