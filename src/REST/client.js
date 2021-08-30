import axios from "axios";

export async function client(endpoint, method, { body, ...customConfig } = {}) {
  
  let headers;
  try {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store,
    }
  } catch(err) {
    
  }
  // localStorage.getItem("login") & (

  // )
  const config = {
    method: method,
    url: endpoint,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.data = body;
  }

  let data;
  try {
    const response = await axios(config);
    data = response;

    if (response.status < 400) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}
