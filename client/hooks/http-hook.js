import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      // while "isLoading" is true, "LoadingSpinner.js" will run.
      setIsLoading(true);

      let options = {
        url: url,
        method: method,
        body: body,
        headers: headers,
      };

      try {
        const response = await axios(options);

        const responseData = await response.data;

        // show error if response code is not 200s. (400, 500) because they are not error codes by default.
        let responseOk =
          response && response.status === 200 && response.statusText === 'OK';

        if (!responseOk) {
          throw new Error(response.message);
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
