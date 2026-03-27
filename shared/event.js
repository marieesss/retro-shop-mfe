const listeners = {};

export function emit(eventName, payload) {
  if (!listeners[eventName]) return;
  listeners[eventName].forEach((handler) => handler(payload));
}

export function on(eventName, handler) {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }

  listeners[eventName].push(handler);

  return () => {
    listeners[eventName] = listeners[eventName].filter((h) => h !== handler);
  };
}