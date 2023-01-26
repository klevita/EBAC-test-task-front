import axios from "axios";

export default () => {
  const baseUrl = "https://ebac-api-production.up.railway.app/";

  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
