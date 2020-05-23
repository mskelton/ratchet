export function debounce(fn, timeout) {
  let id

  return function (...args) {
    clearTimeout(id)
    id = setTimeout(() => fn.apply(this, args), timeout)
  }
}
