import * as React from "react";

/**
 * A custom hook that ensures a dispatch function is only called if the component is still mounted.
 * @param {Function} dispatch - The dispatch function to be safely invoked.
 * @returns {Function} A wrapped version of the dispatch function that checks if the component is mounted.
 */
const useSafeDispatch = (dispatch) => {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false); // Cleanup: mark as unmounted
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0), // Only call dispatch if the component is mounted
    [dispatch]
  );
};

const defaultInitialState = { status: "idle", data: null, error: null };
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState, // Merge default state with the provided initial state
  });

  // Reducer to manage the state of the async operation
  const [{ status, data, error }, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }), // Merge the current state with the new updates
    initialStateRef.current
  );

  // Ensure state updates are only applied if the component is mounted
  const safeSetState = useSafeDispatch(setState);

  /**
   * Runs an asynchronous operation and updates the state based on its result.
   * @param {Promise} promise - The promise representing the async operation.
   * @returns {Promise} The same promise, allowing chaining.
   * @throws {Error} If the provided argument is not a promise.
   */
  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: "pending" }); // Set status to "pending" before the promise resolves
      return promise.then(
        (data) => {
          safeSetState({ data, status: "resolved" }); // Update state with resolved data
          return data;
        },
        (error) => {
          safeSetState({ status: "rejected", error }); // Update state with the error
          return error;
        }
      );
    },
    [safeSetState]
  );

  /**
   * Manually sets the data in the state.
   * @param {any} data - The data to set.
   */
  const setData = React.useCallback(
    (data) => safeSetState({ data }),
    [safeSetState]
  );

  /**
   * Manually sets the error in the state.
   * @param {any} error - The error to set.
   */
  const setError = React.useCallback(
    (error) => safeSetState({ error }),
    [safeSetState]
  );

  /**
   * Resets the state to its initial values.
   */
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  return {
    // Status flags for convenience
    isIdle: status === "idle", // True if the operation has not started
    isLoading: status === "pending", // True if the operation is in progress
    isError: status === "rejected", // True if the operation failed
    isSuccess: status === "resolved", // True if the operation succeeded

    setData, // Function to manually set data
    setError, // Function to manually set an error
    error, // The current error
    status, // The current status
    data, // The current data
    run, // Function to run an async operation
    reset, // Function to reset the state
  };
}

export { useAsync, useSafeDispatch };
