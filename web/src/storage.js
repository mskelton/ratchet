const defaults = {
  "prefer-type-aliases": "interface",
  "preserve-prop-types": "none",
}

export const storage = new Proxy(
  {},
  {
    get: (_, key) => localStorage.getItem(`option:${key}`) || defaults[key],
    set(_, key, value) {
      localStorage.setItem(`option:${key}`, value)
      return true
    },
  }
)
