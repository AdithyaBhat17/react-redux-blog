export const fetcher = async (url, method = "GET") => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.REACT_APP_API_KEY
      }
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
