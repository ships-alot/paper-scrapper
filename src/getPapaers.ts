// use axios to fetch data from the API

import axios from "axios";

const BASE_API_URL =
  "http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10";

const generateUrl = (
  search_query: string,
  start: number,
  max_results: number
) => {
  return `${BASE_API_URL}?search_query=${search_query}&start=${start}&max_results=${max_results}`;
};

const search_query = "all:electron";

const start = 0;

const max_results = 10;

const testUrl = generateUrl(search_query, start, max_results);

export async function getPapers() {
  const { data } = await axios.get(testUrl);
  return data;
}

getPapers().then((posts) => {
  console.log(posts);
});
