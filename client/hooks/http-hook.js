import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      // while "isLoading" is true, "LoadingSpinner.js" will run.
      setIsLoading(true);

      // Abort process if browser refresh while fetch in process.
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
          //  Connecting abort function and this whole fetch process
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        // Remove abortctrl in action if request is successfully completed.
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // show error if response code is not 200s.
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // Clean up all abort refs, (histories) when unmounts.
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
    clearError,
  };
};
