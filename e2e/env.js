exports.baseURL = process.env.ENVIRONMENT_URL || "http://localhost:8080"

console.log(process.env.ENVIRONMENT_URL)
console.log(exports.baseURL)
