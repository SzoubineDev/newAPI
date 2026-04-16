exports.handler = async function(event, context) {
  const API_KEY = 'd3343faad5c34d0598ec357627d1cecb';
  const { source, endpoint } = event.queryStringParameters;
  
  let url;
  if (source === 'wsj') {
    url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`;
  } else if (source === 'techcrunch') {
    url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
  } else if (source === 'business') {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' })
    };
  }
};