import axios from "axios"

const host = process.env.NODE_ENV === "production" ? "backend-service" : "0.0.0.0"

export default axios.create({
  baseURL: `http://${host}:8000`
})