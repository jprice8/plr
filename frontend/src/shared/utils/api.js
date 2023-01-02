import axios from "axios"

const host = process.env.NODE_ENV === "production" ? "api.parlevelreset.com" : "0.0.0.0:8000"

export default axios.create({
  baseURL: `http://${host}`,
  timeout: 10000
})