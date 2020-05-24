const defaults = {
  "preserve-prop-types": "none",
}

export const storage = new Proxy(
  {},
  {
    get: (_, key) => localStorage.getItem(`option:${key}`) || defaults[key],
    set: (_, key, value) => localStorage.getItem(`option:${key}`, value),
  }
)
