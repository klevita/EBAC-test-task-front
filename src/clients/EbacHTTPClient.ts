import axios from "axios";

export default () => {
  const baseUrl = "http://localhost:8087/";

  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
