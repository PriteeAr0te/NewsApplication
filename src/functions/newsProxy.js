const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { country, category, page, pageSize } = JSON.parse(event.body);

    const apiKey = process.env.REACT_APP_NEWS_API;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&category=${category}&page=${page}&pageSize=${pageSize}`;

    const response = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
