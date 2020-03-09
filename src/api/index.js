export const fetcher = async (url, method = "GET", body) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.REACT_APP_API_KEY
      },
      body: body ? JSON.stringify(body) : undefined
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};