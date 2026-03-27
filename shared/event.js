export function emit(eventName, payload) {
  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail: payload,
    })
  );
}

export function on(eventName, handler) {
  const listener = (event) => {
    handler(event.detail);
  };

  window.addEventListener(eventName, listener);

  return () => {
    window.removeEventListener(eventName, listener);
  };
}