import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      // while "isLoading" is true, "LoadingSpinner.js" will run.
      setIsLoading(true);

      try {
        // sidenote:: fetch in default process a GET request, so no need to declare method if only used for get method.
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
        });

        const responseData = await response.json();

        // show error if response code is not 200s. (400, 500) because they are not error codes by default.
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

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
    clearError,
  };
};
