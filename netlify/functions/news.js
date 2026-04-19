exports.handler = async function (event) {
  const API_KEY = process.env.NEWS_API_KEY;
  const params = event.queryStringParameters || {};

  // Build the NewsAPI URL from whatever params the frontend sends
  const base = params.q
    ? "https://newsapi.org/v2/everything"
    : "https://newsapi.org/v2/top-headlines";

  const query = new URLSearchParams({ ...params, apiKey: API_KEY }).toString();
  const url = `${base}?${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: err.message }),
    };
  }
};
